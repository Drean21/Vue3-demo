import bodyParser from 'body-parser';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './router/router.js';


const app = express()
// app.use(express.static(path.join(__dirname, 'dist')));
// 获取类似于 __dirname 的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 设置允许跨域
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// 注册路由
app.use('/api', router)

// 监听和启动监听服务成功的回调函数
app.listen(5000, () => {
    console.log('success server http://localhost:5000')
})
