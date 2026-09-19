import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createContactValidationSchema } from "./contact.validation.js";
import { ContactController } from "./contact.controller.js";

const router = Router();

// Public endpoint: Send new message
router.post("/", validateRequest(createContactValidationSchema), ContactController.saveMessage);
// Admin only endpoints
router.get("/", isAuthenticated, ContactController.getMessages);
router.patch("/:id/read", isAuthenticated, ContactController.markAsRead);
router.delete("/:id", isAuthenticated, ContactController.deleteMessage);

export const ContactRoutes: Router = router;
