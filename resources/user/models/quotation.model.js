import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    rfqNumber: {
      type: String,
      required: true,
    },
    general: {
      markupByLineItem: {
        type: Number,
      },
      markupByPercentage: {
        type: Number,
      },
      withholdingTax: {
        type: Number,
      },
      monthlyCostOfCapitalClient: {
        type: Number,
      },
      monthlyCostOfCapitalNoemdek: {
        type: Number,
      },
      OEMDiscount: {
        type: Number,
      },
      paymentTimingAfterInvoice: {
        type: String,
      },
    },
    dutiesAndFees: {
      surcharge: {
        type: Number,
      },
      ciss: {
        type: Number,
      },
      vat: {
        type: Number,
      },
      TLS: {
        type: Number,
      },
      localClearing: {
        type: Number,
      },
    },
    freight: {
      insurance: {
        type: Number,
      },
      totalWeight: {
        type: Number,
      },
      totalFreightCost: {
        type: Number,
      },
      weightApproach: {
        type: String,
      },
      deliveryLeadTime: {
        type: String,
      },
    },
    bidDetails: {
      productName: {
        type: String,
      },
      partNo: {
        type: String,
      },
      longTextDescription: {
        type: String,
      },
      mfgName: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      priceUSD: {
        type: Number,
      },
      freightPortion: {
        type: Number,
      },
      freightPercentage: {
        type: Number,
      },
      unitPriceFreight: {
        type: Number,
      },
      unitPriceCIFFreightInsuranceOEM: {
        type: Number,
      },
      unitPriceDutiesLandedInNigeria: {
        type: Number,
      },
      totalUnitPriceQPlusR: {
        type: Number,
      },
      staffUplift: {
        type: Number,
      },
      totalUplift: {
        type: Number,
      },
    },
    total: {
      type: Number,
    },
    comments: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;