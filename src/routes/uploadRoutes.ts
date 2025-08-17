import { container } from "@/containers/containers.js";
import { UploadController } from "@/controllers/uploadController.js";
import { upload } from "@/middlewares/multer.js";
import { protectRoute } from "@/middlewares/protectedRoute.js";
import { Router } from "express";

const router: Router = Router();
const uploadController = container.resolve(UploadController);

router.post("/images", protectRoute, upload.array("images", 10), uploadController.uploadImages);
router.patch("/image/:id", protectRoute, upload.single("image"), uploadController.editImage);
router.delete("/image/:id", protectRoute, uploadController.deleteImage);
router.get("/images", protectRoute, uploadController.getImages);
router.put("/reorder", protectRoute, uploadController.reArrangeOrder);

export default router;