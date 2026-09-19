import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";

const saveMessage = async (payload: any) => {
  return await prisma.contactMessage.create({
    data: payload,
  });
};

const getMessages = async (options: { page?: number, limit?: number, sortBy?: string, sortOrder?: string, status?: string }) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const where: any = {};
  if (options.status) {
    where.status = options.status;
  }
  const data = await prisma.contactMessage.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    where,
  });

  const total = await prisma.contactMessage.count({ where });
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit)
    },
    data
  }
};

const markAsRead = async (id: string) => {
  return await prisma.contactMessage.update({
    where: { id },
    data: { status: 'READ' }
  });
};

const deleteMessage = async (id: string) => {
  return await prisma.contactMessage.delete({
    where: { id },
  });
};

export const ContactService = {
  saveMessage,
  getMessages,
  markAsRead,
  deleteMessage,
};
