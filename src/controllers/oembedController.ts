import express from "express";
import { HttpRequestError } from "../errors/httpRequestError";
import { Constants } from "../constants/constants";
import { OEmbed } from "../models/oEmbed";
const router = express.Router();

router.get("/api/oembed", async (req, res, next) => {
  try {
    if (!req.query.url || !req.query.text) {
      return next(new HttpRequestError(400, "Missing query parameters"));
    }

    if (typeof req.query.url !== "string" || typeof req.query.text !== "string") {
      return next(new HttpRequestError(400, "Invalid query parameters"));
    }

    const oEmbed: OEmbed = {
      type: "link",
      version: "1.0",
      title: Constants.Title,
      author_name: req.query.text,
      author_url: req.query.url,
      provider_name: Constants.SiteName,
      provider_url: Constants.GitHubUrl,
      cache_age: 3600,
      thumbnail_url: "",
      thumbnail_width: 0,
      thumbnail_height: 0,
      width: 0,
      height: 0,
      url: "",
      html: ""
    };

    return res.json(oEmbed);
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

export default router;
