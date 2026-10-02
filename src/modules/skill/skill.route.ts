import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createSkillValidationSchema, updateSkillValidationSchema } from "./skill.validation.js";
import { SkillController } from "./skill.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createSkillValidationSchema), SkillController.createSkill);
router.get("/", cacheMiddleware(), SkillController.getAllSkills);
router.patch("/:id", isAuthenticated, validateRequest(updateSkillValidationSchema), SkillController.updateSkill);
router.delete("/:id", isAuthenticated, SkillController.deleteSkill);

export const SkillRoutes: Router = router;