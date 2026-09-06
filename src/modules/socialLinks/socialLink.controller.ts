import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { SocialLinkService } from "./socialLink.service.js";
import { StatusCodes } from "http-status-codes";

const createSocialLink = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialLinkService.createSocialLink(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Social link created successfully",
    data: result,
  });
});

const getSocialLinksByHeroId = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialLinkService.getSocialLinksByHeroId(req.params.heroId as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Social links retrieved successfully",
    data: result,
  });
});

const updateSocialLink = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialLinkService.updateSocialLink(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Social link updated successfully",
    data: result,
  });
});

const deleteSocialLink = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialLinkService.deleteSocialLink(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Social link deleted successfully",
    data: result,
  });
});

export const SocialLinkController = {
  createSocialLink,
  getSocialLinksByHeroId,
  updateSocialLink,
  deleteSocialLink,
};
