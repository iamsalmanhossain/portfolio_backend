import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";

const saveMessage = async (payload: any) => {
  return await prisma.contactMessage.create({
    data: payload,
  });
};

const getMessages = async (options: { page?: number, limit?: number, sortBy?: string, sortOrder?: string }) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
  const where = {}
  const data =await prisma.contactMessage.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    where,
  });

  const total = await prisma.contactMessage.count()
  return {
    meta:{
      page,
      limit,
      total,
      totalPage:Math.ceil(total/limit)
    },
    data
  }
};

const deleteMessage = async (id: string) => {
  return await prisma.contactMessage.delete({
    where: { id },
  });
};

export const ContactService = {
  saveMessage,
  getMessages,
  deleteMessage,
};