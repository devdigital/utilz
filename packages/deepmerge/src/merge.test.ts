import { deepmerge } from "./merge";

describe("deepmerge", () => {
  it("returns default empty object if inputs are undefined", () => {
    expect(deepmerge()).toEqual({});
  });

  it("returns empty object if inputs are null", () => {
    expect(deepmerge(null, null)).toEqual({});
  });

  it("returns default object if inputs are undefined", () => {
    expect(deepmerge(undefined, undefined, { foo: "bar" })).toEqual({
      foo: "bar",
    });
  });

  it("returns default object if inputs are null", () => {
    expect(deepmerge(null, null, { foo: "bar" })).toEqual({ foo: "bar" });
  });

  it("returns merged objects for multiple inputs", () => {
    expect(
      deepmerge(null, null, { foo: "bar" }, null, {}, { foo: "baz" })
    ).toEqual({ foo: "baz" });
  });

  it("returns object one if input two is undefined", () => {
    expect(deepmerge({ foo: "bar" })).toEqual({ foo: "bar" });
  });

  it("returns object one if input two is null", () => {
    expect(deepmerge({ foo: "bar" }, null)).toEqual({ foo: "bar" });
  });

  it("returns object two if input one is undefined", () => {
    expect(deepmerge(undefined, { foo: "bar" })).toEqual({ foo: "bar" });
  });

  it("returns object two if input one is null", () => {
    expect(deepmerge(null, { foo: "bar" })).toEqual({ foo: "bar" });
  });

  it("does perform deep merge", () => {
    expect(deepmerge({ foo: { bar: "baz" } }, { foo: { baz: "bar" } })).toEqual(
      {
        foo: { bar: "baz", baz: "bar" },
      }
    );
  });

  it("does perform deep merge on multiple parameters", () => {
    expect(
      deepmerge(
        { foo: { bar: "baz" } },
        { foo: { baz: "bar" } },
        { baz: "foo" }
      )
    ).toEqual({
      foo: { bar: "baz", baz: "bar" },
      baz: "foo",
    });
  });
});
