import { useStore } from "./store";

const ComponentA = () => {
  const { data, loadScript } = useStore("suspenseData");

  return (
    <div>
      suspenseData: {data}
      {loadScript}
    </div>
  );
};

export default ComponentA;
