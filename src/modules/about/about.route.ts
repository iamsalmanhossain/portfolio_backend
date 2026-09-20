import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createAboutValidationSchema, updateAboutValidationSchema } from "./about.validation.js";
import { AboutController } from "./about.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createAboutValidationSchema), AboutController.createAboutSection);
router.get("/", AboutController.getAllAboutSections);
router.get("/:id", AboutController.getAboutSectionById);
router.patch("/:id", isAuthenticated, validateRequest(updateAboutValidationSchema), AboutController.updateAboutSection);
router.delete("/:id", isAuthenticated, AboutController.deleteAboutSection);

export const AboutRoutes: Router = router;
