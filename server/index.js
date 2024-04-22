import express from 'express'
import dataRoute from './routes/dataRoute.js'
import metaRoute from './routes/metaRoute.js'
import dotenv from 'dotenv'

dotenv.config();
const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use("/api/data", dataRoute);
app.use("/api/meta", metaRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});