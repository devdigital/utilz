import chalk from "chalk";
import MockDate from "mockdate";
import { vi } from "vitest";
import { LogLevel, createLogger } from "../logger";
import {
  defaultColorMap,
  consoleLog,
  consoleFormat,
  shortTime,
} from "./console-log";

describe("createConsoleLogger", () => {
  it("should write expected log level", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.info("message");
    expect(console.log).toHaveBeenCalledWith("INFO: message");
  });

  it("should not write trace log level by default", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.trace("message");
    expect(console.log).not.toHaveBeenCalled();
  });

  it("should not write debug log level by default", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.debug("message");
    expect(console.log).not.toHaveBeenCalled();
  });

  it("should write trace color", () => {
    const logger = createLogger({
      level: LogLevel.TRACE,
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.trace("message");
    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.TRACE])("TRACE: message")
    );
  });

  it("should write debug color", () => {
    const logger = createLogger({
      level: LogLevel.DEBUG,
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.debug("message");
    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.DEBUG])("DEBUG: message")
    );
  });

  it("should write warn color", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.warn("message");
    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.WARN])("WARN: message")
    );
  });

  it("should write error color", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.error("message");
    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.ERROR])("ERROR: message")
    );
  });

  it("should include warn exception", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.warn("message", new Error("exception"));

    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.WARN])(
        "WARN: message Error: exception"
      )
    );
  });

  it("should include error exception", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();
    logger.error("message", new Error("exception"));

    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.ERROR])(
        "ERROR: message Error: exception"
      )
    );
  });

  it("should include params", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();

    logger.info("message", { foo: "bar" });

    expect(console.log).toHaveBeenCalledWith(
      `INFO: message ${JSON.stringify({ foo: "bar" })}`
    );
  });

  it("should include params and error", () => {
    const logger = createLogger({
      log: consoleLog(),
    });

    console.log = vi.fn();

    logger.error("message", { foo: "bar" }, new Error("exception"));

    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.ERROR])(
        `ERROR: message ${JSON.stringify({ foo: "bar" })} Error: exception`
      )
    );
  });

  it("should include application name", () => {
    const logger = createLogger({
      log: consoleLog({
        format: consoleFormat({
          applicationName: "app",
        }),
      }),
    });

    console.log = vi.fn();

    logger.error("message");

    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.ERROR])(`app: ERROR: message`)
    );
  });

  it("should include timestamp", () => {
    MockDate.set(new Date("2000-01-01"));

    const logger = createLogger({
      log: consoleLog({
        format: consoleFormat({
          timestamp: shortTime,
        }),
      }),
    });

    console.log = vi.fn();

    logger.error("message");

    MockDate.reset();

    expect(console.log).toHaveBeenCalledWith(
      chalk.hex(defaultColorMap[LogLevel.ERROR])(`00:00:00: ERROR: message`)
    );
  });

  it("should allow write to be overridden", () => {
    const logger = createLogger({
      log: consoleLog({
        write: (message: string) => console.log(`overridden: ${message}`),
      }),
    });

    console.log = vi.fn();
    logger.error("message");

    expect(console.log).toHaveBeenCalledWith(
      `overridden: ${chalk.hex(defaultColorMap[LogLevel.ERROR])(
        `ERROR: message`
      )}`
    );
  });

  it("should allow colors to be overridden", () => {
    const logger = createLogger({
      log: consoleLog({
        colors: {
          [LogLevel.ERROR]: "#c0c",
        },
      }),
    });

    console.log = vi.fn();
    logger.error("message");

    expect(console.log).toHaveBeenCalledWith(
      chalk.hex("#c0c")(`ERROR: message`)
    );
  });
});
