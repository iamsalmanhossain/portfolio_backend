import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { UploadService } from "./upload.service.js";
";

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  const result = await UploadService.processUploadedImage(req.file);

  res.status(200).json({
    success: true,
    message: "ফাইল সফলভাবে আপলোড হয়েছে!",
    data: result,
  });
});

export const UploadController = {
  uploadImage,
};