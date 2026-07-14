import { zipFile } from "@/../tests/utils/zip-utils";
import { vol } from "memfs";
import { FabricMetadata } from "@/loaders/fabric/fabric-metadata";
import { FabricMetadataReader } from "@/loaders/fabric/fabric-metadata-reader";

beforeEach(() => {
    vol.fromJSON({
        "fabric.mod.jar": zipFile([__dirname, "../../../content/fabric/fabric.mod.json"]),
        "text.txt": "",
    });
});

describe("FabricMetadataReader", () => {
    test("successfully reads fabric.mod.json", async () => {
        const reader = new FabricMetadataReader();

        const metadata = await reader.readMetadataFile("fabric.mod.jar");

        expect(metadata).toBeInstanceOf(FabricMetadata);
    });

    test("throws if file is not a Fabric mod", async () => {
        const reader = new FabricMetadataReader();

        await expect(reader.readMetadataFile("text.txt")).rejects.toThrow();
    });

    test("throws if file does not exist", async () => {
        const reader = new FabricMetadataReader();

        await expect(reader.readMetadataFile("text.json")).rejects.toThrow();
    });
});
