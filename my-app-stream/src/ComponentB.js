import { useState } from "react";
import { useStore } from "./store";

const ComponentB = () => {
  const { data, loadScript } = useStore("suspenseDataB");
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((pre) => pre + 1)}>{count}</button>
      suspenseData: {data}
      {loadScript}
    </div>
  );
};

export default ComponentB;
