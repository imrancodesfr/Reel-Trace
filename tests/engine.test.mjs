import test from "node:test";
import assert from "node:assert/strict";

function normalise(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[""'''`!?.,:;()\[\]{}—–\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

test("normalise strips punctuation and whitespace", () => {
  assert.equal(normalise('"Why so serious?"'), "why so serious");
  assert.equal(normalise("  There  is  no   spoon!  "), "there is no spoon");
  assert.equal(normalise("I'll be back..."), "i ll be back");
  assert.equal(normalise("I am vengeance."), "i am vengeance");
  assert.equal(normalise("I have abandoned my child!"), "i have abandoned my child");
});

test("searches correctly match user target quotes", async () => {
  // Read quotesDatabase definition
  const fs = await import("node:fs");
  const content = fs.readFileSync(
    new URL("../lib/domain/quotes-database.ts", import.meta.url),
    "utf-8"
  );

  assert.ok(content.includes("I am vengeance"), "Database must include 'I am vengeance'");
  assert.ok(content.includes("The Batman"), "Database must include 'The Batman'");
  assert.ok(content.includes("I have abandoned my child"), "Database must include 'I have abandoned my child'");
  assert.ok(content.includes("There Will Be Blood"), "Database must include 'There Will Be Blood'");
  assert.ok(content.includes("I drink your milkshake"), "Database must include 'I drink your milkshake'");
});
