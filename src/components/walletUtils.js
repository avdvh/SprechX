import Web3 from 'web3';

export const connectWallet = async () => {
  try {
    if (window.ethereum) {
      const provider = window.ethereum;

      // Request account access if needed
      await provider.request({ method: 'eth_requestAccounts' });

      // Initialize Web3 instance
      const web3 = new Web3(provider);

      // Get the user's account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];  // Assuming the user connected one account

      // Optional: Check if the user is on the correct network
      const networkId = await web3.eth.net.getId();
      console.log('Network ID:', networkId);  // Can enforce specific chain ID here

      console.log('Connected wallet:', account);
      return { web3, account };  // Return both the Web3 instance and account for future use
    } else {
      console.error('No Ethereum provider found. Please install MetaMask!');
      return null;
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
};
