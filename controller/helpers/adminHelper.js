import userModel from "../../models/userModel.js";
import adminModel from "../../models/adminModel.js";
import { generateToken } from "../../utils/generateJWT.js";

export const adminLogging = ({ email, password }) => {
  try {
    let response = {};
    return new Promise((resolve, reject) => {
      adminModel.findOne({ email: email }).then((result) => {
        if (result) {
          if (result.email === email && result.password === password) {
            response.status = true;
            const token = generateToken({ email: email, type: "admin" });
            response.token = token;
            resolve(response);
          } else {
            response.status = false;
            resolve(response);
          }
        } else {
          response.status = false;
          resolve(response);
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export const userDetails = () => {
  try {
    return new Promise(async (resolve, reject) => {
      let users = await userModel.find();
      users ? resolve(users) : reject({ message: "cannot get data" });
    });
  } catch (err) {
    console.error(err);
  }
};

export const blockingUser = (userId) => {
  try {
    return new Promise((resolve, reject) => {
      let response = {};
      userModel
        .findOneAndUpdate({ _id: userId }, { $set: { block: true } })
        .then((result) => {
          response.status = true;
          resolve(response);
        });
    });
  } catch (err) {
    console.error(err);
  }
};

export const unBlockingUser = (userId) => {
  try {
    let response = {};
    return new Promise((resolve, reject) => {
      userModel
        .findOneAndUpdate({ _id: userId }, { $set: { block: false } })
        .then(() => {
          response.status = true;
          resolve(response);
        });
    });
  } catch (err) {
    console.error(err);
  }
};
