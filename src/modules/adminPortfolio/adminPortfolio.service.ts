import { prisma } from "../../lib/prisma.js";

// Create a new portfolio template
const createTemplate = async (payload: any) => {
  // If the new template is meant to be active, deactivate all others first
  if (payload.isActive) {
    await prisma.adminPortfolioTemplate.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });
  }

  const result = await prisma.adminPortfolioTemplate.create({
    data: {
      templateName: payload.templateName,
      isActive: payload.isActive || false,
      personalData: payload.personalData || {},
      websiteData: payload.websiteData || {},
    },
  });

  return result;
};

// Get all templates (for Admin Dashboard)
const getAllTemplates = async () => {
  const result = await prisma.adminPortfolioTemplate.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};

// Get the active template (For Home Page)
const getActiveTemplate = async () => {
  const result = await prisma.adminPortfolioTemplate.findFirst({
    where: { isActive: true },
  });

  if (!result) {
    throw new Error("No active portfolio template found");
  }

  return result;
};

// Update a template (and handle active state)
const updateTemplate = async (id: string, payload: any) => {
  // Use a transaction if we are setting this one to active
  if (payload.isActive) {
    return await prisma.$transaction(async (tx) => {
      // Deactivate all others
      await tx.adminPortfolioTemplate.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });

      // Update the target one
      const updated = await tx.adminPortfolioTemplate.update({
        where: { id },
        data: payload,
      });

      return updated;
    });
  } else {
    // Just a normal update
    const result = await prisma.adminPortfolioTemplate.update({
      where: { id },
      data: payload,
    });
    return result;
  }
};

// Delete a template
const deleteTemplate = async (id: string) => {
  const result = await prisma.adminPortfolioTemplate.delete({
    where: { id },
  });
  return result;
};

export const AdminPortfolioService = {
  createTemplate,
  getAllTemplates,
  getActiveTemplate,
  updateTemplate,
  deleteTemplate,
};
