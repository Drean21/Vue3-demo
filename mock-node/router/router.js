/* Router案例：
- 多个router文件: 结构清晰,易于扩展,独立开发（使用默认导出即可，方便在router下划分子路由——大项目多人协作）
- 一个router文件,具名导出: 文件数量少,管理方便（小项目开发） */
import jwt from 'jsonwebtoken';
import Mockjs from 'mockjs';
// import * as express from 'express'
import express from 'express';
const router = express.Router()

// app.use('/api', router)

router.get('/rank-data', async (req, res) => {
    // 定义生成 mock 数据的函数
    const generateMockData = () => {
        const result = []
        // 生成排行榜数据
        for (let i = 0; i < 30; i++) {
            const user = Mockjs.mock({
                'name|1-2': '@cname',
                solved: '@integer(50, 200)',
                accuracy: '@float(0, 1, 2, 2)'
            })
            result.push({
                rank: i + 1,
                name: user.name,
                avatar: '',
                solved: user.solved,
                accuracy: (user.accuracy * 100).toFixed(2) + '%'
            })
        }
        return result
    }
    res.status(200).json({
        code: 200,
        data: generateMockData(),
        msg: '数据截至：' + new Date().toISOString()
    })
})

router.post('/addPracticeData', async (req, res) => {
    res.status(200).json({
        code: 200,//表示成功提交，发生了修改
        data: null,
        msg: '添加成功'
    })
})

router.post('/register', async (req, res) => {
    return res.json({
        code: 200,
        data: null,
        msg: '注册成功'
    });
    // return res.json({
    //     code: 201,
    //     data: null,
    //     msg: '注册失败'
    // });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // TODO: 根据用户名和密码验证用户，返回相应的假数据
    if (username === 'admin' && password === '123456') {
        // 生成 JWT
        const payload = {
            sub: '1234567890', // 用户 ID
            name: username,
            iat: Math.floor(Date.now() / 1000), // 时间戳，表示 JWT 的创建时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 时间戳，表示 JWT 的过期时间
        };
        const secretKey = Mockjs.Random.string('lower', 32);
        const token = jwt.sign(payload, secretKey);
        return res.json({
            code: 200,
            data: {
                token: token
            },
            msg: '登录成功'
        });
    } else {
        return res.json({
            code: 401,
            data: {
                token: null
            },
            msg: '用户名或密码错误'
        });
    }
});

router.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    // TODO: 根据用户 ID 获取用户基本信息，返回相应的假数据
    return res.json({
        code: 200,
        data: {
            id: userId,
            name: '张三',
            age: 24,
            gender: '男'
        },
        msg: '获取用户基本信息成功'
    });
});

export default router
