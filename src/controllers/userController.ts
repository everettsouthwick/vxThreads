import express from 'express';
import { errorTemplate, successTemplate } from '../templates/templates';
import { sanitizeUri } from '../helpers/uri';
import { getUserMetadata } from '../services/userService';

const router = express.Router();

router.get('/@:username', async (req, res) => {
    const url = sanitizeUri(req.path);

    try {
        const metadata = await getUserMetadata(url);
        const html = successTemplate(metadata);

        return res.status(200).send(html);
    }
    catch (error: any) {
        console.error(error);
        const html = errorTemplate(url);
        return res.status(200).send(html);
    }
});

export default router;
