import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createCategoryValidationSchema } from "./projectCategory.validation.js";
import { ProjectCategoryController } from "./projectCategory.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createCategoryValidationSchema), ProjectCategoryController.createCategory);
router.get("/", cacheMiddleware(), ProjectCategoryController.getAllCategories);
router.patch("/:id", isAuthenticated, validateRequest(createCategoryValidationSchema), ProjectCategoryController.updateCategory);
router.delete("/:id", isAuthenticated, ProjectCategoryController.deleteCategory);

export const ProjectCategoryRoutes: Router = router;
