import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AdminPortfolioService } from "./adminPortfolio.service.js";
import { StatusCodes } from "http-status-codes";

const createTemplate = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminPortfolioService.createTemplate(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Admin portfolio template created successfully",
    data: result,
  });
});

const getAllTemplates = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminPortfolioService.getAllTemplates();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All portfolio templates retrieved successfully",
    data: result,
  });
});

const getActiveTemplate = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminPortfolioService.getActiveTemplate();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Active portfolio template retrieved successfully",
    data: result,
  });
});

const updateTemplate = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminPortfolioService.updateTemplate(
    req.params.id as string,
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin portfolio template updated successfully",
    data: result,
  });
});

const deleteTemplate = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminPortfolioService.deleteTemplate(
    req.params.id as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin portfolio template deleted successfully",
    data: result,
  });
});

export const AdminPortfolioController = {
  createTemplate,
  getAllTemplates,
  getActiveTemplate,
  updateTemplate,
  deleteTemplate,
};
