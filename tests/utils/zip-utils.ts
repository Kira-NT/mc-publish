import { basename, resolve as resolvePath } from "node:path";
import Zip from "adm-zip";

export function zipFile(path: string | string[], zipPath?: string): Buffer {
    const fs = jest.requireActual<typeof import("node:fs")>("node:fs");
    const realPath = typeof path === "string" ? path : resolvePath(...path);
    zipPath ||= basename(realPath);

    const zip = new Zip();
    zip.addFile(zipPath, fs.readFileSync(realPath));
    return zip.toBuffer();
}

export function zipContent(content: string | Buffer, zipPath: string): Buffer {
    const zip = new Zip();
    zip.addFile(zipPath, typeof content === "string" ? Buffer.from(content) : content);
    return zip.toBuffer();
}
