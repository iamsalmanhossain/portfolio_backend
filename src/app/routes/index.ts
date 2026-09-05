import { Router } from "express";
import { AuthRoutes } from "../../modules/auth/auth.route.js";
import { DashboardRoutes } from "../../modules/dashboard/dashboard.route.js";
import { ProjectRoutes } from "../../modules/project/project.route.js";
import { SkillRoutes } from "../../modules/skill/skill.route.js";
import { ExperienceRoutes } from "../../modules/experience/experience.route.js";
import { ContactRoutes } from "../../modules/contact/contact.route.js";

const router: Router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/dashboard",
        route: DashboardRoutes,
    },
    {
        path: "/projects",
        route: ProjectRoutes,
    },
    {
        path: "/skills",
        route: SkillRoutes,
    },
    {
        path: "/experiences",
        route: ExperienceRoutes,
    },
    {
        path: "/contacts",
        route: ContactRoutes,
    }
];

// Mount each feature module route to the base router path
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;