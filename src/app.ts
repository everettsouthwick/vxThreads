import express from 'express';
import threadRoutes from './routes/threadRoutes';

const app = express();
app.use('/', threadRoutes);

const port = process.env.PORT || 9731;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
