import express from 'express'
import { getVerse } from '../controllers/dataController.js'

const router = express.Router();
router.route("/").get(getVerse);

export default router;