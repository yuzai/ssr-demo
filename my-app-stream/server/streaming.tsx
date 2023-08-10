import express from "express";
import { Writable } from "node:stream";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import { RecoilRoot } from "recoil";
import { Provider, createStore } from "../src/store";
import { countState } from "../src/atoms";
import App from "../src/App";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const indexFile = path.resolve("./build/index.html");
  const count = await Promise.resolve(1);
  const store = createStore({ count: 50 });

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Failed to load the app.");
    }

    const frontHTML = data.replace("</div></body></html>", "").replace('<script defer="defer"', '<script async');
    const backHTML = "</div></body></html>";

    const stream = new Writable({
      write(chunk, _encoding, cb) {
        res.write(chunk, cb);
      },
      final() {
        res.end(backHTML);
      },
    });

    let didError = false;
    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      <RecoilRoot initializeState={(m) => m.set(countState, count)}>
        <Provider value={store}>
          <App />
        </Provider>
      </RecoilRoot>,
      {
        // This script will either trigger hydration or mark hydration to be triggered after the client entry gets loaded.
        bootstrapScriptContent: `console.log('boot', window.BOOT);window.BOOT ? BOOT() : (window.LOADED = true);window.data=${
          JSON.stringify({ count })
        };window.zustanddata=${JSON.stringify({ count: 50 })}`,
        // Executed when the shell (Non-Suspense parts of the React app) is ready
        onShellReady() {
          console.log("shell ready");
          res.statusCode = didError ? 500 : 200;
          // Set headers for streaming
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          // Write front HTML
          res.write(frontHTML);
          // Pipe React app render result
          pipe(stream);
        },
        // Executed when everything is complete
        onAllReady() {
          console.log("all ready");
        },
        // Executed when the shell render resulted in error
        onError(x) {
          didError = true;
          console.error(x);
        },
      }
    );
  });
});

app.use("/", express.static("build"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
