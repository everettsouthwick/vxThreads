import express from "express";
const router = express.Router();
import oembedController from "./oembedController";
import threadRoutes from "../routes/threadRoutes";

router.use("/", oembedController);
router.use("/", threadRoutes);

export default router;