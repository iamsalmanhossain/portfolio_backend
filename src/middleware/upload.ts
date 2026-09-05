import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import env from "../config/env.js";

cloudinary.config({
  cloud_name: env.cloud_name,
  api_key: env.api_key,
  api_secret: env.api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: async () => {
    return {
      folder: "uploads",
      allowed_formats: [
        "png",
        "jpg",
        "jpeg",
        "webp",
        "gif",
        "pdf",
      ],
    };
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PNG, JPG, JPEG, WEBP, GIF and PDF files are allowed."));
    }
  },
});