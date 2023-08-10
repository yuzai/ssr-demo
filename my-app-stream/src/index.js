import { hydrateRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { Provider, createStore } from "./store";
import { countState } from "./atoms";
import App from "./App";

const store = createStore(window.zustanddata);

window.BOOT = function () {
  const root = document.getElementById("root");
  if (root) {
    hydrateRoot(
      root,
      <RecoilRoot
        initializeState={(m) =>
          window.data && m.set(countState, window.data?.count)
        }
      >
        <Provider value={store}>
          <App />
        </Provider>
      </RecoilRoot>
    );
  }
};

if (window.LOADED) window.BOOT();
