import { container } from "@/containers/containers.js";
import { AuthController } from "@/controllers/authController.js";
import { protectRoute } from "@/middlewares/protectedRoute.js";
import { Router } from "express";

const router: Router = Router();
const authController = container.resolve(AuthController);

router.post("/login", authController.login);
router.post('/register', authController.register);
router.post('/refresh', authController.refreshToken);
router.post('/verify', protectRoute, authController.verifyUser);
router.delete('/logout', authController.logOut);
router.put("/profile", protectRoute, authController.changeUserDetails);
router.post("/password", authController.forgotPassword);
router.patch("/password/:id", authController.resetPassword);

export default router;