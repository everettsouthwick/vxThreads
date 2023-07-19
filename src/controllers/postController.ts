import express from 'express';
import { getPostMetadata } from '../services/postService';
import { errorTemplate, successTemplate } from '../templates/templates';
import { sanitizeUri } from '../helpers/uri';

const router = express.Router();

router.get('/t/:shortcode', async (req, res) => {
    const url = sanitizeUri(req.path);

    try {
        const metadata = await getPostMetadata(url);
        const html = successTemplate(metadata);

        return res.status(200).send(html);
    }
    catch (error: any) {
        console.error(error);
        const html = errorTemplate(url);
        return res.status(200).send(html);
    }
});

router.get('/:username/post/:shortcode', async (req, res) => {
    const url = sanitizeUri(req.path);

    try {
        const metadata = await getPostMetadata(url);
        const html = successTemplate(metadata);

        return res.status(200).send(html);
    } catch (error: any) {
        console.error(error);
        const html = errorTemplate(url);
        return res.status(200).send(html);
    }
});

export default router;
