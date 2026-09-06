import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { SeoSettingService } from "./seoSetting.service.js";
import { StatusCodes } from "http-status-codes";

const createSeoSetting = catchAsync(async (req: Request, res: Response) => {
  const result = await SeoSettingService.createSeoSetting(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "SEO setting created successfully",
    data: result,
  });
});

const getSeoSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await SeoSettingService.getSeoSettings();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SEO settings retrieved successfully",
    data: result,
  });
});

const updateSeoSetting = catchAsync(async (req: Request, res: Response) => {
  const result = await SeoSettingService.updateSeoSetting(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SEO setting updated successfully",
    data: result,
  });
});

const deleteSeoSetting = catchAsync(async (req: Request, res: Response) => {
  const result = await SeoSettingService.deleteSeoSetting(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SEO setting deleted successfully",
    data: result,
  });
});

export const SeoSettingController = {
  createSeoSetting,
  getSeoSettings,
  updateSeoSetting,
  deleteSeoSetting,
};
