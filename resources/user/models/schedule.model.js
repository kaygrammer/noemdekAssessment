import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    vehicleCondition: {
      type: String,
    },
    driver: {
      type: String,
    },
    customer: {
      type: String,
    },
    company: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    pickupLocation: {
      type: String,
    },
    dropOffLocation: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    editedBy: {
      type: String,
    },
    note: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
