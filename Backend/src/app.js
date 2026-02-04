// server creation
const express = require("express");
const cors = require("cors");
const path = require("path");

const noteModel = require("./model/notes.model");
const app = express();

// parse JSON bodies (as sent by API clients like Postman / frontend)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("./public"));

// POST
app.post("https://notes-4-5t5k.onrender.com/api/notes", async (req, res) => {
  // guard against missing body
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created Successfully.",
    note,
  });
});

// GET
app.get("https://notes-4-5t5k.onrender.com/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched Successfully",
    notes,
  });
});

// DELETE
app.delete(
  "https://notes-4-5t5k.onrender.com/api/notes/:id",
  async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note Deleted Successfully.",
    });
  },
);

// PATCH
app.patch(
  "https://notes-4-5t5k.onrender.com/api/notes/:id",
  async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description });

    res.status(200).json({
      message: "Note updated successfully",
    });
  },
);

// WILD CARD - middleware
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
