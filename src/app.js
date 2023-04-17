import 'dotenv/config';
import express from 'express';
import routers from './api/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routers);

app.listen(process.env.PORT || 3000, () => {
    console.log(`[Info]: Server start listening at port ${process.env.PORT || 3000}`);
}); 