// 主页 - BlockQuest Web3游戏
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useApp } from '../context/AppContext';
import { useWeb3 } from '../components/Web3Provider';
import WalletConnect from '../components/WalletConnect';
import GameUI from '../components/GameUI';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  const { user, wallet, gameData, isLoading, loadLeaderboard } = useApp();
  const { isConnected, connectWallet, switchNetwork } = useWeb3();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    // 加载排行榜数据
    loadLeaderboard();
  }, [loadLeaderboard]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('钱包连接失败: ' + error.message);
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork();
    } catch (error) {
      console.error('Failed to switch network:', error);
      alert('网络切换失败: ' + error.message);
    }
  };

  if (!isConnected) {
    return (
      <>
        <Head>
          <title>BlockQuest - 区块链3D游戏</title>
          <meta name="description" content="基于区块链的3D平台冒险游戏" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-16">
            {/* 头部 */}
            <header className="text-center mb-16">
              <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                BlockQuest
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                基于区块链技术的3D平台冒险游戏
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleConnectWallet}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                >
                  连接钱包开始游戏
                </button>
                <button
                  onClick={() => setShowLeaderboard(true)}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                >
                  查看排行榜
                </button>
              </div>
            </header>

            {/* 游戏特色 */}
            <section className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-bold mb-2">3D游戏体验</h3>
                <p className="text-gray-300">精美的3D画面和流畅的游戏操作</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-2">NFT收藏</h3>
                <p className="text-gray-300">收集独特的游戏角色和道具NFT</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">竞技排名</h3>
                <p className="text-gray-300">与全球玩家竞争，赢取奖励</p>
              </div>
            </section>

            {/* 排行榜模态框 */}
            {showLeaderboard && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">🏆 排行榜</h2>
                    <button
                      onClick={() => setShowLeaderboard(false)}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <Leaderboard />
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>BlockQuest - 游戏大厅</title>
        <meta name="description" content="BlockQuest游戏大厅" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* 顶部导航 */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              BlockQuest
            </h1>
            <div className="flex items-center space-x-4">
              <WalletConnect />
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                排行榜
              </button>
            </div>
          </header>

          {/* 主游戏区域 */}
          <main className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <GameUI />
            </div>
            
            <div className="space-y-6">
              {/* 玩家信息 */}
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">玩家信息</h3>
                {user && (
                  <div className="space-y-2">
                    <p><span className="text-gray-400">地址:</span> {wallet.address}</p>
                    <p><span className="text-gray-400">余额:</span> {wallet.balance} ETH</p>
                    <p><span className="text-gray-400">等级:</span> {user.level}</p>
                    <p><span className="text-gray-400">经验:</span> {user.experience}</p>
                  </div>
                )}
              </div>

              {/* 排行榜 */}
              {showLeaderboard && (
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">🏆 排行榜</h3>
                  <Leaderboard />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}