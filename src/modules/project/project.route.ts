import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createProjectValidationSchema, updateProjectValidationSchema } from "./project.validation.js";
import { ProjectController } from "./project.controller.js";

const router = Router();

// Project Routes
router.post("/", isAuthenticated, validateRequest(createProjectValidationSchema), ProjectController.createProject);
router.get("/", cacheMiddleware(), ProjectController.getAllProjects);
router.get("/:id", cacheMiddleware(), ProjectController.getProjectById);
router.patch("/:id", isAuthenticated, validateRequest(updateProjectValidationSchema), ProjectController.updateProject);
router.delete("/:id", isAuthenticated, ProjectController.deleteProject);

export const ProjectRoutes: Router = router;