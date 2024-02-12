import { connect } from "mongoose";

const dbConnection = () => {
  // its a promise chaining by default (async + try catch)
  connect(`${process.env.MONGO_URI}/DB1`)
    .then(() => {
      console.log("database connected");
    })
    .catch((er) => {
      console.error(er);
    });
};

export default dbConnection;