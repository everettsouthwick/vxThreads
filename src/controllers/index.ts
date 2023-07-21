import express from "express";
const router = express.Router();
import canvasController from "./canvasController";
import oembedController from "./oembedController";
import postController from "./postController";
import userController from "./userController";

router.use("/", canvasController);
router.use("/", oembedController);
router.use("/", postController);
router.use("/", userController);

export default router;
