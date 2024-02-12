import { Schema, model } from "mongoose";

// define data format and rules
const obj = {
  username: {
    type: String, // username data type is string
    required: [true, "username required"],
    trim: true, // trim white space
    unique: true, // no duplicate username
    minlength: [5, "minimum 5 charecter required"],
  },

  password: {
    type: String,
    trim: true,
    required: [true, "password required"],
  },
  // storing arrays of object $push for next obj
  // deleting using $pull : specific obj
  curdObjId: [
    {
      type: Schema.Types.ObjectId,
      // this schema store another schema objid
      ref: "curdDB", // from this model
    },
  ],
};
// define model Schema -> obj arg
const model_Schema = Schema(obj, { timestamps: true });

// indexing
model_Schema.index({ username: 1 }); // obj argument

// define model -> name schema
const model_Name = "authDB";
const auth_model = model(model_Name, model_Schema);

// export model
export default auth_model;
