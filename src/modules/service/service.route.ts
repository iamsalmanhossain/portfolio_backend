import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createServiceValidationSchema, updateServiceValidationSchema } from "./service.validation.js";
import { ServiceController } from "./service.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createServiceValidationSchema), ServiceController.createService);
router.get("/", cacheMiddleware(), ServiceController.getAllServices);
router.patch("/:id", isAuthenticated, validateRequest(updateServiceValidationSchema), ServiceController.updateService);
router.delete("/:id", isAuthenticated, ServiceController.deleteService);

export const ServiceRoutes: Router = router;
