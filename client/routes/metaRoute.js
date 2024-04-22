import express from 'express'
import { getMeta, checkBeforeAfter } from '../controllers/metaController.js'

const router = express.Router();

router.route("/").get(getMeta);
router.route("/ba").get(checkBeforeAfter);

export default router;