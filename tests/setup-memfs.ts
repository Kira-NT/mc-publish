import { fs } from "memfs";

jest.mock("node:fs", () => fs);
jest.mock("node:fs/promises", () => fs.promises);
jest.mock("fs", () => fs);
jest.mock("fs/promises", () => fs.promises);
