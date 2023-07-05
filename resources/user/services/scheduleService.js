import Schedule from "../models/schedule.model.js";
import { NoSchedulesFoundError } from "../../../utils/errors/error-handler.js";

class ScheduleService {
  static async createSchedule(scheduleData) {
    const schedule = new Schedule(scheduleData);
    return schedule.save();
  }

  static async getAllSchedules() {
    return Schedule.find();
  }

  static async getSchedulesByVehicleName(vehicleName) {
    const schedules = await Schedule.find({ vehicleName });
    
    if (!schedules || schedules.length === 0) {
      throw new NoSchedulesFoundError("No schedules found for the specified vehicle name.");
    }
    
    return schedules;
  }

  static async getSchedulesForDay(day) {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    const schedules = await Schedule.find({
        startDate: { $gte: startOfDay, $lte: endOfDay },
      });
  
      return schedules;
  }

  static async getSchedulesForWeek(week) {
    const startOfWeek = new Date(week);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const schedules = await Schedule.find({
        startDate: { $gte: startOfWeek, $lte: endOfWeek },
      });
      return schedules;
  }

  static async getSchedulesForMonth(month) {
    const startOfMonth = new Date(month);
    startOfMonth.setHours(0, 0, 0, 0);
    startOfMonth.setDate(1);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const schedules = await Schedule.find({
        startDate: { $gte: startOfMonth, $lte: endOfMonth },
      });
  
      return schedules;
  }
}

export default ScheduleService;
