import axios from 'axios'
import { API_BASE_URL } from '../env'
import { PracticeData } from '../type/type'
import { useAuthStore } from '../store';
import { isTokenExpired } from '../utils/jwt';
import { ElMessage } from 'element-plus';
// 创建Axios实例server
const server = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 设置请求拦截器，每次请求在请求头中带上 JWT 令牌
server.interceptors.request.use(
    (config) => {
        const token = useAuthStore().token;
        if (token && !isTokenExpired(token)) {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            Object.assign(config, headers)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 设置响应拦截器，处理 401 错误
server.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // 401 错误，重新登录
            useAuthStore().logout();
            // window.location.href = "/login";
            ElMessage.error('登录状态已过期，请重新登录')
        } else {
            // 其他错误，抛出异常
            ElMessage.error('Oops, this is a error message.')
            return Promise.reject(error);
        }
    }
);





// 获取排行榜数据
export const getRankData = () => server.get('api/rank-data').then(res => res.data)
// 向用户添加新的练习信息
export const addPracticeData = async (practiceData: PracticeData) => {
    const res = await server.post('/api/addPracticeData', practiceData)
    return res.data
}
// 用户注册（账号密码）
export const register = async (username: string, password: string) => {
    const res = await server.post(
        "/api/register",
        { username, password }
    );
    return res.data
}
// 用户登录（账号密码）
export const login = async (username: string, password: string) => {
    const res = await server.post(
        "/api/login",
        { username, password }
    );
    return res.data
}
// 获取用户基本信息
export const getUserBaseInfo = (id: string) => server.get(`/api/users/${id}`).then(res => res.data)
