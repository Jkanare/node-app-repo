const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Define the port
app.listen(8082, () => {
  console.log(`Server started on port: 8082`);
});

async function mongoDBConnection() {
    try {
        await mongoose.connect("mongodb://localhost:27017/adhar_database");
        console.log("Connection is successful"); 
    } catch (error) {
        console.log(error);
    } 
  }
  mongoDBConnection();

  // Defining Schema
const adharSchema = new mongoose.Schema({
    adharNo: { type: Number },
    fullName: {type: String },
    isMarried: { type: Boolean },
    city: { type: String },
    pin: { type: Number},
    country: {type: String}
  },
  { collection: "adhar_collection" }
  );
  // Create the Model - adhar
  const Adhar = mongoose.model("Adhar", adharSchema);
  
  app.get('/allAdhar', async (request, response) => { 
    console.log("Fetching adhar from mongodb... ");
    console.log(`Request path: ${request.url}`);
    // Fetch all adhar using find({})
    const adharList = await Adhar.find({});
    return response.status(200).json(adharList);
  });