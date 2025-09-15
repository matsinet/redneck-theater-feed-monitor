#!/usr/bin/env node

import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// "Import" the Express module instead of http
import express from "express";
import feeds from "./controllers/v1/feeds.js"

// Initialize the Express application
const app = express();

dotenv.config();

mongoose.connect( process.env.DB_CONNECTION );
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const PORT = process.env.PORT || 3000;

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`);
  next();
};

app.use(cors());
app.use(express.json());
app.use(logging);
// Serve the public folder at the root route
app.use(express.static('public'))

// Handle the request with HTTP GET method from http://localhost:3000/status
app.get("/api/status", (request, response) => {
   // Create the headers for response by default 200
   // Create the response body
   // End and return the response
  response.json({ message: "Service healthy" });
});

app.use("/api/v1/feeds", feeds);

// Tell the Express app to start listening
// Let the humans know I am running and listening on 3000
const server = app.listen(PORT, () => console.log(`Listening on port ${server.address().port}`));
