import curd_Model from "../model/curdModel.js";
import auth_model from "../model/authModel.js";
import mongoose from "mongoose";

// Function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// create
export const createController = async (req, res, next) => {
  try {
    // input validation
    if (!req.body.text) {
      throw new Error("details required");
    }

    // token validation
    if (!req.decodedToken.tokenId) {
      throw new Error("token required");
    }

    // save text data
    const curdData = await curd_Model.create({ text: req.body.text });

    // store curd id within user account
    const authUser = await auth_model.findOneAndUpdate(
      { username: req.decodedToken.tokenId },
      { $push: { curdObjId: curdData._id } },
      { new: true }
    );

    if (!authUser) {
      await curd_Model.findByIdAndDelete({ _id: curdData._id });
      throw new Error("user missing");
    }

    // final response
    return res.status(200).json({
      success: true,
      message: "data created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// update
export const updateController = async (req, res, next) => {
  try {
    // getting user data
    const { text } = req.body;
    const textId = req.params.id;

    // validation
    if (!text) {
      throw new Error("invalid user input");
    } else if (!textId) {
      throw new Error("missing parameter");
    } else if (!isValidObjectId(textId)) {
      throw new Error("invalid object id");
    }

    // update text
    const updatedText = await curd_Model.findByIdAndUpdate(
      { _id: textId },
      { text: text },
      { new: true }
    );

    // Check if text exists
    if (!updatedText) {
      throw new Error("text not found");
    }

    // final response
    return res.status(200).json({
      success: true,
      message: "Update successful.",
    });
  } catch (error) {
    next(error);
  }
};

// read
export const readController = async (req, res, next) => {
  try {
    // getting user data
    const username = req.decodedToken.tokenId;

    // Check if username is missing
    if (!username) {
      throw new Error("Auth token missing");
    }

    // find user and populate -> Schema.Types.ObjectId,
    const existingUserObj = await auth_model
      .findOne({ username: username })
      .select("username")
      .populate({
        path: "curdObjId",
        select: "text updated",
      });

    // auth db validation
    if (!existingUserObj) {
      throw new Error("user not exist");
    }

    // return and produce custom obj
    const textDateObj = existingUserObj.curdObjId.map((obj, index) => ({
      text: obj.text,
      updated: new Date(obj.updated).toLocaleString(),
      count: `${username} (${index + 1})`,
    }));

    // final response
    return res.status(200).json({
      success: true,
      data: {
        List: textDateObj,
      },
      message: "Reading successful.",
    });
  } catch (error) {
    next(error);
  }
};

// delete
export const deleteController = async (req, res, next) => {
  try {
    // getting browser url query
    const { id } = req.query;

    // getting token from token middleware
    const { tokenId } = req.decodedToken;

    // data validation
    if (!id || !isValidObjectId(id)) {
      throw new Error("invalid or missing objectId ");
    }

    // delete data
    const deletedData = await curd_Model.findOneAndDelete({ _id: id });

    // if data is not present
    if (!deletedData) {
      throw new Error("failed to delete data or data not present");
    }

    // Remove the specific curdObjId from user curdID list array
    const updatedUser = await auth_model.findOneAndUpdate(
      { username: tokenId },
      { $pull: { curdObjId: id } },
      { new: true }
    );

    // user validation
    if (!updatedUser) {
      throw new Error("user not found or failed to update");
    }

    // final response
    return res.status(200).json({
      success: true,
      message: "Deletion successful",
    });
  } catch (error) {
    next(error);
  }
};
