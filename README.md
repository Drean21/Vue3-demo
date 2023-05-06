# Vue3-demo手写数字识别

## 起源

基于深度学习的模型训练和开发web应用程序的小作业结合前一段时间学习的Vue3知识编写项目的demo

主要是现成的Vue3项目实在太少（基本上都是Vue2，要么就是使用的是js而不是ts，要么用的Vuex而不是pinia......），为了防止所学的Vue3知识被遗忘故此写个demo实践

## 技术栈

使用前端最新Vue3组合式API（script语法糖）+pinia+ts+less+Element-Plus组件库+tensortflow.js等，探索Vue3前端编码的最佳工程体验

## 架构

一个小demo但尝试最佳的工程化编程体验，采用前后端分离架构，作为一个纯粹的前端项目更利于个人学习Vue3，同时和后端解耦；

了解到前端项目的mock方案，最终选择了灵活性较强的nodejs+mockjs搭建mock服务器的方案辅助前端独立调试

## 项目结构

项目目录结构树：

```
Vue3-demo
├─ mock-node
│    ├─ index.js     
│    ├─ node_modules 
│    │    └─ 略....
│    ├─ package-lock.json
│    ├─ package.json
│    ├─ router
│    │    └─ router.js
│    └─ utills
│           └─ auth.ts
└─ web
       ├─ .vite
       ├─ .vscode
       │    ├─ extensions.json
       │    ├─ launch.json
       │    └─ settings.json
       ├─ index.html
       ├─ node_modules 
       │    └─ 略....
       ├─ package-lock.json
       ├─ package.json
       ├─ public
       │    ├─ model
       │    └─ vite.svg
       ├─ src
       │    ├─ App.vue
       │    ├─ assets
       │    ├─ components
       │    ├─ env.ts
       │    ├─ main.ts
       │    ├─ router
       │    ├─ server
       │    ├─ store
       │    ├─ style.css
       │    ├─ type
       │    ├─ utils
       │    ├─ views
       │    └─ vite-env.d.ts
       ├─ tsconfig.json
       ├─ tsconfig.node.json
       ├─ typings
       │    └─ custom-tensor.d.ts
       └─ vite.config.ts
```

这是一个 Vue3 项目，主要分为两个目录：

1. `mock-node` 目录

   存放了后端 Node.js 的代码，用于模拟数据，具体的目录结构如下：

   - `index.js`：入口文件。
   - `node_modules`：存放通过 npm 安装的模块文件。
   - `package-lock.json`：npm 安装依赖时生成的锁定文件。
   - `package.json`：项目依赖包的配置文件。
   - `router/`：存放后端路由的文件。
   - `utils/`：存放工具函数。

2. `web` 目录

   存放了前端 Vue3 的代码，包括开发、构建和部署所需的所有文件，具体的目录结构如下：

   - `.vite`：Vite 构建工具的配置目录。
   - `.vscode`：VS Code 编辑器的配置目录。
   - `index.html`：页面的 HTML 模板文件。
   - `node_modules`：存放通过 npm 安装的模块文件。
   - `package-lock.json`：npm 安装依赖时生成的锁定文件。
   - `package.json`：项目依赖包的配置文件。
   - `public`：公共资源目录，存放静态文件，如图片、字体等。本demo中存放了手写数字识别训练得到的tensortflow.js可运行模型
   - `src`：源码目录，存放 Vue 程序的核心代码。
   - `tsconfig.json`：TypeScript 的配置文件。
   - `tsconfig.node.json`：Node.js 的 TypeScript 配置文件。
   - `typings/custom-tensor.d.ts`：存放自定义的 TypeScript 类型文件。
   - `vite.config.ts`：Vite 构建工具的配置文件。

其中，`src` 目录下的文件主要包括：

- `App.vue`：Vue3 应用的根组件。
- `assets`：存放图像、样式等资源文件。
- `components`：存放可复用的 Vue3 组件。
- `env.ts`：存放环境变量的 TypeScript 文件。
- `main.ts`：Vue3 应用的入口文件。
- `router`：存放前端路由相关的代码。
- `server`：存放与服务器交互相关的代码。
- `store`：存放pinia状态管理相关的代码。
- `style.css`：全局 CSS 样式文件。
- `type`：存放 TypeScript 接口和类型定义文件。
- `utils`：存放通用的工具函数。
- `views`：存放应用视图组件。
- `vite-env.d.ts`：Vite 构建工具的类型声明文件。



## 计划

**已实现的想法**

1. Vue3组合式API+`<script setup>`的开发模式

2. 封装一个比较通用的自定义页尾组件

3. 使用动态组件component实现登录/注册页面的切换完成页面编写，

4. 使用动画组件transition和transition-group实现问题展示组件的动画效果

5. 使用tensortflow.js加载模型调用模型预测并熟悉Canvas画布的基础语法

6. 使用less代替css、Typescript代替js

7. 探究最佳的工程结构：

   - env.ts定义和修改项目的全局环境;
   - server文件夹下存放api的请求
   - component文件夹下存放单个独立的组件
   - views文件夹下存放单个页面（多个组件构成）
   - router文件夹下存放路由相关文件
   - store文件夹下定义pinia的存储模型和相关方法；
   - type文件夹下定义共用的数据模型；
   - utills文件夹下存放通用的工具类
   - .......

   tip：对于模型多、api复杂的项目可以分门别类具名导出，简单的直接一个index默认导出

8. 使用Element-Plus组件库完成排行榜组件、常用按钮、表单并完成表单校验的应用

9. 使用pinia-plugin-persistedstate插件持久化存储

10. 熟悉nodejs搭建web服务，使用nodejs+mockjs搭建mock服务器，利用nodemon技术动态同步后台的代码修改重启服务

11. 尝试打包Vue3项目并将打包好的dist文件夹设置为mock-node的首页完成一次简单的项目部署

**待实现的想法**

> 有空再说~

1. 将页面布局抽取成layout.vue放在component中作为布局组件，简化App.vue，令页面布局实现复用
2. 尝试在demo中应用上router路由知识，路由导航、路由守卫等
3. 寻找恰当的功能需求来应用自定义Vue指令、传送组件、Animate.css动画库、Vue的依赖注入等未应用的技能点
4. 完善登录/注册加入随机验证码、邮箱短信认证等，接入微信、QQ登录......
5. 搭建相应的后端服务程序......

## 一些踩坑

### Typescript

首先，项目demo使用了ts，作为js的超集，我认为这是未来项目应该比js更好，尤其我本来就是学习的Java后端，引入ts感觉前端项目更加的规范化了。

引入了ts能够更好的完成类型声明和类型推断，在定义数据类型后我们可以方便的利用代码提示快速编写代码同时保证了项目的严谨。

但是也有问题了，那就是很多第三方js库是没有针对ts做类型声明的所以会导致报错，这时候就需要手动去完成类型声明的配置；当然现在不少js库都针对ts做了类型声明，我们只需引入对应的类型声明即可

总之使用ts，少不了类型声明不然报错

### pinia-plugin-persistedstate

官网：[快速开始 | pinia-plugin-persistedstate (prazdevs.github.io)](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)

一款pinia增强插件，之前学的时候学的是2.0+的语法使用

但我写demo的时候发现已经更新到3.0+了，废弃了一些旧语法和引入了新语法和处理方案。所以说还是得看官方文档~