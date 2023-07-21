import express from "express";
import { HttpRequestError } from "../errors/httpRequestError";
import { stitchImages } from "../services/canvasService";
const router = express.Router();

router.post("/api/canvas", express.json(), async (req, res, next) => {
  const urls = req.body.urls;

  if (!req.body.urls) {
    return next(new HttpRequestError(400, 'Missing "urls" in request body'));
  }

  if (!Array.isArray(urls)) {
    return next(new HttpRequestError(400, 'Invalid "urls" in request body'));
  }

  try {
    const dataUrl = await stitchImages(urls);
    return res.json({ success: true, dataUrl });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

export default router;
