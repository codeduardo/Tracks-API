import mongoose from "mongoose";
export const createConnection = async () => {
  const BD_URI = process.env.BD_URI;
  try {
    await mongoose.connect(BD_URI);
    console.log("**** CONNECTION DONE*****");
  } catch (e) {
    console.log("**** ERROR CONNECTION ****");
  }
};
