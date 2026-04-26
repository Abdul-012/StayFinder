const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const { geocodeLocation } = require("../utils/geocoding.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  let seedOwner = await User.findOne();
  if (!seedOwner) {
    const demoUser = new User({
      username: "seedowner",
      email: "seedowner@example.com",
    });
    seedOwner = await User.register(demoUser, "seedowner123");
  }

  const listingsWithOwner = await Promise.all(
    initData.data.map(async (obj) => ({
      ...obj,
      owner: seedOwner._id,
      geometry: await geocodeLocation(obj.location, obj.country),
    }))
  );

  await Listing.insertMany(listingsWithOwner);
  console.log("data was initialized");
};

initDB();
