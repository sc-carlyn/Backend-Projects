const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/urlDB");

const UrlSchema = new mongoose.Schema({
  full: String,
  short: String
});

const Url = mongoose.model("Url", UrlSchema);

app.post("/shorten", async (req, res) => {
  const short = shortid.generate();
  const url = new Url({ full: req.body.full, short });
  await url.save();
  res.json({ short });
});

app.get("/:short", async (req, res) => {
  const url = await Url.findOne({ short: req.params.short });
  if (url) res.redirect(url.full);
  else res.status(404).json({ message: "Bulunamadı" });
});

app.listen(3003, () => console.log("URL kısaltma servisi çalışıyor 🔥"));
