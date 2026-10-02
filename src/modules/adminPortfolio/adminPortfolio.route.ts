import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import express, { Router } from "express";
import { AdminPortfolioController } from "./adminPortfolio.controller.js";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { AdminPortfolioValidation } from "./adminPortfolio.validation.js";

const router = express.Router();

// Get the active template for the home page (Public)
router.get("/active", cacheMiddleware(), AdminPortfolioController.getActiveTemplate);

// Get all templates (Admin only)
router.get("/", isAuthenticated, AdminPortfolioController.getAllTemplates);

// Create a new template (Admin only)
router.post(
  "/",
  isAuthenticated,
  validateRequest(AdminPortfolioValidation.createAdminPortfolioValidationSchema),
  AdminPortfolioController.createTemplate
);

// Update a template (Admin only)
router.patch(
  "/:id",
  isAuthenticated,
  validateRequest(AdminPortfolioValidation.updateAdminPortfolioValidationSchema),
  AdminPortfolioController.updateTemplate
);

// Delete a template (Admin only)
router.delete("/:id", isAuthenticated, AdminPortfolioController.deleteTemplate);

export const AdminPortfolioRoutes: Router = router;

