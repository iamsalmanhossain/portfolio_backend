
import { Router } from 'express';
import { upload } from '../../middleware/upload.js';
import { UploadController } from './upload.controller.js';


const router = Router();

// Endpoint: POST /api/upload
// 'image' হলো form-data এর ফিল্ড নেম
router.post(
    '/',
    upload.array('image', 10),
    UploadController.uploadImage
);  

export const UploadRoutes: Router = router;