import Quotation from "../models/quotation.model.js";
import { NoQuotationsFoundError } from "../../../utils/errors/error-handler.js";

class QuotationService {
  static async createQuotation(quotationData) {
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
      const quotation = await Quotation.findOneAndUpdate({ rfqNumber }, quotationData, { new: true });
      return quotation;
    } catch (error) {
      throw error;
    }
  }

  static async getQuotationById(id) {
    const quotation = await Quotation.findById(id);
    return quotation;
  }

  static async getQuotationById(rfqNumber) {
    const quotation = await Quotation.findOne({rfqNumber});
    return quotation;
  }


  static async updateQuotation(id, quotationData) {
    const quotation = await Quotation.findByIdAndUpdate(id, quotationData, { new: true });
    return quotation;
  }

  static async deleteQuotation(id) {
    await Quotation.findByIdAndRemove(id);
  }
}

export default QuotationService;
