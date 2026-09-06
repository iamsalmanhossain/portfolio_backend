import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { CertificateService } from "./certificate.service.js";
import { StatusCodes } from "http-status-codes";

const createCertificate = catchAsync(async (req: Request, res: Response) => {
  const result = await CertificateService.createCertificate(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Certificate created successfully",
    data: result,
  });
});

const getAllCertificates = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "issueDate",
    sortOrder: (req.query.sortOrder as string) || "desc",
  };

  const result = await CertificateService.getAllCertificates(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Certificates retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateCertificate = catchAsync(async (req: Request, res: Response) => {
  const result = await CertificateService.updateCertificate(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Certificate updated successfully",
    data: result,
  });
});

const deleteCertificate = catchAsync(async (req: Request, res: Response) => {
  const result = await CertificateService.deleteCertificate(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Certificate deleted successfully",
    data: result,
  });
});

export const CertificateController = {
  createCertificate,
  getAllCertificates,
  updateCertificate,
  deleteCertificate,
};
