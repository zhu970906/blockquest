// 钱包连接API
import { ethers } from 'ethers';

export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet, signature, message } = req.body;

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    // 验证钱包地址格式
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    // 如果提供了签名，验证签名
    if (signature && message) {
      try {
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
          return res.status(401).json({ error: 'Invalid signature' });
        }
      } catch (error) {
        return res.status(401).json({ error: 'Signature verification failed' });
      }
    }

    // 模拟用户数据（实际项目中应该从数据库获取）
    const user = {
      wallet: wallet.toLowerCase(),
      level: 1,
      experience: 0,
      achievements: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    // 返回成功响应
    res.status(200).json({
      success: true,
      user,
      message: 'Wallet connected successfully'
    });

  } catch (error) {
    console.error('Wallet auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}