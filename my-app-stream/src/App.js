import { Suspense } from "react";
import { useRecoilState } from "recoil";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import { countState } from "./atoms";
import { useStore } from "./store";

function App() {
  const [count, setCount] = useRecoilState(countState);

  const [bears, addBears] = useStore((state) => [state.count, state.addCount]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={() => setCount((pre) => pre + 1)}>
            recoilCount: {count}
          </button>
        </div>
        <div>
          <button onClick={addBears}>zustand store count: {bears}</button>
        </div>
        <Suspense fallback={<div>loadingB</div>}>
          <ComponentB />
        </Suspense>
        <Suspense fallback={<div>loadingA</div>}>
          <ComponentA />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
