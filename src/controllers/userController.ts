import express from 'express';
import { errorTemplate, postTemplate } from '../templates/templates';
import { sanitizeUri } from '../helpers/uri';
import { getUserMetadata } from '../services/userService';

const router = express.Router();

router.get('/@:username', async (req, res) => {
    const url = sanitizeUri(req.path);

    try {
        const metadata = await getUserMetadata(url);
        const html = postTemplate(metadata);

        return res.status(200).send(html);
    }
    catch (error: any) {
        console.error(error);
        const html = errorTemplate(error.statusCode, error.message, `${url}`);
        return res.status(200).send(html);
    }
});

export default router;
