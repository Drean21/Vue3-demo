<template>
  <div class="container">
    <header class="header-gradient">
      <div class="top">
        <h1 class="title">智能手写数字验证游戏</h1>
      </div>
      <div class="buttons">
        <SessionBox ref="SessionBoxRef"></SessionBox>
      </div>
    </header>

    <div class="content">
      <aside>
        <div class="showQuestion">
          <!-- 问题展示区 -->
          <section>
            <article>
              <p>
                <span style="display: block; font-size: 18px; font-weight: bold"
                  >游戏描述:</span
                >
                本游戏将随机生成一道由0-9个位数字和加减乘除四则运算组合而成的简单算术题,如果感觉不会做可以切换题目多加练习。
                接下来请你开动一下你聪慧的大脑计算一下结果并在右侧区域的手绘数字区域进行作答。
              </p>
            </article>
            <!-- ... -->
            <article>
              <p style="margin-bottom: 30px">
                <span style="display: block; font-size: 18px; font-weight: bold"
                  >温馨提示:</span
                >作答时请注意笔画连顺、结构标准,否则统分系统可能误判哦
              </p>
              <p>
                <DisplayProblem ref="problemShow"></DisplayProblem>
              </p>
            </article>
            <el-button type="primary" plain size="large" @click="clearCanvas"
              >清空画布</el-button
            >

            <el-button type="primary" plain size="large" @click="predictAndRecognize"
              >提交结果</el-button
            >
          </section>
        </div>
      </aside>

      <main>
        <!-- 手写作答区 -->
        <HandwritingInput ref="Handwrite"></HandwritingInput>
      </main>

      <aside>
        <!-- 排行榜 -->
        <RankingList />
      </aside>
    </div>

    <PageFooter
      :startYear="2023"
      icpNumber="粤ICP备2023017658号"
      author="尘影"
    ></PageFooter>
  </div>
</template>

<script lang="ts" setup>
import { Directive, DirectiveBinding, onMounted, ref, toRef, watch } from "vue";
import DisplayProblem from "./components/DisplayProblem.vue";
import HandwritingInput from "./components/HandwritingInput.vue";
import PageFooter from "./components/PageFooter.vue";
import RankingList from "./components/RankingList.vue";
import { useAuthStore, useDisplayProblemStore } from "./store/index";
import { ElMessage, ElMessageBox } from "element-plus";
import { addPracticeData } from "./server";
import { PracticeData } from "./type/type";
import SessionBox from "./components/SessionBox.vue";
// 取得pinia的store对象

const displayProblemStore = useDisplayProblemStore();
const authStore = useAuthStore();
const Handwrite = ref();
const problemShow = ref();
const SessionBoxRef = ref();
const isAuthenticated = toRef(authStore, "isAuthenticated");
// 调用子组件HandwritingInput的clearCanvas和predictAndRecognize方法
const clearCanvas = () => {
  Handwrite.value.clearCanvas();
  ElMessageBox.alert("已清空，请重新作答", "提示", {
    confirmButtonText: "确定",
    type: "success",
  });
};
const predictAndRecognize = async () => {
  if (!isAuthenticated.value) {
      ElMessage({ message: "请先登录!", type: "warning" })  
      SessionBoxRef.value.openDialog();
      return;
  }
  let resNum = await Handwrite.value.predictAndRecognize();
  if (resNum == "null") {
    ElMessageBox.alert("你还没有作答哦！", "提示", {
      confirmButtonText: "确定",
      type: "error",
    });
  } else {
    const displayProblem = displayProblemStore.$state;
    const result = displayProblem.answer == resNum;
    const practiceData: PracticeData = {
      userId: authStore.getUser!.id,
      question: displayProblem.question,
      answer: displayProblem.answer,
      myAnswer: resNum,
      result: result,
    };
    try {
      const resCode = await addPracticeData(practiceData).then((res) => res.code);
      if (resCode == 200) {
        if (result) {
          ElMessageBox.alert("你的回答是" + resNum + ",恭喜你答对了", "提示", {
            confirmButtonText: "确定",
            type: "success",
          });
        } else {
          ElMessageBox.alert("你的回答是" + resNum + ",你答错了呜呜呜", "提示", {
            confirmButtonText: "确定",
            type: "error",
          });
        }
      } else {
        ElMessage.error("提交失败");
      }
    } catch (e) {
      ElMessage.error("发生异常：" + e);
    }
  }
  // 识别之后应当清除画布
  Handwrite.value.clearCanvas();
  // 换一道题目
  problemShow.value.generateProblem();
};

onMounted(() => {
  watch(
    isAuthenticated,
    (newVal, oldVal) => {
      if (!isAuthenticated.value) {
        ElMessage({
          message: "请先登录！",
          type: "warning",
        });
        SessionBoxRef.value.openDialog();
      }
    },
    { immediate: true }
  );
});

/* 游客认证指令——失败
const vHasLogin: Directive<HTMLElement> = (el: HTMLElement, binding: DirectiveBinding) => {
  if (!isAuthenticated.value) {
    el.removeEventListener('click', binding.oldValue) 
    el.removeAttribute('@click')  
    
    el.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault()
      ElMessage({ message: "请先登录!", type: "warning" })  
      SessionBoxRef.value.openDialog();
    })
  } else {
    el.addEventListener('click', binding.value) 
  }
} */
</script>

<style lang="less">
// 选中所有元素并将其 margin 和 padding 属性设置为 0，这样可以消除一些默认样式。
* {
  margin: 0;
  padding: 0;
}
// 三个选择器分别选中 HTML 元素、body 元素和 id 为 app 的元素，并将其 height 设置为 100%，这样可以使页面高度充满整个视口。overflow: hidden 可以防止内容溢出容器。会显得整个网页更好看不会下滑，需要注意的就是#app是index.html的挂载点，所以不能在<style lang="less">上添加scoped不然无法作用在index.html挂载点上
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

@keyframes animate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes wave {
  0% {
    transform: translateX(0) translateY(0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateX(50%) translateY(-25%) scale(2);
    opacity: 0;
  }
  100% {
    transform: translateX(100%) translateY(0) scale(1);
    opacity: 0.5;
  }
}
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  header {
    height: 10%;
    // background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top {
      margin-left: 1rem;

      .title {
        font-family: "Kaushan Script", cursive;
        font-size: 3rem;
        color: #ee4c7b;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      }
    }

    .buttons {
      margin-right: 1rem;
    }

    button {
      margin-left: 1rem;
    }
  }
  .header-gradient {
    background: linear-gradient(to right, #00ffc0, #008080);
    background-size: 300% 300%;
    animation: animate 10s linear infinite;
  }

  .content {
    flex: 1;
    display: flex;
    height: 100%;
    // 隐藏多出的区域（针对右边aside的排行榜）
    overflow: hidden;
    aside {
      .showQuestion {
        height: 100%;
        overflow-y: auto;
        width: 100%;
        &::before {
          content: "";
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background-color: rgba(255, 255, 255, 0.2);
          z-index: -1;
          animation: wave 2s linear infinite;
        }
        section {
          text-align: center; /* 新增,居中显示内容 */
          // background-color: gray;
        }
        article {
          margin: 20px;
          p {
            text-align: left;
            padding: 0 20px; /* 新增,设置左右内边距 */
          }
        }

        .el-button {
          display: flex;
          align-items: center; /* 垂直居中 */
          justify-content: center; /* 水平居中 */
          height: 20%;
          width: 84%;
          margin: 8%;
          padding: 3%;
          margin-top: 10%;
        }
      }
      // overflow-y: auto;
      position: relative;
      width: 25%;
      height: 100%;
      background-color: #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1; /* 新增,占满左侧 */
      background: linear-gradient(
        to bottom,
        rgba(43, 135, 200, 0.8),
        rgba(30, 84, 148, 0.8)
      );
    }

    main {
      flex: 1;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
.DisplayProblem {
  padding: 0 100px;
}
</style>
