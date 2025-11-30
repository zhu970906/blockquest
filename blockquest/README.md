# 🎮 BlockQuest - Web3区块链游戏

基于区块链技术的3D平台冒险游戏，集成NFT收藏和DeFi经济系统。

## ✨ 特性

- 🎮 **3D游戏体验** - 精美的3D画面和流畅的游戏操作
- 💎 **NFT收藏** - 收集独特的游戏角色和道具NFT
- 🏆 **竞技排名** - 与全球玩家竞争，赢取奖励
- 🔗 **Web3集成** - 基于以太坊/Polygon的去中心化游戏
- 💰 **DeFi经济** - 游戏内代币经济和质押系统

## 🚀 快速开始

### 环境要求

- Node.js 18.0+
- MetaMask或其他Web3钱包
- 现代浏览器（Chrome、Firefox、Safari）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/zhu970906/blockquest.git
cd blockquest
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
cp .env.example .env.local
# 编辑 .env.local 文件，填入相应的配置
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
blockquest/
├── pages/                 # Next.js页面
│   ├── index.js           # 主页
│   ├── app.js             # 应用配置
│   └── api/               # API路由
│       └── auth/
│           └── wallet.js  # 钱包认证
├── components/            # React组件
│   ├── Web3Provider.js    # Web3提供者
│   ├── WalletConnect.js   # 钱包连接
│   ├── GameUI.js          # 游戏界面
│   └── Leaderboard.js     # 排行榜
├── context/               # 状态管理
│   └── AppContext.js      # 全局状态
├── styles/                # 样式文件
│   └── globals.css        # 全局样式
├── package.json           # 项目配置
├── vercel.json           # Vercel部署配置
└── README.md             # 项目说明
```

## 🔧 环境变量配置

创建 `.env.local` 文件并配置以下变量：

```env
# Web3配置
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_RPC_URL=https://polygon-rpc.com
NEXT_PUBLIC_CONTRACT_ADDRESS=0x_your_contract_address

# 认证配置
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# 可选配置
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blockquest
PINATA_API_KEY=your_pinata_api_key
```

## 🎮 游戏玩法

### 开始游戏

1. **连接钱包** - 点击"连接钱包"按钮连接您的MetaMask
2. **选择网络** - 自动切换到Polygon网络（低Gas费）
3. **开始游戏** - 进入游戏大厅，选择游戏模式

### 游戏功能

- **角色收集** - 通过游戏获得独特的NFT角色
- **等级提升** - 完成任务获得经验值
- **竞技对战** - 与其他玩家竞争排名
- **奖励系统** - 赢取游戏代币和NFT奖励

## 🌐 部署

### Vercel部署（推荐）

1. **推送代码到GitHub**
2. **连接Vercel账户**
3. **导入GitHub仓库**
4. **配置环境变量**
5. **部署项目**

详细部署指南请参考：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### 其他平台

项目也支持部署到：
- Netlify
- Railway
- DigitalOcean
- 任何支持Next.js的平台

## 📚 技术栈

- **前端**: Next.js 14, React 18, Tailwind CSS
- **Web3**: Ethers.js, MetaMask SDK
- **后端**: Next.js API Routes
- **数据库**: MongoDB (可选)
- **部署**: Vercel

## 🔗 相关链接

- [GitHub仓库](https://github.com/zhu970906/blockquest)
- [在线演示](https://blockquest.vercel.app)
- [Polygon网络](https://polygon.technology/)
- [MetaMask钱包](https://metamask.io/)

## 🤝 贡献

欢迎提交Issue和Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果您遇到问题：

1. 查看 [FAQ](./FAQ.md)
2. 搜索已有的 [Issues](https://github.com/zhu970906/blockquest/issues)
3. 创建新的 Issue

---

**🎮 开始您的区块链游戏冒险之旅！**