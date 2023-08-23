The goal of this project is to be able to represent supplychains of real products on the Ethereum blockchain.

### Scope of the Project:
1. Solidity smart contract
2. Client to interact with the contract

### Functionality of the Client:
1. Add product
2. Search product
3. Add quality label
4. Search quality label
5. Add Link between products
6. Link quality label to product
7. Remove Link of any kind

The client visualizes the supplychain as a tree graph.

### Setup Metamask with Goerli Testnetwork

1. Add Metamask to your browser.
2. Add Goerli Testnetwork to Metamask:
   - Network name: Goerli
   - New RPC URL: https://ethereum-goerli.publicnode.com
   - Chain ID: 5
   - Currency symbol: ETH
   - If the RPC URL doesn't work, search for a new one [here](https://chainlist.org/chain/5).
3. Mine at least 0.02 Goerli ETH from [Goerli Faucet](https://goerli-faucet.pk910.de/).

### Setup Frontend

To set up the frontend:

1. Complete the Metamask setup mentioned above.
2. Install dependencies using `npm install`.
3. Obtain an Infura API key.
4. Add the key to the appropriate file.
5. Run the script using `node ./frontend_and_backend/script.js` to test if everything is working properly.

### Deploy Contract to Goerli Testnet

To deploy a contract on the Goerli Testnet, follow the steps outlined in this [guide](https://vulehuan.com/en/blog/2023/05/deploy-your-blockchain-contract-on-remix-with-metamask-and-goerli-64680f9664ac40ae37cdf47a.html#gsc.tab=0). You may need between 0.1 and 0.5 GöETH for this process.
