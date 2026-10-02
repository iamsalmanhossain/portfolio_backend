import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createTestimonialValidationSchema, updateTestimonialValidationSchema } from "./testimonial.validation.js";
import { TestimonialController } from "./testimonial.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createTestimonialValidationSchema), TestimonialController.createTestimonial);
router.get("/", cacheMiddleware(), TestimonialController.getAllTestimonials);
router.patch("/:id", isAuthenticated, validateRequest(updateTestimonialValidationSchema), TestimonialController.updateTestimonial);
router.delete("/:id", isAuthenticated, TestimonialController.deleteTestimonial);

export const TestimonialRoutes: Router = router;
