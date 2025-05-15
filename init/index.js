const mongoose = require("mongoose");
const Listing = require("../models/listing.js"); // adjust the path if needed
const initData = require("./data.js");     // adjust if the file lives elsewhere

main()
  .then(() => {
    console.log("MongoDB connection successful");
    return initDB();
  })
  .catch((err) => console.error(" MongoDB connection failed", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1/wanderlust");
}


 const  initDB = async () => {
  await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6801ef3f4ab9e42cc4b52623'}));
    await Listing.insertMany(initData.data);
    console.log("data was intiallised");
 }
//  initDB();








// async function Database() {
//   try {
//     // await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log(" Sample listings inserted into the database");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("❌ Error inserting listings", err);
//   }
// }
