import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateCertificate, TUpdateCertificate } from "./certificate.validation.js";

const createCertificate = async (payload: TCreateCertificate) => {
  return await prisma.certificate.create({
    data: payload,
  });
};

const getAllCertificates = async (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const result = await prisma.certificate.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.certificate.count();
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const updateCertificate = async (id: string, payload: TUpdateCertificate) => {
  return await prisma.certificate.update({
    where: { id },
    data: payload,
  });
};

const deleteCertificate = async (id: string) => {
  return await prisma.certificate.delete({
    where: { id },
  });
};

export const CertificateService = {
  createCertificate,
  getAllCertificates,
  updateCertificate,
  deleteCertificate,
};
