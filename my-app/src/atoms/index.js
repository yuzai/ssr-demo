import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "hahah", // default value (aka initial value)
});

export const countState = atom({
  key: "countState", // unique ID (with respect to other atoms/selectors)
  default: 10, // default value (aka initial value)
});
