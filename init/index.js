const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const user = await User.findOne();

  if (!user) {
    console.log("❌ No user found. Please register a user first.");
    return;
  }

  const listingsWithOwner = initData.data.map(obj => ({
    ...obj,
    owner: user._id
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("✅ Data was initialized with owner");
};

initDB();
