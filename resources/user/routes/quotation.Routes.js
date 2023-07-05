import express from "express";
import QuotationController from "../controllers/quotationController.js";

const router = express.Router();
const quotationController = new QuotationController();

// Create a new quotation
router.post("/", quotationController.createQuotation);

// Get all quotations
router.get("/", quotationController.getQuotations);

// Get a quotation by ID
router.get("/:id", quotationController.getQuotationById);

router.get("/:rfqNumber", quotationController.getQuotationByRfqNumber);

// Update a quotation
router.put("/update/:id", quotationController.updateQuotation);

// Update a quotation
router.put("/quote/update/:rfqNumber", quotationController.updateQuotationByRef);

// Delete a quotation
router.delete("/delete/:id", quotationController.deleteQuotation);



export default router;