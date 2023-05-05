import jwtDecode from "jwt-decode";
// 定义载荷类型
export interface JwtPayload {
    sub: string; // 用户ID
    iat: number; // 签发时间
    exp: number; // 过期时间
}
/**
* 从 JWT 中解析载荷数据
*/
export function decodeToken(token: string): JwtPayload {
    return jwtDecode(token);
}
/**
* 获取 JWT 的过期时间
*/
export function getExpireTime(token: string): Date {
    const payload: JwtPayload = decodeToken(token);
    return new Date(payload.exp * 1000);
}
/**
* 判断 JWT 是否过期
*/
export function isTokenExpired(token: string): boolean {
    const expireTime: Date = getExpireTime(token);
    return expireTime.getTime() <= Date.now();
}
