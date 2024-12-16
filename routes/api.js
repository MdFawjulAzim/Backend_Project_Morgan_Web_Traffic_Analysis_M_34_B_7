import express from 'express';
const router = express.Router();
import * as TrafficController from "../app/controllers/TrafficController.js";

router.get("/view-traffic",TrafficController.viewTraffic);

export default router;