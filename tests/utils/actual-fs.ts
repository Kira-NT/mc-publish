export const actualFs = jest.requireActual<typeof import("node:fs")>("node:fs");
export const actualFsPromises = jest.requireActual<typeof import("node:fs/promises")>("node:fs/promises");
