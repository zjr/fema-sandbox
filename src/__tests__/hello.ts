import greet from "@/hello";

test("greets", function () {
	expect(greet()).toEqual("Hello, World!");
	expect(greet("Sandra")).toEqual("Hello, Sandra!");
});
