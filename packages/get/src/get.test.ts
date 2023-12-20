import { vi } from "vitest";
import { get } from "./get";

describe("get", () => {
  it("should return undefined for key that is not present", () => {
    expect(get({}, "foo")).toEqual(undefined);
  });

  it("should return expected value for key that is present", () => {
    expect(get({ foo: "bah" }, "foo")).toEqual("bah");
  });

  it("should return expected value for nested property", () => {
    expect(get({ foo: { bar: "baz" } }, "foo.bar")).toEqual("baz");
  });

  it("should return fallback function value if key not present", () => {
    expect(get({}, "foo", () => "baz")).toEqual("baz");
  });

  it("should invoke not found function if key not present", () => {
    expect(() =>
      get({}, "foo", undefined, () => {
        throw new Error("foo");
      })
    ).toThrow("foo");
  });

  it("should invoke not found function if nested key not present", () => {
    expect(() =>
      get({ foo: {} }, "foo.baz", undefined, () => {
        throw new Error("foo");
      })
    ).toThrow("foo");
  });

  it("should pass expected parameters to fallback function", () => {
    const fallback = vi.fn();
    get({ foo: {} }, "foo.baz", fallback);
    expect(fallback).toHaveBeenCalledWith({
      key: "foo.baz",
      keyArray: ["foo", "baz"],
      obj: {
        foo: {},
      },
    });
  });

  it("should pass expected parameters to not found function", () => {
    const notfound = vi.fn();
    get({ foo: {} }, "foo.baz", undefined, notfound);
    expect(notfound).toHaveBeenCalledWith({
      message: `No property 'baz' found on object at foo.`,
      key: "foo.baz",
      keyArray: ["foo", "baz"],
      obj: {
        foo: {},
      },
    });
  });
});
