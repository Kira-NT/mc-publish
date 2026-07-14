import { zipFile } from "@/../tests/utils/zip-utils";
import { vol } from "memfs";
import { ForgeMetadata } from "@/loaders/forge/forge-metadata";
import { ForgeMetadataReader } from "@/loaders/forge/forge-metadata-reader";

beforeEach(() => {
    vol.fromJSON({
        "forge.mod.jar": zipFile([__dirname, "../../../content/forge/mods.toml"], "META-INF/mods.toml"),
        "text.txt": "",
    });
});

describe("ForgeMetadataReader", () => {
    test("successfully reads mods.toml", async () => {
        const reader = new ForgeMetadataReader();

        const metadata = await reader.readMetadataFile("forge.mod.jar");

        expect(metadata).toBeInstanceOf(ForgeMetadata);
    });

    test("throws if file is not a Forge mod", async () => {
        const reader = new ForgeMetadataReader();

        await expect(reader.readMetadataFile("text.txt")).rejects.toThrow();
    });

    test("throws if file does not exist", async () => {
        const reader = new ForgeMetadataReader();

        await expect(reader.readMetadataFile("text.json")).rejects.toThrow();
    });
});
