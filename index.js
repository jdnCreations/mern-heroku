const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jdn:mdnlibrary@cluster0.m45e2.mongodb.net/tester?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const MSGModel = require("./models/msg");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/post", async function (req, res) {
  const { text } = req.body;

  const newMSG = new MSGModel({
    text: text.toString(),
  });

  await newMSG.save();
});

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(process.env.PORT || 5000);
module.exports = app;
