import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createExperienceValidationSchema, updateExperienceValidationSchema } from "./experience.validation.js";
import { ExperienceController } from "./experience.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createExperienceValidationSchema), ExperienceController.createExperience);
router.get("/", cacheMiddleware(), ExperienceController.getAllExperiences);
router.patch("/:id", isAuthenticated, validateRequest(updateExperienceValidationSchema), ExperienceController.updateExperience);
router.delete("/:id", isAuthenticated, ExperienceController.deleteExperience);

export const ExperienceRoutes: Router = router;