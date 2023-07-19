import express from 'express';
import { errorTemplate, postTemplate } from '../templates/templates';
import { sanitizeUri } from '../helpers/uri';
import { getUser } from '../services/userService';
import { buildUserMetadata } from '../services/metadataService';

const router = express.Router();

router.get('/@:username', async (req, res) => {
    let url = sanitizeUri(req.path);

    try {
        const user = await getUser(url);
        const metadata = buildUserMetadata(user, url);
        const html = postTemplate(metadata);

        return res.status(200).send(html);
    }
    catch (error: any) {
        console.error(error);
        const html = errorTemplate(error.status, error.statusText, `${url}`);
        return res.status(200).send(html);
    }
});

export default router;
