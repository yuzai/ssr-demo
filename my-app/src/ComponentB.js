import { useStore } from "./store";

const ComponentB = () => {
  const { data } = useStore("suspenseDataB");

  return <div>suspenseData: {data}</div>;
};

export default ComponentB;
