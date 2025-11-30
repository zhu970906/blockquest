// 全局状态管理
import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  wallet: null,
  gameData: {
    score: 0,
    level: 1,
    experience: 0,
    coins: 100,
    characters: [],
    achievements: []
  },
  nfts: [],
  leaderboard: [],
  isLoading: false,
  error: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_WALLET':
      return { ...state, wallet: action.payload };
    case 'SET_GAME_DATA':
      return { ...state, gameData: { ...state.gameData, ...action.payload } };
    case 'SET_NFTS':
      return { ...state, nfts: action.payload };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_SCORE':
      return { 
        ...state, 
        gameData: { 
          ...state.gameData, 
          score: state.gameData.score + action.payload 
        } 
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 连接钱包
  const connectWallet = async (address) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // 调用API验证钱包
      const response = await fetch('/api/auth/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: address }),
      });

      const data = await response.json();
      
      if (data.success) {
        dispatch({ type: 'SET_USER', payload: data.user });
        dispatch({ type: 'SET_WALLET', payload: { address, balance: '0' } });
        
        // 初始化游戏数据
        dispatch({ 
          type: 'SET_GAME_DATA', 
          payload: {
            score: 0,
            level: data.user.level || 1,
            experience: data.user.experience || 0,
            coins: 100
          }
        });
      } else {
        throw new Error(data.error || '钱包连接失败');
      }
    } catch (error) {
      console.error('Connect wallet error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 加载排行榜
  const loadLeaderboard = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // 模拟排行榜数据（实际项目中应该从API获取）
      const mockLeaderboard = [
        { rank: 1, address: '0x1234...5678', score: 15000, level: 25 },
        { rank: 2, address: '0xabcd...efgh', score: 12500, level: 22 },
        { rank: 3, address: '0x9876...5432', score: 11000, level: 20 },
        { rank: 4, address: '0xfedc...ba98', score: 9500, level: 18 },
        { rank: 5, address: '0x1357...2468', score: 8000, level: 16 },
      ];

      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'SET_LEADERBOARD', payload: mockLeaderboard });
    } catch (error) {
      console.error('Load leaderboard error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 更新分数
  const updateScore = (points) => {
    dispatch({ type: 'UPDATE_SCORE', payload: points });
  };

  // 更新游戏数据
  const updateGameData = (data) => {
    dispatch({ type: 'SET_GAME_DATA', payload: data });
  };

  const value = {
    ...state,
    connectWallet,
    loadLeaderboard,
    updateScore,
    updateGameData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}