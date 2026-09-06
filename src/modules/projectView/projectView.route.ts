import { Router } from "express";
import { ProjectViewController } from "./projectView.controller.js";

const router = Router();

router.post("/:projectId", ProjectViewController.logView);

export const ProjectViewRoutes: Router = router;
