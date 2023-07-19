import express, { NextFunction, Request, Response } from 'express';
import routes from './controllers';
import { ConfigManager } from './managers/configManager';

const app = express();
const port = ConfigManager.getInstance().getPort();

// Middlewares
app.use(express.json());
app.use(routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));

export default app;
