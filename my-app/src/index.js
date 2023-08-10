import ReactDOM from "react-dom/client";
import { flushSync } from "react-dom";
import { RecoilRoot } from "recoil";
import { Provider, createStore } from "./store";
import { countState } from "./atoms";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(window.zustanddata);

flushSync(() => {
  root.render(
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
});
