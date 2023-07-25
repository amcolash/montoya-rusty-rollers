import { ref } from "firebase/database";
import { Meta, getEditedImageId } from "../components/admin/Cropper";
import { database } from "../util/firebase";
import { useDb } from "./useDb";
import { useCallback } from "react";

export const metadataPath = 'metadata/images';

export function useImageMeta() {
  const reference = ref(database, metadataPath);
  const [val, loading, error, setVal, saving] = useDb<{ [key: string]: Meta }>(reference);

  const getEditImageUrl = useCallback((itemPath: string, url: string) => {
    const path = getEditedImageId(itemPath);

    if (val && val[path] !== undefined) return url.replace('images%2F', 'images%2Fcropped%2F');
    return url;
  }, [val]);

  return {meta: val, getEditImageUrl};
}