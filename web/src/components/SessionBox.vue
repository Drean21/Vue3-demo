<template>
  <el-button v-if="!isLogin" type="primary" plain @click="loginVisible = true"
    >登录</el-button
  >
  <el-button v-else type="primary" @click="logout">注销</el-button>
  <el-dialog
    :title="formType"
    v-model="loginVisible"
    :close-on-click-modal="false"
    :show-close="true"
    width="20%"
    class="login-dialog"
    align-center
    center
  >
    <component
      :is="formType === 'login-form' ? LoginForm : RegisterForm"
      @login_success="closeDialog"
    />
    <div class="dialog-footer">
      <el-link type="info" @click.prevent="switchForm" :underline="true">
        {{
          formType === "login-form" ? "还没有账号?去注册！" : "已有账号？去登录！"
        }}</el-link
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../store";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
const authStore = useAuthStore();
const isLogin = computed(() => {
  return authStore.isAuthenticated;
});
const loginVisible = ref(false);
const formType = ref("login-form");

const switchForm = () => {
  formType.value = formType.value === "login-form" ? "register-form" : "login-form";
};

const logout = () => {
  ElMessage({
    message: "您已登出，下次再见！",
    type: "info",
  });
  authStore.logout();
};

const closeDialog = () => {
  loginVisible.value = false;
};
const openDialog = () => {
  loginVisible.value = true;
};

defineExpose({
  closeDialog,
  openDialog,
});
</script>

<style less scoped>
.dialog-footer {
  text-align: right;
  margin-top: 20px;
}
</style>
