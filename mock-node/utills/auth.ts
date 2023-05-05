/* import jwt from 'jsonwebtoken';
 // 生成 JWT
const payload = {
  sub: '1234567890', // 用户 ID
  name: 'John Doe',
  iat: Math.floor(Date.now() / 1000), // 时间戳，表示 JWT 的创建时间
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 时间戳，表示 JWT 的过期时间
};
const secretKey = 'your-secret-key';
const token = jwt.sign(payload, secretKey);
 // 解码 JWT
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
 const decodedToken = decodeToken(token);
if (decodedToken) {
  const { sub: id } = decodedToken; // 从 JWT 中解析出用户 ID
  console.log(id);
}
 */
