const validHash = process.env.VALID_HASH; // 从环境变量读取

export default async function handler(req, res) {
  // 处理CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://ikko010.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { code } = req.body;
      
      // 对比哈希值
      if (code === validHash) {
        return res.status(200).json({ valid: true });
      }
      return res.status(401).json({ valid: false });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).end();
}
