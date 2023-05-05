<template>
  <div class="calculator">
    <div class="problem-wrapper">
      <transition name="fade" @after-leave="generateProblem">
        <div class="problem" :class="{ animated: animated }">{{ problem }}</div>
      </transition>
    </div>
  </div>
  <button @click="generateProblem">换一道题目</button>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { useDisplayProblemStore } from "../store";

// 生成题目
const generateProblem = () => {
  // 添加动画效果
  animated.value = true;
  problem.value = "正在出题..."; // 显示正在出题文本
  setTimeout(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = "+";
    answer.value = num1 + num2;
    if (answer.value >= 10) {
      generateProblem();
    } else {
      problem.value = `${num1} ${operator} ${num2} = ? `;
    }
    setTimeout(() => {
      animated.value = false;
    }, 500); // 500毫秒后移除动画效果
  }, 500); // 500毫秒后生成新题目
};

// 清空问题和答案
const clean = () => {
  problem.value = "";
  answer.value = 0;
};

// 数据响应式
const problem = ref("");
const answer = ref(9);
const showAnswer = ref(false);
const animated = ref(false); // 是否添加动画效果

// 在组件加载时生成初始问题
onMounted(() => {
  generateProblem();
});
// 从 store 中获取 displayProblem 对象，并绑定数据
const { proxy } = getCurrentInstance()!;
const displayProblem = useDisplayProblemStore();

// 将 answer 和 question 绑定到 displayProblem 对象上
proxy!.$watch(
  () => [problem.value, answer.value],
  ([problemValue, answerValue]) => {
    displayProblem.question = problemValue+'';
    displayProblem.answer = answerValue+'';
  },
  { deep: true } // 注意需要开启深度监听
);
defineExpose({
  generateProblem
})
</script>

<style lang="less" scoped>
.calculator {
  position: relative;
  height: calc(2 * (48px + 16px)); /* 恢复固定高度 */
  width: 100%;
  background-color: #FFA726;
  color: #fff;
  display: flex;
  justify-content: center;  
  align-items: center;   
  padding: 16px; /* 使用padding控制高度比例 */ 
  box-sizing: border-box; 
}  

.problem-wrapper {
  width: 100%;  
}
  
.problem {
  width: 100%;
  display: flex;    
  justify-content: center;     
  align-items: center;    
  height: 100%; /* 恢复高度100% */
  font-size: 24px;    
  margin-bottom: -8px;      
}
.button-container {
  width: 100%;    
}

button {
  font-size: 18px;
  padding: 8px 16px;       
  margin-top: 0;        
  height: 48px;         
  line-height: 48px;                  
  background-color: #FF7043;                     
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;       
  text-align: center;          
  display: flex;       
  justify-content: center;
  align-items: center;   
}
</style>
