import QuotationService from "../services/quotationService.js";
import { createQuotationSchema, validateMongoDbId } from "../../../utils/validation/validation.js";
import { NoQuotationsFoundError } from "../../../utils/errors/error-handler.js";

class QuotationController {
  async createQuotation(req, res) {
    try {
      const { error } = createQuotationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const quotationData = req.body;
      const quotation = await QuotationService.createQuotation(quotationData);
      return res
        .status(201)
        .json({
          status: true,
          message: "Quotation created successfully",
          quotation,
        });
    } catch (error) {
      if (
        error.message === "Quotation with the same RFQ number already exists."
      ) {
        return res.status(409).json({status:"false", error: error.message });
      }else{
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async getQuotations(req, res) {
    try {
      const quotations = await QuotationService.getQuotations();
      if (quotations.length === 0) {
        throw new NoQuotationsFoundError();
      }
      return res.status(200).json({ status: true, quotations });
    } catch (error) {
      if (error instanceof NoQuotationsFoundError) {
        return res.status(404).json({ status: false, message: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getQuotationById(req, res) {
    try {
      const { id } = req.params;
      validateMongoDbId(id)
      const quotation = await QuotationService.getQuotationById(id);
      if (!quotation) {
        throw new NoQuotationsFoundError("Quotation not found");
      }
      return res.status(200).json({ status: true, quotation });
    } catch (error) {
      if (error instanceof NoQuotationsFoundError) {
        return res.status(404).json({ status: false, message: error.message });
      }
      if(error.message === "this id is not valid or not found"){
        return res.status(404).json({ status: false, message: error.message }); 
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getQuotationByRfqNumber(req, res) {
    try {
      const { rfqNumber } = req.params;
      const quotation = await QuotationService.getQuotationByRfq(
        rfqNumber
      );
      if (!quotation) {
        throw new NoQuotationsFoundError("Quotation not found");
      }
      return res.status(200).json({ status: true, quotation });
    } catch (error) {
      if (error instanceof NoQuotationsFoundError) {
        return res.status(404).json({ status: false, message: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateQuotationByRef(req, res) {
    try {
      const { rfqNumber } = req.params;
      const quotationData = req.body;
      // Exclude rfqNumber from quotationData
      const { rfqNumber: excludedRfqNumber, ...updateData } = quotationData;
      const quotation = await QuotationService.updateQuotationByRfqNumber(
        rfqNumber,
        updateData
      );
      if (!quotation) {
        return res
          .status(404)
          .json({ status: false, message: "Quotation not found" });
      }
      return res.status(200).json({
        status: true,
        message: "Quotation updated successfully",
        quotation,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateQuotation(req, res) {
    try {
      const { id } = req.params;
      const quotationData = req.body;
      validateMongoDbId(id)
      // Exclude rfqNumber from quotationData
      const { rfqNumber: excludedRfqNumber, ...updateData } = quotationData;
      const quotation = await QuotationService.updateQuotation(id, updateData);
      return res.status(200).json({
        status: true,
        message: "Quotation updated successfully",
        quotation,
      });
    } catch (error) {
      if(error.message === "this id is not valid or not found"){
        return res.status(404).json({ status: false, message: error.message }); 
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteQuotation(req, res) {
    try {
      const { id } = req.params;
      validateMongoDbId(id)
      await QuotationService.deleteQuotation(id);
      return res
        .status(200)
        .json({ status: true, message: "Quotation deleted successfully" });
    } catch (error) {
      if(error.message === "this id is not valid or not found"){
        return res.status(404).json({ status: false, message: error.message }); 
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default QuotationController;
