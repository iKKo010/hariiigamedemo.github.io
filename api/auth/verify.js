// verify.js - 修复后的完整版本
const validHash = process.env.VALID_HASH?.toLowerCase(); // 统一转小写

export default async function handler(req, res) {
  // 增强CORS配置
  const allowedOrigins = [
    'https://hariiigamedemo-github-io.vercel.app',
    'http://localhost:5500'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // 新增 GET 方法支持
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');

  // 预检请求直接返回
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    try {
      const { code } = req.body;
      
      // 调试日志（Vercel部署日志可见）
      console.log('Received hash:', code?.slice(0, 6) + '...');
      console.log('Expected hash:', validHash?.slice(0, 6) + '...');

      if (!code) {
        return res.status(400).json({ error: 'Missing code parameter' });
      }

      // 统一转换为小写比较
      if (code.toLowerCase() === validHash) {
        return res.status(200).json({ 
          valid: true,
          timestamp: new Date().toISOString()
        });
      }
      
      return res.status(401).json({ 
        valid: false,
        message: 'Invalid authorization code'
      });
      
    } catch (error) {
      console.error('Verification error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const { code } = req.query; // GET 请求从查询字符串中获取参数

      // 调试日志（Vercel部署日志可见）
      console.log('Received hash:', code?.slice(0, 6) + '...');
      console.log('Expected hash:', validHash?.slice(0, 6) + '...');

      if (!code) {
        return res.status(400).json({ error: 'Missing code parameter' });
      }

      // 统一转换为小写比较
      if (code.toLowerCase() === validHash) {
        return res.status(200).json({ 
          valid: true,
          timestamp: new Date().toISOString()
        });
      }
      
      return res.status(401).json({ 
        valid: false,
        message: 'Invalid authorization code'
      });
      
    } catch (error) {
      console.error('Verification error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// 确保Edge Runtime配置
export const config = {
  runtime: 'edge',
  regions: ['icn1'], // 指定首尔区域
};
