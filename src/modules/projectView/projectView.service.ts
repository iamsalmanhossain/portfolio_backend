import { prisma } from "../../lib/prisma.js";

const logView = async (projectId: string) => {
  return await prisma.projectView.create({
    data: { projectId },
  });
};

export const ProjectViewService = {
  logView,
};
