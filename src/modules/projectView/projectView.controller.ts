import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ProjectViewService } from "./projectView.service.js";
import { StatusCodes } from "http-status-codes";

const logView = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectViewService.logView(req.params.projectId as string);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Project view logged successfully",
    data: result,
  });
});

export const ProjectViewController = {
  logView,
};
