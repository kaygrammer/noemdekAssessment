// write user routes logic here

import express from "express";
import ScheduleController from "../controllers/scheduleController.js"
const router = express.Router()

const scheduleController = new ScheduleController();

router.post('/', scheduleController.createSchedule);
router.get("/", scheduleController.getAllSchedules);
router.get('/day/:day', scheduleController.getSchedulesForDay);
router.get('/week/:week', scheduleController.getSchedulesForWeek);
router.get('/month/:month', scheduleController.getSchedulesForMonth);
router.get("/vehicle/:vehicleName", scheduleController.getSchedulesByVehicleName);



export default router;
