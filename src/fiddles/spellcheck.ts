import * as fs from "fs/promises";

interface Node<T> {
	value?: T;
	children: Node<T>[];
	isWord?: boolean;
}

class Trie {
	private readonly head: Node<string>;

	constructor() {
		this.head = { children: [] };
	}

	getCharIdx(word: string, idx: number): number {
		const i = word.charCodeAt(idx) - 97;
		if (i < 0) throw new Error("weird character!");
		return i;
	}

	add(word: string) {
		let node = this.head;
		for (let i = 0; i < word.length; i++) {
			const charIdx = this.getCharIdx(word, i);
			node.children[charIdx] ||= { value: word[i], children: [] };
			node = node.children[charIdx];
			if (i === word.length - 1) node.isWord = true;
		}
	}

	has(
		word: string,
		index: number = 0,
		curr: Node<string> = this.head,
	): boolean {
		if (!curr) return false;
		if (index === word.length) return !!curr.isWord;

		const charIdx = this.getCharIdx(word, index);
		const childNode = curr.children[charIdx];

		index++;

		return this.has(word, index, childNode);
	}
}

export default async function spellcheck(
	dictPath: string,
	inputPath: string,
	useSet?: boolean,
): Promise<string[]> {
	const dictRaw = await fs.readFile(dictPath, { encoding: "utf-8" });
	const inputRaw = await fs.readFile(inputPath, { encoding: "utf-8" });

	const dictArr = dictRaw.split("\n");
	const dictLook = useSet ? new Set() : new Trie();

	dictArr.forEach((word) => dictLook.add(word.toLowerCase()));

	// split uses separators found in the input but in real world we'd want to
	// define this further…
	const inputArr = inputRaw.split(/[\n \-]/);

	const results: string[] = [];
	for (let i = 0; i < inputArr.length; i++) {
		// replacer probably too aggressive real-world
		const sanitizedWord = inputArr[i].toLowerCase().replace(/[^a-z]/, "");

		if (!dictLook.has(sanitizedWord)) {
			results.push(sanitizedWord);
		}
	}

	return results;
}
