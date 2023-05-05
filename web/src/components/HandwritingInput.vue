<template>
  <div ref="canvasWrapper" class="canvas-wrapper">
    <canvas ref="canvas" class="canvas"></canvas>
    <!-- <button @click="clearCanvas">清除</button> -->
  </div>
</template>

<script setup lang="ts">
import * as tf from "@tensorflow/tfjs";
import { Rank, Tensor, Tensor3D } from "@tensorflow/tfjs";
import { onMounted, onUnmounted, ref } from "vue";
const canvasWrapper = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let isDrawing = false;

const setupCanvas = () => {
  if (!canvas.value) return;
  canvas.value.width = canvasWrapper.value!.clientWidth;
  canvas.value.height = canvasWrapper.value!.clientHeight;
  ctx = canvas.value.getContext("2d");
  ctx!.lineJoin = "round";
  ctx!.lineCap = "round";
  ctx!.lineWidth = 45; // 设置线段的宽度为45
  ctx!.fillStyle = "black"; // 设置背景颜色为黑色
  ctx!.strokeStyle = "white"; // 设置画笔颜色为白色
};

const startDrawing = (e: MouseEvent) => {
  isDrawing = true;
  draw(e);
};

const stopDrawing = () => {
  isDrawing = false;
};

const draw = (e: MouseEvent) => {
  if (!isDrawing || !ctx) return;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.bezierCurveTo(
    e.offsetX,
    e.offsetY, // 控制点1，起始点
    e.offsetX,
    e.offsetY, // 控制点2，终点
    e.offsetX,
    e.offsetY // 终点
  );
  ctx.stroke();
  ctx.closePath();
};

const clearCanvas = () => {
  canvas.value?.width &&
    canvas.value?.height &&
    ctx?.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

const isCanvasEmpty = () => {
  if (!canvas.value || !ctx) return true;
  const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
  const imageDataLength = imageData.data.length;

  for (let i = 0; i < imageDataLength; i += 4) {
    if (
      imageData.data[i] !== 0 ||
      imageData.data[i + 1] !== 0 ||
      imageData.data[i + 2] !== 0 ||
      imageData.data[i + 3] !== 0
    ) {
      return false;
    }
  }
  return true;
};
// 使用模型进行预测
const predictAndRecognize = async () => {
  if (isCanvasEmpty()) {
    console.log("画布为空");
    return "null";
  }
  if (!canvas.value || !ctx) return;
  const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
  const imageTensor = tf.browser.fromPixels(imageData).toFloat(); // 从 canvas 获取图像数据并转换为 Tensor
  const grayscaleTensor = imageTensor.mean(2).expandDims(2); // 转换为灰度图像
  const castedTensor = tf.cast(grayscaleTensor, "float32") as Tensor3D ; // 将 grayscaleTensor 转换为 float32 类型的 Tensor3D
  const resizedTensor = tf.image.resizeBilinear(castedTensor, [28, 28]); // 调整尺寸为 [28, 28]
  const expandedTensor = resizedTensor.expandDims(0); // 添加一个维度以匹配模型的输入形状
  const model = await tf.loadLayersModel("/model/model.json");
  const prediction = model.predict(expandedTensor) as tf.Tensor; // 使用模型进行预测
  const predictionData = await prediction.data() as unknown as Tensor<Rank>;
  const predictedClass = processPrediction(predictionData);
  console.log("识别结果:", predictedClass);
  return predictedClass;
};

const processPrediction = (prediction: tf.Tensor<tf.Rank>): number => {
  const predictedClass = tf.argMax(prediction).dataSync()[0];
  return predictedClass;
};

// Vue组件注册后，添加事件监听
onMounted(() => {
  setupCanvas();
  canvasWrapper.value!.addEventListener("mousedown", startDrawing);

  let lastDrawTime = 0;
  const drawInterval = 4; // 绘制间隔时间，单位为毫秒

  canvasWrapper.value!.addEventListener("mousemove", (e: MouseEvent) => {
    const currentTime = performance.now();
    if (currentTime - lastDrawTime >= drawInterval) {
      lastDrawTime = currentTime;

      // 使用 requestAnimationFrame 控制绘制频率
      requestAnimationFrame(() => {
        draw(e);
      });
    }
  });

  canvasWrapper.value!.addEventListener("mouseup", stopDrawing);
});

// Vue组件销毁后，移除事件监听
onUnmounted(() => {
  canvasWrapper.value!.removeEventListener("mousedown", startDrawing);
  canvasWrapper.value!.removeEventListener("mousemove", draw);
  canvasWrapper.value!.removeEventListener("mouseup", stopDrawing);
});
// 暴露 clearCanvas 方法为公共方法
defineExpose({
  clearCanvas,
  predictAndRecognize,
});
</script>

<style lang="less">
.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid black;
  background-color: black; /* 添加这一行设置背景颜色为黑色 */
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
