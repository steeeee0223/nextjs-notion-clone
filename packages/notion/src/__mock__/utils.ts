import type { UploadFile } from "../types";

export const mockUploadFile: UploadFile = (file) =>
  Promise.resolve({
    url: URL.createObjectURL(file),
  });
