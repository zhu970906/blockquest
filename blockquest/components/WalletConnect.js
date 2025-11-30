// 钱包连接组件
import { useWeb3 } from './Web3Provider';

export default function WalletConnect() {
  const { account, isConnected, isConnecting, connectWallet, disconnect, getBalance } = useWeb3();

  if (isConnecting) {
    return (
      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        连接中...
      </div>
    );
  }

  if (!isConnected) {
    return (
      <button
        onClick={connectWallet}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
      >
        连接钱包
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-2">
        <p className="text-sm text-gray-300">钱包地址</p>
        <p className="font-mono text-sm">
          {account?.slice(0, 6)}...{account?.slice(-4)}
        </p>
      </div>
      <button
        onClick={disconnect}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        断开连接
      </button>
    </div>
  );
}