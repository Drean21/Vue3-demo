import { Tensor } from "@tensorflow/tfjs";

// typings/custom-tensor.d.ts
declare module "@tensorflow/tfjs" {
    export function cast<T extends Tensor>(x: T, dtype: "float32"): T;
  }
