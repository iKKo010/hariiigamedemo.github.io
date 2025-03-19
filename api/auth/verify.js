// 使用 SHA256 加密库
const sha256 = require('js-sha256');

module.exports = async (req, res) => {
  // 从环境变量读取合法哈希值
  const validHashes = process.env.AUTH_HASHES.split(',');
  
  // 获取前端传来的哈希值
  const { code } = JSON.parse(req.body);
  const clientHash = sha256(code);
  
  // CORS 配置
  res.setHeader('Access-Control-Allow-Origin', 'https://ikko010.github.io/hariiigamedemo.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  if (validHashes.includes(clientHash)) {
    res.status(200).json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
};