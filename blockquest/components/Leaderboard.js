// 排行榜组件
import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      // 模拟排行榜数据（实际项目中应该从API获取）
      const mockData = [
        { rank: 1, address: '0x1234...5678', score: 15000, level: 25, achievements: 12 },
        { rank: 2, address: '0xabcd...efgh', score: 12500, level: 22, achievements: 10 },
        { rank: 3, address: '0x9876...5432', score: 11000, level: 20, achievements: 9 },
        { rank: 4, address: '0xfedc...ba98', score: 9500, level: 18, achievements: 8 },
        { rank: 5, address: '0x1357...2468', score: 8000, level: 16, achievements: 7 },
        { rank: 6, address: '0x2468...1357', score: 6500, level: 14, achievements: 6 },
        { rank: 7, address: '0x8642...7531', score: 5000, level: 12, achievements: 5 },
        { rank: 8, address: '0x7531...8642', score: 3500, level: 10, achievements: 4 },
      ];

      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLeaderboard(mockData);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        <span className="ml-2 text-gray-300">加载排行榜中...</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {leaderboard.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <p>暂无排行榜数据</p>
        </div>
      ) : (
        leaderboard.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between p-3 rounded-lg ${
              player.rank <= 3 
                ? 'bg-gradient-to-r from-yellow-900/30 to-yellow-700/30 border border-yellow-500/30' 
                : 'bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* 排名显示 */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                player.rank === 1 ? 'bg-yellow-500 text-black' :
                player.rank === 2 ? 'bg-gray-400 text-black' :
                player.rank === 3 ? 'bg-orange-600 text-white' :
                'bg-gray-600 text-white'
              }`}>
                {player.rank}
              </div>
              
              {/* 玩家信息 */}
              <div>
                <p className="font-mono text-sm">
                  {player.address}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>等级 {player.level}</span>
                  <span>•</span>
                  <span>{player.achievements} 成就</span>
                </div>
              </div>
            </div>

            {/* 分数显示 */}
            <div className="text-right">
              <p className="font-bold text-yellow-400">
                {player.score.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">分数</p>
            </div>
          </div>
        ))
      )}
      
      {/* 刷新按钮 */}
      <div className="text-center pt-4">
        <button
          onClick={loadLeaderboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          🔄 刷新排行榜
        </button>
      </div>
    </div>
  );
}