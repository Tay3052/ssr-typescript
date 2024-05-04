import express from "express";
import React from "react"; //Expressフレームワークを使用できるようにする

import { renderToString } from "react-dom/server"; //追加
import Intro from "../pages/Myself";
import Header from "../components/Header";

const app = express(); //Expressアプリケーションを作成
const port = 9000; //使用するポート番号
const path = require("path");

app.use(express.static(path.join(__dirname, "build/static")));

app.get("/", (req, res) => {
  const appContent = renderToString(<Intro />);
  const header = renderToString(<Header />);
  res.send(
    `
      <!DOCTYPE html>
      <html>
        <head>
          <title>自己紹介</title>
          <script type="text/babel" src="/bundle.js"></script>
        </head>
        <body>
          <div id="root">${header}${appContent}</div>
        </body>
      </html>
    `
  );
});

app.get("/bundle.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "bundle.js"));
});

app.listen(port, () => {
  //サーバを起動
  console.log(`Server is running on port ${port}`);
});
