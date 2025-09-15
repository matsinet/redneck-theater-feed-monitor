import mongoose from "mongoose";

const filterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    filter: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Filter = mongoose.model("Filter", filterSchema);

export default Filter;
