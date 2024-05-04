import express from "express";
import React from "react";
import fs from "fs";

import { renderToString } from "react-dom/server"; //追加
import Myself from "../pages/Myself";
import Header from "../components/Header";
import "../assets/css/Header.css";
import "../assets/css/Pages.css";

const app = express();
const port = 9000;
const path = require("path");

// これないとcssとか静的画像とか読み込めない
// CSSファイルのディレクトリを指定してexpress.staticを設定
app.use("/css", express.static(path.join(__dirname, "../assets/css")));
// build/staticディレクトリを指定してexpress.staticを設定
app.use("/static", express.static(path.join(__dirname, "../build/static")));

app.get("/", (req, res) => {
  const myself = renderToString(<Myself />);
  const header = renderToString(<Header />);
  const index = path.resolve(__dirname, "index.html");

  fs.readFile(index, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${header}${myself}</div>`
      )
    );
  });
});

app.get("/bundle.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "bundle.js"));
});

app.listen(port, () => {
  //サーバを起動
  console.log(`Server is running on port ${port}`);
});
