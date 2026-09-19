import { Router } from "express";
import { VisitorAnalyticsController } from "./visitorAnalytics.controller.js";

const router = Router();

router.post("/", VisitorAnalyticsController.trackVisitor);

export const VisitorAnalyticsRoutes: Router = router;
