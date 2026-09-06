import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { TestimonialService } from "./testimonial.service.js";
import { StatusCodes } from "http-status-codes";

const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.createTestimonial(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Testimonial created successfully",
    data: result,
  });
});

const getAllTestimonials = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as string) || "desc",
  };

  const result = await TestimonialService.getAllTestimonials(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Testimonials retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.updateTestimonial(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Testimonial updated successfully",
    data: result,
  });
});

const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.deleteTestimonial(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Testimonial deleted successfully",
    data: result,
  });
});

export const TestimonialController = {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
};
