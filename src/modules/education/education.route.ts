import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createEducationValidationSchema, updateEducationValidationSchema } from "./education.validation.js";
import { EducationController } from "./education.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createEducationValidationSchema), EducationController.createEducation);
router.get("/", cacheMiddleware(), EducationController.getAllEducations);
router.patch("/:id", isAuthenticated, validateRequest(updateEducationValidationSchema), EducationController.updateEducation);
router.delete("/:id", isAuthenticated, EducationController.deleteEducation);

export const EducationRoutes: Router = router;
