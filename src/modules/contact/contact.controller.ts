import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ContactService } from "./contact.service.js";
import { StatusCodes } from "http-status-codes";

const saveMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.saveMessage(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getMessages = catchAsync(async (req: Request, res: Response) => {
  try {
    const options = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      sortBy: (req.query.sortBy as string) || 'createdAt',
      sortOrder: (req.query.sortOrder as string) || 'desc',
      status: (req.query.status as string) || undefined,
    };

    const result = await ContactService.getMessages(options)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Messages retrieved successfully",
      meta:result.meta,
      data:result.data,
    });
  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to retrieve messages",
        errorMessages: [error],
      });
  }
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.markAsRead(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message marked as read successfully",
    data: result,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.deleteMessage(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message deleted successfully",
    data: result,
  });
});

export const ContactController = {
  saveMessage,
  getMessages,
  markAsRead,
  deleteMessage,
};
