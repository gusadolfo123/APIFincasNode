import express from "express";
import seasonController from "../controllers/season.controller";
const router = express.Router();

router.get('/', seasonController.getAll);
router.post('/', seasonController.createSeason);

export default router;