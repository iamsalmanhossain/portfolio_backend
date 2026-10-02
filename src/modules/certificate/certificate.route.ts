import { cacheMiddleware } from "../../middleware/cache.middleware.js";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import { createCertificateValidationSchema, updateCertificateValidationSchema } from "./certificate.validation.js";
import { CertificateController } from "./certificate.controller.js";

const router = Router();

router.post("/", isAuthenticated, validateRequest(createCertificateValidationSchema), CertificateController.createCertificate);
router.get("/", cacheMiddleware(), CertificateController.getAllCertificates);
router.patch("/:id", isAuthenticated, validateRequest(updateCertificateValidationSchema), CertificateController.updateCertificate);
router.delete("/:id", isAuthenticated, CertificateController.deleteCertificate);

export const CertificateRoutes: Router = router;
