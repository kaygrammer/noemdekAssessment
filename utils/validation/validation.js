import Joi from "joi";
import mongoose from "mongoose";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {}; // create an empty object the request value doesn't exist yet
    }
    req.value["body"] = req.body;
    next();
  };
};

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("this id is not valid or not found");
};

const createScheduleSchema = Joi.object({
  vehicleName: Joi.string().required(),
  vehicleType: Joi.string().required(),
  vehicleCondition: Joi.string().required(),
  driver: Joi.string().required(),
  customer: Joi.string().required(),
  company: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  pickupLocation: Joi.string().required(),
  dropOffLocation: Joi.string().required(),
  createdBy: Joi.string(),
  editedBy: Joi.string(),
  note: Joi.string(),
});

const createQuotationSchema = Joi.object({
  rfqNumber: Joi.string().required(),
  general: Joi.object({
    markupByLineItem: Joi.number(),
    markupByPercentage: Joi.number(),
    withholdingTax: Joi.number(),
    monthlyCostOfCapitalClient: Joi.number(),
    monthlyCostOfCapitalNoemdek: Joi.number(),
    OEMDiscount: Joi.number().required(),
    paymentTimingAfterInvoice: Joi.string(),
  }),
  dutiesAndFees: Joi.object({
    surcharge: Joi.number(),
    ciss: Joi.number(),
    vat: Joi.number(),
    TLS: Joi.number(),
    localClearing: Joi.number(),
  }),
  freight: Joi.object({
    insurance: Joi.number(),
    totalWeight: Joi.number(),
    totalFreightCost: Joi.number(),
    weightApproach: Joi.string(),
    deliveryLeadTime: Joi.string(),
  }),
  bidDetails: Joi.object({
    productName: Joi.string(),
    partNo: Joi.string(),
    longTextDescription: Joi.string(),
    mfgName: Joi.string(),
    quantity: Joi.number(),
    weight: Joi.number(),
    priceUSD: Joi.number(),
    freightPortion: Joi.number(),
    freightPercentage: Joi.number(),
    unitPriceFreight: Joi.number(),
    unitPriceCIFFreightInsuranceOEM: Joi.number(),
    unitPriceDutiesLandedInNigeria: Joi.number(),
    totalUnitPriceQPlusR: Joi.number(),
    staffUplift: Joi.number(),
    totalUplift: Joi.number(),
  }),
  total: Joi.number(),
  comments: Joi.string()
}).options({ presence: "required" });

export { validateRequest,validateMongoDbId, createScheduleSchema, createQuotationSchema};
