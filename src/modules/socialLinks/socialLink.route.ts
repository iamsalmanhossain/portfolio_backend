import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createSocialLinkValidationSchema, updateSocialLinkValidationSchema } from "./socialLink.validation.js";
import { SocialLinkController } from "./socialLink.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createSocialLinkValidationSchema), SocialLinkController.createSocialLink);
router.get("/hero/:heroId", cacheMiddleware(), SocialLinkController.getSocialLinksByHeroId);
router.patch("/:id", isAuthenticated, validateRequest(updateSocialLinkValidationSchema), SocialLinkController.updateSocialLink);
router.delete("/:id", isAuthenticated, SocialLinkController.deleteSocialLink);

export const SocialLinkRoutes: Router = router;
