// Implement a spell checker!
// Input:
//     1) A text file with a newline-separated list of valid words ("the dictionary")
//     2) A text file to be spellchecked, with words separated by newlines and spaces
// Output: A list of all misspelled words from the "to be spellchecked" file.
// (A misspelled word is one that does not appear in the dictionary.)

const fs = require("fs").promises;

let dictionaryFileContents = `
analyze
and
applications
are
as
between
build
business
by
considering
cost
design
discoveries
engineering
engineers
Engineers
forms
fulfill
human
imposed
invent
life
limitations
link
machines
materials
needs
objectives
of
people
practicality
practitioners
quality
regulation
requirements
safety
scientific
structures
subsequent
systems
test
the
The
their
to
while
who
work
`;

let inputText = `Engineers, as practitioners of engineering, are people who invent, design, analyze, build, and test machines, systems,
structures and materials to fulfill objectives and requirements while considering the limitationns imposed by practicality,
regulation, safety, and costy. The work of engineers forms the link between scientific discoveries and their subsequent
applications to human and business-needs and quality of life.`;

// Expected output: ['limitationns', 'costy']

async function setup() {
	// Write dictionary data to 'dict.txt' .
	await fs.writeFile("dict.txt", dictionaryFileContents);

	// Write input text data to 'input.txt' .
	await fs.writeFile("input.txt", inputText);
}

class Node {
	constructor(value) {
		this.value = value;
		this.children = [];
		this.isWord = false;
	}
}

class Trie {
	constructor() {
		this.head = new Node();
	}

	getIndex(letter) {
		return letter.charCodeAt(0) - 97;
	}

	addWord(item, index = 0, node) {
		const letter = item.slice();

		if (item.length === 0) return;

		const letter = item.pop();

		const idx = this.getIndex(item[0]);
		node ||= this.head;
		node.children[idx] = new Node();
	}
}

async function spellcheck(dictionaryFilename, inputFilename) {
	//   TODO! (Implement me!)
	const dictionary = await fs.readFile("./dict.txt", { encoding: "utf-8" });
	const input = await fs.readFile("./input.txt", { encoding: "utf-8" });

	return input
		.split("\n")
		.reduce((arr, x) => [...arr, ...x.split(" ")], [])
		.map((x) => x.toLowerCase().replace(/[^a-z]/g, ""))
		.filter((x) => !dictionary.includes(x));

	// JavaScript file I/O:
	// https://stackoverflow.com/a/56821924
}

async function main() {
	setup();

	let result = await spellcheck("dict.txt", "input.txt");

	console.log(result);
}

main();
