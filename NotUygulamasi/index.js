const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/notesDB");

const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model("Note", NoteSchema);

app.get("/notes", async (req, res) => {
  res.json(await Note.find());
});

app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Silindi" });
});

app.listen(3002, () => console.log("Not uygulaması çalışıyor 🔥"));
