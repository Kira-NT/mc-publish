import { ACTION_NAME } from "@/action";
import { Dependency, createDependency } from "@/dependencies";
import { LoaderType } from "@/loaders/loader-type";
import { PlatformType } from "@/platforms";
import { asString } from "@/utils/string-utils";
import { PartialRecord } from "@/utils/types";
import { RawFabricMetadata } from "./raw-fabric-metadata";

/**
 * Custom payload for Fabric metadata.
 */
export type FabricMetadataCustomPayload = {
    /**
     * A list of supported mod loaders.
     */
    loaders?: string[];

    /**
     * A list of mod dependencies.
     */
    dependencies?: string[];
}
& PartialRecord<PlatformType, string>;

/**
 * Gets the custom payload from the Fabric metadata.
 *
 * @param metadata - The raw Fabric metadata.
 *
 * @returns The custom payload attached to the given metadata.
 */
export function getFabricMetadataCustomPayload(metadata: RawFabricMetadata): FabricMetadataCustomPayload {
    return metadata?.custom?.[ACTION_NAME] || {};
}

/**
 * A list of default mod loaders associated with the Fabric loader.
 */
const DEFAULT_LOADERS = [LoaderType.FABRIC] as const;

/**
 * Gets an array of supported mod loaders from the custom payload attached to the Fabric metadata.
 *
 * @param payload - The custom payload object.
 *
 * @returns An array of supported mod loaders.
 */
export function getLoadersFromFabricMetadataCustomPayload(payload: FabricMetadataCustomPayload): string[] {
    return payload?.loaders || [...DEFAULT_LOADERS];
}

/**
 * Gets the dependencies from the custom payload attached to the Fabric metadata.
 *
 * @param payload - The custom payload object.
 *
 * @returns An array of dependencies included into the custom payload.
 */
export function getDependenciesFromFabricMetadataCustomPayload(payload: FabricMetadataCustomPayload): Dependency[] {
    if (!Array.isArray(payload?.dependencies)) {
        return [];
    }

    return payload?.dependencies?.map(x => createDependency(x)).filter(x => x) || [];
}

/**
 * Gets the project ID from the custom payload attached to the Fabric metadata based on the given platform.
 *
 * @param payload - The custom payload object.
 * @param platform - The platform for which the project ID is required.
 *
 * @returns The project ID as a string, or `undefined` if not found.
 */
export function getProjectIdFromFabricMetadataCustomPayload(payload: FabricMetadataCustomPayload, platform: PlatformType): string | undefined {
    const id = payload?.[platform];
    return id ? asString(id) : undefined;
}
