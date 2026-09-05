import { IUploadResponse } from "./upload.interface.js";


const processUploadedImage = async (
  file: Express.Multer.File | undefined
): Promise<IUploadResponse> => {
  if (!file) {
    throw new Error("কোনো ফাইল পাওয়া যায়নি!");
  }

  return {
    url: file.path,
    publicId: file.filename,
  };
};

export const UploadService = {
  processUploadedImage,
};