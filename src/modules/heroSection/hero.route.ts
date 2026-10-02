import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createHeroValidationSchema, updateHeroValidationSchema } from "./hero.validation.js";
import { HeroController } from "./hero.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createHeroValidationSchema), HeroController.createHeroSection);
router.get("/active", cacheMiddleware(), HeroController.getActiveHeroSection);
router.get("/", cacheMiddleware(), HeroController.getAllHeroSections);
router.get("/:id", cacheMiddleware(), HeroController.getHeroSectionById);
router.patch("/:id", isAuthenticated, validateRequest(updateHeroValidationSchema), HeroController.updateHeroSection);
router.delete("/:id", isAuthenticated, HeroController.deleteHeroSection);

export const HeroRoutes: Router = router;
