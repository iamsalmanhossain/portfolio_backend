import { Router } from "express";
import { AuthRoutes } from "../../modules/auth/auth.route.js";
import { DashboardRoutes } from "../../modules/dashboard/dashboard.route.js";
import { ProjectRoutes } from "../../modules/project/project.route.js";
import { ProjectCategoryRoutes } from "../../modules/projectCategory/projectCategory.route.js";
import { ProjectViewRoutes } from "../../modules/projectView/projectView.route.js";
import { SkillRoutes } from "../../modules/skill/skill.route.js";
import { ExperienceRoutes } from "../../modules/experience/experience.route.js";
import { ContactRoutes } from "../../modules/contact/contact.route.js";
import { UploadRoutes } from "../../modules/upload/upload.route.js";
import { HeroRoutes } from "../../modules/heroSection/hero.route.js";
import { SocialLinkRoutes } from "../../modules/socialLinks/socialLink.route.js";
import { EducationRoutes } from "../../modules/education/education.route.js";
import { ServiceRoutes } from "../../modules/service/service.route.js";
import { TestimonialRoutes } from "../../modules/testimonial/testimonial.route.js";

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
        path: "/project-categories",
        route: ProjectCategoryRoutes,
    },
    {
        path: "/project-views",
        route: ProjectViewRoutes,
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
    },
    {
        path: "/upload",
        route: UploadRoutes,
    },
    {
        path: "/hero",
        route: HeroRoutes,
    },
    {
        path: "/social-links",
        route: SocialLinkRoutes,
    },
    {
        path: "/educations",
        route: EducationRoutes,
    },
    {
        path: "/services",
        route: ServiceRoutes,
    },
    {
        path: "/testimonials",
        route: TestimonialRoutes,
    }
];

// Mount each feature module route to the base router path
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;