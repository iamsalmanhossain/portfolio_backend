import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createSeoSettingValidationSchema, updateSeoSettingValidationSchema } from "./seoSetting.validation.js";
import { SeoSettingController } from "./seoSetting.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createSeoSettingValidationSchema), SeoSettingController.createSeoSetting);
router.get("/", cacheMiddleware(), SeoSettingController.getSeoSettings);
router.patch("/:id", isAuthenticated, validateRequest(updateSeoSettingValidationSchema), SeoSettingController.updateSeoSetting);
router.delete("/:id", isAuthenticated, SeoSettingController.deleteSeoSetting);

export const SeoSettingRoutes: Router = router;
