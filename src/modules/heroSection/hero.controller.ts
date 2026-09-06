import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { HeroService } from "./hero.service.js";
import { StatusCodes } from "http-status-codes";

const createHeroSection = catchAsync(async (req: Request, res: Response) => {
  const result = await HeroService.createHeroSection(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Hero section created successfully",
    data: result,
  });
});

const getAllHeroSections = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as string) || "desc",
  };

  const result = await HeroService.getAllHeroSections(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Hero sections retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getHeroSectionById = catchAsync(async (req: Request, res: Response) => {
  const result = await HeroService.getHeroSectionById(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Hero section retrieved successfully",
    data: result,
  });
});

const getActiveHeroSection = catchAsync(async (req: Request, res: Response) => {
  const result = await HeroService.getActiveHeroSection();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Active hero section retrieved successfully",
    data: result,
  });
});

const updateHeroSection = catchAsync(async (req: Request, res: Response) => {
  const result = await HeroService.updateHeroSection(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Hero section updated successfully",
    data: result,
  });
});

const deleteHeroSection = catchAsync(async (req: Request, res: Response) => {
  const result = await HeroService.deleteHeroSection(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Hero section deleted successfully",
    data: result,
  });
});

export const HeroController = {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  getActiveHeroSection,
  updateHeroSection,
  deleteHeroSection,
};
