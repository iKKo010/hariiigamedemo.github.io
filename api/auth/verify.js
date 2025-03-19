// api/auth/verify.js
import sha256 from 'js-sha256';

// 从环境变量中读取有效密码哈希值
const validCodes = new Set(process.env.VALID_CODES.split(','));

export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { inputCode } = req.body;
            // 对输入的密码进行哈希处理
            const hashedInput = sha256(inputCode);

            if (validCodes.has(hashedInput)) {
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ success: false, message: '验证码错误，请重新输入' });
            }
        } catch (error) {
            console.error('验证过程中出现错误:', error);
            res.status(500).json({ success: false, message: '服务器内部错误，请稍后重试' });
        }
    } else {
        res.status(405).json({ message: '仅支持 POST 请求' });
    }
}
