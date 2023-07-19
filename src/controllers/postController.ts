import express from 'express';
import { getPost } from '../services/postService';
import { errorTemplate, postTemplate } from '../templates/templates';
import { sanitizeUri } from '../helpers/uri';
import { buildPostMetadata } from '../services/metadataService';

const router = express.Router();

router.get('/t/:shortcode', async (req, res) => {
    const url = sanitizeUri(req.path);

    try {
        const post = await getPost(url);
        const metadata = buildPostMetadata(post, url);
        const html = postTemplate(metadata);

        return res.status(200).send(html);
    }
    catch (error: any) {
        console.error(error);
        const html = errorTemplate(error.statusCode, error.message, `${url}`);
        return res.status(200).send(html);
    }
});

router.get('/:username/post/:shortcode', async (req, res) => {
    const url = sanitizeUri(req.path);

    try {
        const post = await getPost(url);
        const metadata = buildPostMetadata(post, url);
        const html = postTemplate(metadata);

        return res.status(200).send(html);
    } catch (error: any) {
        console.error(error);
        const html = errorTemplate(error.statusCode, error.message, `${url}`);
        return res.status(200).send(html);
    }
});

export default router;
