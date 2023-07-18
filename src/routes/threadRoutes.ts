import express from 'express';
import { getPost, generateMetadata } from '../services/postService';
import { errorTemplate, postTemplate } from '../templates/templates';

const router = express.Router();

router.get('*', async (req, res) => {
    const threadsPath = req.path;

    try {
        const post = await getPost(threadsPath);

        const metadata = generateMetadata(post, threadsPath);
        const html = postTemplate(
            metadata.username,
            metadata.metadata,
            metadata.description
        );

        return res.status(200).send(html);
    } catch (error: any) {
        console.error(error);
        const html = errorTemplate(error.status, error.statusText);
        return res.status(200).send(html);
    }
});

export default router;
