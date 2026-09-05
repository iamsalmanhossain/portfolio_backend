import { IUploadResponse } from "./upload.interface.js";


const processUploadedImage = async (
  files: Express.Multer.File[] | undefined
): Promise<IUploadResponse[]> => {
  if (!files || files.length === 0) {
    throw new Error("কোনো ফাইল পাওয়া যায়নি!");
  }

  return files.map(file => ({
    url: file.path,
    publicId: file.filename,
  }));
};

export const UploadService = {
  processUploadedImage,
};