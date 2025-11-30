// 游戏界面组件
import { useState } from 'react';

export default function GameUI() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, gameOver
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused');
  };

  const endGame = () => {
    setGameState('gameOver');
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">🎮 游戏区域</h2>
      
      {/* 游戏状态显示 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg">
          <span className="text-gray-300">分数:</span> 
          <span className="font-bold text-yellow-400 ml-2">{score}</span>
        </div>
        <div className="text-lg">
          <span className="text-gray-300">等级:</span> 
          <span className="font-bold text-green-400 ml-2">{level}</span>
        </div>
      </div>

      {/* 游戏主区域 */}
      <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center mb-6">
        {gameState === 'menu' && (
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-4">BlockQuest</h3>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              开始游戏
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">🏃</div>
            <p className="text-lg mb-4">游戏进行中...</p>
            <button
              onClick={pauseGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              暂停
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="text-center">
            <div className="text-6xl mb-4">⏸️</div>
            <p className="text-lg mb-4">游戏已暂停</p>
            <div className="space-x-4">
              <button
                onClick={pauseGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                继续
              </button>
              <button
                onClick={endGame}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                结束游戏
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center">
            <div className="text-6xl mb-4">🏁</div>
            <h3 className="text-xl font-bold mb-2">游戏结束</h3>
            <p className="text-lg mb-4">最终分数: {score}</p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              重新开始
            </button>
          </div>
        )}
      </div>

      {/* 游戏控制按钮 */}
      {gameState === 'playing' && (
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors"
            onClick={() => setScore(score + 10)}
          >
            🪙 收集金币
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors"
            onClick={() => setLevel(level + 1)}
          >
            ⬆️ 升级
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
            onClick={endGame}
          >
            🛑 结束
          </button>
        </div>
      )}

      {/* 游戏说明 */}
      <div className="mt-6 text-sm text-gray-300 text-center">
        <p>这是一个基于区块链的3D平台游戏演示</p>
        <p>实际游戏将包含Unity WebGL集成</p>
      </div>
    </div>
  );
}