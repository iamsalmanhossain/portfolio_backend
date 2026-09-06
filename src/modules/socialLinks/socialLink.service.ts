import { prisma } from "../../lib/prisma.js";
import { TCreateSocialLink, TUpdateSocialLink } from "./socialLink.validation.js";

const createSocialLink = async (payload: TCreateSocialLink) => {
  return await prisma.socialLink.create({
    data: payload,
  });
};

const getSocialLinksByHeroId = async (heroSectionId: string) => {
  return await prisma.socialLink.findMany({
    where: { heroSectionId },
    orderBy: { createdAt: 'asc' }
  });
};

const updateSocialLink = async (id: string, payload: TUpdateSocialLink) => {
  return await prisma.socialLink.update({
    where: { id },
    data: payload,
  });
};

const deleteSocialLink = async (id: string) => {
  return await prisma.socialLink.delete({
    where: { id },
  });
};

export const SocialLinkService = {
  createSocialLink,
  getSocialLinksByHeroId,
  updateSocialLink,
  deleteSocialLink,
};
