import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createHeroValidationSchema, updateHeroValidationSchema } from "./hero.validation.js";
import { HeroController } from "./hero.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createHeroValidationSchema), HeroController.createHeroSection);
router.get("/active", HeroController.getActiveHeroSection);
router.get("/", HeroController.getAllHeroSections);
router.get("/:id", HeroController.getHeroSectionById);
router.patch("/:id", isAuthenticated, validateRequest(updateHeroValidationSchema), HeroController.updateHeroSection);
router.delete("/:id", isAuthenticated, HeroController.deleteHeroSection);

export const HeroRoutes: Router = router;
