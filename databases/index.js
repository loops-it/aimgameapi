const mongoose = require("mongoose");
const { database } = require("../config");

module.exports.connect = async () => {
  try {
    const data = await mongoose.connect(
      `mongodb+srv://${database.user}:${database.password}@${database.host}/${database.database}?retryWrites=true&w=majority`
    );
    console.log(`-----Connected to ${database.database} successfully-----`);
  } catch (error) {
    console.log("db connection error ", { error });
  }

  // try {
  //   const data = await mongoose.connect(
  //      `mongodb+srv://yohan:123admin@cluster0.o4rpy.mongodb.net/aimgame-stging?retryWrites=true&w=majority`
  //     // `mongodb://localhost:27017/admin`
  //   );
  //   console.log(`-----Connected to aimgame-stging successfully-----`);
  // } catch (error) {
  //   console.log("db connection error ", { error });
  // }
};
