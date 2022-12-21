import { Skia } from "../Skia";
import type { DataSourceParam, SkCanvas, SkSize } from "../types";

import { useRawData } from "./Data";

const imgFactory = Skia.Image.MakeImageFromEncoded.bind(Skia.Image);

/**
 * Returns a Skia Image object
 * */
export const useImage = (
  source: DataSourceParam,
  onError?: (err: Error) => void
) => useRawData(source, imgFactory, onError);

/**
 * Returns an SkImage from a drawing
 * @param size Image Size
 * @param cb Callback for drawing to the canvas
 * @returns SkImage
 */
export const createImage = (size: SkSize, cb: (canvas: SkCanvas) => void) => {
  const surface = Skia.Surface.Make(size.width, size.height);
  if (!surface) {
    throw new Error("Failed to create SkSurface");
  }
  const canvas = surface.getCanvas();
  cb(canvas);
  return surface.makeImageSnapshot();
};
