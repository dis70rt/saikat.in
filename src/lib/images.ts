/**
 * A centralized map of all local image assets in src/assets/.
 * Import this instead of repeating import.meta.glob in every component.
 *
 * Usage:
 *   import { localImages } from "@/lib/images";
 *   const src = localImages[`/src/assets${path}`];
 *   if (src) { ... src() ... }
 */
export const localImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpeg,jpg,png,gif,webp,svg}"
);
