<template>
  <div>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          show-password
          placeholder="请输入密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { useAuthStore } from "../store";

const loginForm = reactive({
  username: "",
  password: "",
});

const loginRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const authStore = useAuthStore();
const handleSubmit = async () => {
    await loginFormRef.value.validate();
    const { username, password } = loginForm;
    try {
      // TODO: 发送登录请求，并处理登录成功/失败的逻辑
      await authStore.login(username, password);
      if (authStore.isAuthenticated) {
        ElMessage({
          message: `${authStore.getUser?.name}，欢迎回来`,
          type: "success",
        });
        // 登录成功，跳转到首页
        // router.push("/");
        // 本项目中直接关闭会话弹框——尝试触发自定义事件失败
        // getCurrentInstance()?.proxy?.$emit('login_success');
        window.location.reload();

      } else {
        ElMessage({
          message: "用户名或密码错误！",
          type: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      ElMessage({
        message: `network-erro:${error}`,
        type: "error",
      });
    }
};

const loginFormRef = ref();
const handleReset = () => {
  // ElementPlus的API
  loginFormRef.value.resetFields();
  // 原始方法
  /*   Object.assign(loginForm, {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: ''
  }) */
};
defineEmits(['login_success'])
</script>

<style lang="less" scoped></style>
