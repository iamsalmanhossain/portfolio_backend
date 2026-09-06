import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateHero, TUpdateHero } from "./hero.validation.js";

const createHeroSection = async (payload: TCreateHero) => {
  return await prisma.heroSection.create({
    data: payload,
  });
};

const getAllHeroSections = async (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const result = await prisma.heroSection.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: { socialLinks: true },
  });
  const total = await prisma.heroSection.count();
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

const getHeroSectionById = async (id: string) => {
  return await prisma.heroSection.findUnique({
    where: { id },
    include: { socialLinks: true },
  });
};

const getActiveHeroSection = async () => {
  return await prisma.heroSection.findFirst({
    where: { isActive: true },
    include: { socialLinks: true },
  });
};

const updateHeroSection = async (id: string, payload: TUpdateHero) => {
  return await prisma.heroSection.update({
    where: { id },
    data: payload,
  });
};

const deleteHeroSection = async (id: string) => {
  return await prisma.heroSection.delete({
    where: { id },
  });
};

export const HeroService = {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  getActiveHeroSection,
  updateHeroSection,
  deleteHeroSection,
};
