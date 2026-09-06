import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ServiceService } from "./service.service.js";
import { StatusCodes } from "http-status-codes";

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.createService(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as string) || "desc",
  };

  const result = await ServiceService.getAllServices(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Services retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.updateService(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.deleteService(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
