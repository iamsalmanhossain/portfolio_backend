import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createBlogValidationSchema, updateBlogValidationSchema } from "./blog.validation.js";
import { BlogController } from "./blog.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createBlogValidationSchema), BlogController.createBlog);
router.get("/", cacheMiddleware(), BlogController.getAllBlogs);
router.get("/:slug", cacheMiddleware(), BlogController.getBlogBySlug);
router.patch("/:id", isAuthenticated, validateRequest(updateBlogValidationSchema), BlogController.updateBlog);
router.delete("/:id", isAuthenticated, BlogController.deleteBlog);

export const BlogRoutes: Router = router;
