import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createAboutValidationSchema, updateAboutValidationSchema } from "./about.validation.js";
import { AboutController } from "./about.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createAboutValidationSchema), AboutController.createAboutSection);
router.get("/", cacheMiddleware(), AboutController.getAllAboutSections);
router.get("/:id", cacheMiddleware(), AboutController.getAboutSectionById);
router.patch("/:id", isAuthenticated, validateRequest(updateAboutValidationSchema), AboutController.updateAboutSection);
router.delete("/:id", isAuthenticated, AboutController.deleteAboutSection);

export const AboutRoutes: Router = router;
