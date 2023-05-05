<template>
  <div>
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="registerRules"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="registerForm.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          show-password
          placeholder="请输入密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          show-password
          placeholder="请再次确认密码"
          clearable
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">注册</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { ElForm, ElFormItem, ElInput, ElButton, ElImage, ElMessage } from "element-plus";
import {register }from '../server/index'
const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  avatar: "",
});
const registerRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
  email: [{ required: false, message: "请输入邮箱", trigger: "blur" }],
};
const handleSubmit = async () => {
    await registerFormRef.value.validate();
    const { username, password } = registerForm;
    try {
      // TODO: 发送登录请求，并处理登录成功/失败的逻辑
      const res = await register(username, password);
      if (res.code==200) {
        ElMessage({
          message: `注册成功！你的用户名：${username}`,
          type: "success",
        });
        handleReset();
      } else {
        ElMessage({
          message: "注册出错！",
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

const registerFormRef = ref();
const handleReset = () => {
  registerFormRef.value.resetFields();
  /*   Object.assign(registerForm, {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: ''
  }) */
};
</script>
<style lang="less" scoped></style>
