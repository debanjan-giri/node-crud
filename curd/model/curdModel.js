import { Schema, model } from "mongoose";

// data obj
const obj = {
  text: {
    type: String,
    trim: true,
    lowercase: true,
  },

  updated: {
    type: Date,
    default: Date.now,
  },
};

// define schema
const model_schema = new Schema(obj);

// define model
const model_name = "curdDB";
const curd_Model = model(model_name, model_schema);

// export model
export default curd_Model;
