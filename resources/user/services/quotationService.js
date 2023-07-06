import Quotation from "../models/quotation.model.js";
import { NoQuotationsFoundError } from "../../../utils/errors/error-handler.js";

class QuotationService {
  static async createQuotation(quotationData) {
    const { rfqNumber } = quotationData;
    const existingQuotation = await Quotation.findOne({ rfqNumber });

    if (existingQuotation) {
      throw new Error("Quotation with the same RFQ number already exists.");
    }
    const quotation = new Quotation(quotationData);
    return quotation.save();
  }

  static async getQuotations() {
    const quotations = await Quotation.find();
    return quotations;
  }

  static async updateQuotationByRfqNumber(rfqNumber, quotationData) {
    try {
      const existingQuotation = await Quotation.findOne({ rfqNumber });
      if (!existingQuotation) {
        throw new Error("Quotation not found");
      }
      // Exclude rfqNumber from quotationData
      const { rfqNumber: excludedRfqNumber, ...updateData } = quotationData;

      const quotation = await Quotation.findOneAndUpdate(
        { rfqNumber },
        updateData,
        { new: true }
      );
      return quotation;
    } catch (error) {
      throw error;
    }
  }

  static async getQuotationById(id) {
    const quotation = await Quotation.findById(id);
    return quotation;
  }

  static async getQuotationByRfq(rfqNumber) {
    const quotation = await Quotation.findOne({ rfqNumber });
    return quotation;
  }

  static async updateQuotation(id, quotationData) {
    try {
      const quotation = await Quotation.findByIdAndUpdate(
        id,
        { $set: quotationData },
        { new: true }
      );
      return quotation;
    } catch (error) {
      throw error;
    }
  }

  static async deleteQuotation(id) {
    await Quotation.findByIdAndRemove(id);
  }
}

export default QuotationService;
