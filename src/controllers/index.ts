import express from "express";
const router = express.Router();
import oembedController from "./oembedController";
import postController from "./postController";
import userController from "./userController";

router.use("/", oembedController);
router.use("/", postController);
router.use("/", userController);

export default router;