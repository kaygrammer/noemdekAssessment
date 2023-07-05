import ScheduleService from "../services/scheduleService.js";
import { createScheduleSchema } from "../../../utils/validation/validation.js";
import { NoSchedulesFoundError } from "../../../utils/errors/error-handler.js";

class ScheduleController {
  async createSchedule(req, res) {
    try {
      const { error } = createScheduleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const scheduleData = req.body;
      const schedule = await ScheduleService.createSchedule(scheduleData);
      return res
        .status(201)
        .json({status: true, message: "schedule created successfully", schedule });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllSchedules(req, res) {
    try {
      const schedules = await ScheduleService.getAllSchedules();

      if (schedules.length === 0) {
        throw new NoSchedulesFoundError("No schedules found.");
      }

      return res.status(200).json({status:true, message:"all schedule retrieved successfully", schedules });
    } catch (error) {
      if (error instanceof NoSchedulesFoundError) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }

  }

  // Get schedules for a specific day
  async getSchedulesForDay(req, res) {
    try {
      const { day } = req.params;
      const schedules = await ScheduleService.getSchedulesForDay(day);

      if (schedules.length === 0) {
        throw new NoSchedulesFoundError(
          "No schedules found for the specified day."
        );
      }

      return res.status(200).json({status:true, message:`all schedule for ${day} retrieved successfully`, schedules });
    } catch (error) {
      if (error instanceof NoSchedulesFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSchedulesForWeek(req, res) {
    try {
      const { week } = req.params;
      const schedules = await ScheduleService.getSchedulesForWeek(week);

      if (schedules.length === 0) {
        throw new NoSchedulesFoundError(
          "No schedules found for the specified week."
        );
      }

      return res.status(200).json({status:true, message:`all schedule for ${week} retrieved successfully`, schedules });
    } catch (error) {
      if (error instanceof NoSchedulesFoundError) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSchedulesForMonth(req, res) {
    try {
      const { month } = req.params;
      const schedules = await ScheduleService.getSchedulesForMonth(month);

      if (schedules.length === 0) {
        throw new NoSchedulesFoundError(
          "No schedules found for the specified month."
        );
      }

      return res.status(200).json({status:true, message:`all schedule for ${month} retrieved successfully`, schedules });
    } catch (error) {
      if (error instanceof NoSchedulesFoundError) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSchedulesByVehicleName(req, res) {
    try {
      const { vehicleName } = req.params;
      const schedules = await ScheduleService.getSchedulesByVehicleName(vehicleName);

      return res.status(200).json({ schedules });
    } catch (error) {
      if (error instanceof NoSchedulesFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ScheduleController;
