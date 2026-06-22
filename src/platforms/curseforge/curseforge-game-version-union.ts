import { JavaVersion } from "@/utils/java";

/**
 * Represents a union of entities CurseForge treats as "game versions".
 */
export interface CurseForgeGameVersionUnion {
    /**
     * An array of supported game versions for this project version.
     */
    game_versions?: string[];

    /**
     * An array of supported java versions for this project version.
     */
    java_versions?: (string | JavaVersion)[];

    /**
     * An array of supported environments for this project version.
     */
    environments?: string[];

    /**
     * The mod loaders that this version supports.
     */
    loaders?: string[];
}
