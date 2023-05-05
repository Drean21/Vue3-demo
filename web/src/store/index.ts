import { defineStore } from 'pinia';
import { User } from '../type/user';
import { decodeToken, isTokenExpired } from '../utils/jwt';
import { getUserBaseInfo, login } from '../server';
// 除了解构赋值按需导入外，我们还可以全部导入取别名如：import * as type from './type'



// 创建 DisplayProblem Store
export const useDisplayProblemStore = defineStore({
    id: "displayproblem",
    state: () => ({
        question: "",
        answer: ""
    }),
    getters: {
        getQuestion(state): string {
            return state.question;
        },
        getAnswer(state): string {
            return state.answer;
        }
    },
    actions: {}
});


// 创建 AuthStore
export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        token: null,
        user: null,
    }),
    getters: {
        isAuthenticated(state):boolean {
            return !!state.token && !isTokenExpired(state.token); // token 存在且未过期即认证通过
        },
        getUser(state): User|null {
            return state.user ? state.user : null;
        }
    },
    actions: {
        async login(username: string, password: string): Promise<void> {
            const response = await login(username, password);
            const token = response?.data?.token;
            if (token !== null) {
                // 保存 token
                this.token = token;
                // 保存用户信息
                const { sub: id } = decodeToken(token);
                const { data: user } = await getUserBaseInfo(id);
                this.user = user;

            }
        },
        logout(): void {
            // 清除 token 和用户信息
            this.token = null;
            this.user = null;
        },
        checkAuth(): boolean {
            return this.isAuthenticated;
        },
    },
    persist:true
});
