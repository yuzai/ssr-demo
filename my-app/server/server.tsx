import express from "express";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import { RecoilRoot } from "recoil";
import { Provider, createStore } from '../src/store';
import { countState } from "../src/atoms";
import App from "../src/App";
const app = express();
const port = 3000;

app.get("/", async (req, res, next) => {
  try {
    const count = await Promise.resolve(1);
    const store = createStore({ count: 50 });
    const appContent = ReactDOMServer.renderToString(
      <RecoilRoot initializeState={(m) => m.set(countState, count)}>
        <Provider value={store}>
          <App />
        </Provider>
      </RecoilRoot>
    );
    const indexFile = path.resolve("./build/index.html");

    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err) {
        console.error("Something went wrong:", err);
        return res.status(500).send("Failed to load the app.");
      }

      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${appContent}</div><script>window.data=${
            JSON.stringify({ count })
          };window.zustanddata=${JSON.stringify({ count: 50 })}</script>`
        )
      );
    });
  } catch (e) {
    console.error(e);
    next();
  }
});

app.use("/", express.static("build"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
