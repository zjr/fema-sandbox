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

import spellcheck from "@/spellcheck";

const expected = ["limitationns", "costy"];

beforeAll(async () => await setup());

test("check spelling with trie", async function () {
	expect(await spellcheck("dict.txt", "input.txt")).toEqual(expected);
});

test("check spelling with hash map", async function () {
	expect(await spellcheck("dict.txt", "input.txt", true)).toEqual(expected);
});
