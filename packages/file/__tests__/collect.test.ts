import path from "path";
import { collect } from "../src/collect";
import { ext } from "../src/ext";

// TODO: mock file system
describe("collect", () => {
  it("should throw on non folder", async () => {
    const startPath = path.resolve(__dirname, "./files/1.js");
    expect(collect(startPath)).rejects.toThrow(
      `Start path '${startPath}' must be a folder.`
    );
  });

  it.skip("should return expected files and folders", async () => {
    const items = await collect(path.resolve(__dirname, "./files"));

    expect(items.map(({ name }) => name)).toEqual([
      "1.js",
      "2.js",
      "1.js",
      "2.js",
      "1.js",
      "2.js",
      "4",
      "3",
    ]);
  });

  it("should return first level of files and folders if descendants disabled", async () => {
    const items = await collect(path.resolve(__dirname, "./files"), {
      includeDescendants: false,
    });

    expect(items.map(({ name }) => name)).toEqual(["1.js", "2.js", "3"]);
  });

  it("should return files only", async () => {
    const items = await collect(path.resolve(__dirname, "./files"), {
      filter: ext(".js"),
    });

    expect(items.map(({ name }) => name)).toEqual([
      "1.js",
      "2.js",
      "1.js",
      "2.js",
      "1.js",
      "2.js",
    ]);
  });

  it("should return files only as array", async () => {
    const items = await collect(path.resolve(__dirname, "./files"), {
      filter: ext([".js"]),
    });

    expect(items.map(({ name }) => name)).toEqual([
      "1.js",
      "2.js",
      "1.js",
      "2.js",
      "1.js",
      "2.js",
    ]);
  });

  it("should return files based on custom filter", async () => {
    const items = await collect(path.resolve(__dirname, "./files"), {
      filter: ({ name }) => name === "2.js",
    });

    expect(items.map(({ name }) => name)).toEqual(["2.js", "2.js", "2.js"]);
  });
});
