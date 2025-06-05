const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js"); // adjust the path if needed
const initData = require("./data.js");     // adjust if the file lives elsewhere
require('dotenv').config();

main()
  .then(() => {
    console.log("MongoDB connection successful");
    return initDB();
  })
  .catch((err) => console.error(" MongoDB connection failed", err));

async function main() {
await mongoose.connect(process.env.ATLASDB_URL);

}



const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({}); // Optional: clears users

  // Step 1: Create a user
  const user = new User({
    username: "sandhya.__251",
    email: "sandhya.sisodiya.5811@gmail.com"
  });
  await user.save();

  // Step 2: Inject user._id as the owner in each listing
  const listingsWithOwner = initData.data.map(listing => ({
    ...listing,
    owner: user._id
  }));

  // Step 3: Insert listings
  const inserted = await Listing.insertMany(listingsWithOwner);
  console.log("✅ Data was initialised");
  console.log(`📦 ${inserted.length} listings were inserted`);
};




// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: '6801ef3f4ab9e42cc4b52623'
//   }));

//   const inserted = await Listing.insertMany(initData.data); 
//   console.log(" Data was initialised");
//   console.log(` ${inserted.length} listings were inserted`);
// };







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
