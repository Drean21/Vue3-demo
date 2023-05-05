// 接口返回的用户信息类型
export interface User {
  id: string;
  name: string;
  age?: number
  gender?:'男'|'女'
  }

// 定义 AuthStore 类型
export interface AuthStore {
  token: string | null;
  user: User | null;
  login(username: string, password: string): Promise<void>;
  logout(): void;
  checkAuth(): boolean;
}
