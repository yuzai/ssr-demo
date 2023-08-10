import { useStore } from "./store";

const ComponentA = () => {
  const { data } = useStore("suspenseData");

  return <div>suspenseData: {data}</div>;
};

export default ComponentA;
