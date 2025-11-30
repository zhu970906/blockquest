// Web3 提供者组件
import { useState, useEffect, createContext, useContext } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export function useWeb3() {
  return useContext(Web3Context);
}

export function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Polygon网络配置
  const POLYGON_CHAIN_ID = '0x89'; // 137 in hex
  const POLYGON_RPC_URL = 'https://polygon-rpc.com';

  useEffect(() => {
    checkConnection();
    setupEventListeners();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });
        
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (error) {
        console.error('Failed to check connection:', error);
      }
    }
  };

  const setupEventListeners = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('请安装MetaMask钱包');
    }

    setIsConnecting(true);
    try {
      // 请求连接钱包
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('未找到钱包账户');
      }

      // 创建provider和signer
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(accounts[0]);
      setIsConnected(true);

      // 检查网络
      const network = await web3Provider.getNetwork();
      if (network.chainId !== 137) {
        await switchNetwork();
      }

      return accounts[0];
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const switchNetwork = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('请安装MetaMask钱包');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: POLYGON_CHAIN_ID }]
      });
    } catch (switchError) {
      // 如果网络不存在，添加网络
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: POLYGON_CHAIN_ID,
                chainName: 'Polygon Mainnet',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: [POLYGON_RPC_URL],
                blockExplorerUrls: ['https://polygonscan.com/']
              }
            ]
          });
        } catch (addError) {
          throw new Error('添加Polygon网络失败');
        }
      } else {
        throw new Error('切换网络失败');
      }
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setIsConnected(false);
  };

  const getBalance = async () => {
    if (!provider || !account) return '0';
    
    try {
      const balance = await provider.getBalance(account);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  };

  const signMessage = async (message) => {
    if (!signer) throw new Error('钱包未连接');
    
    try {
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error('Failed to sign message:', error);
      throw error;
    }
  };

  const value = {
    provider,
    signer,
    account,
    isConnected,
    isConnecting,
    connectWallet,
    disconnect,
    switchNetwork,
    getBalance,
    signMessage
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}