import { zipFile } from "@/../tests/utils/zip-utils";
import { vol } from "memfs";
import { QuiltMetadata } from "@/loaders/quilt/quilt-metadata";
import { QuiltMetadataReader } from "@/loaders/quilt/quilt-metadata-reader";

beforeEach(() => {
    vol.fromJSON({
        "quilt.mod.jar": zipFile([__dirname, "../../../content/quilt/quilt.mod.json"]),
        "text.txt": "",
    });
});

describe("QuiltMetadataReader", () => {
    test("successfully reads quilt.mod.json", async () => {
        const reader = new QuiltMetadataReader();

        const metadata = await reader.readMetadataFile("quilt.mod.jar");

        expect(metadata).toBeInstanceOf(QuiltMetadata);
    });

    test("throws if file is not a Quilt mod", async () => {
        const reader = new QuiltMetadataReader();

        await expect(reader.readMetadataFile("text.txt")).rejects.toThrow();
    });

    test("throws if file does not exist", async () => {
        const reader = new QuiltMetadataReader();

        await expect(reader.readMetadataFile("text.json")).rejects.toThrow();
    });
});
