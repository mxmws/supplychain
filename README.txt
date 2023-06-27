## Instructions

### Setup Metamask with Goerli Testnetwork

1. Add Metamask to your browser.
2. Add Goerli Testnetwork to Metamask:
   - Network name: Goerli
   - New RPC URL: https://ethereum-goerli.publicnode.com
   - Chain ID: 5
   - Currency symbol: ETH
   - If the RPC URL doesn't work, search for a new one [here](https://ethereum-goerli.publicnode.com).
3. Mine at least 0.02 Goerli ETH from [Goerli Faucet](https://goerli-faucet.pk910.de/).

### Deploy Contract to Goerli Testnet

To deploy a contract on the Goerli Testnet, follow the steps outlined in this [guide](https://vulehuan.com/en/blog/2023/05/deploy-your-blockchain-contract-on-remix-with-metamask-and-goerli-64680f9664ac40ae37cdf47a.html#gsc.tab=0). You may need between 0.1 and 0.5 GöETH for this process.

### Estimate Cost of Deploying a Smart Contract

Use the following resources to estimate the cost of deploying a smart contract:
- [Smart Contract Deployment Cost Calculator](https://www.rareskills.io/smart-contract-deployment-cost-calculator)
- [JavaInUse: Smart Contract Deployment Cost](https://www.javainuse.com/bytesize)

### Host a Node

*(Information on hosting a node is not provided.)*

### Setup Frontend

To set up the frontend:

1. Complete the Metamask setup mentioned above.
2. Install dependencies using `npm install`.
3. Obtain an Infura API key.
4. Add the key to the appropriate file.
5. Run the script using `node ./frontend/script.js` to test if everything is working properly.




REMIX DEFAULT WORKSPACE

Remix default workspace is present when:
i. Remix loads for the very first time 
ii. A new workspace is created with 'Default' template
iii. There are no files existing in the File Explorer

This workspace contains 3 directories:

1. 'contracts': Holds three contracts with increasing levels of complexity.
2. 'scripts': Contains four typescript files to deploy a contract. It is explained below.
3. 'tests': Contains one Solidity test file for 'Ballot' contract & one JS test file for 'Storage' contract.

SCRIPTS

The 'scripts' folder has four typescript files which help to deploy the 'Storage' contract using 'web3.js' and 'ethers.js' libraries.

For the deployment of any other contract, just update the contract's name from 'Storage' to the desired contract and provide constructor arguments accordingly 
in the file `deploy_with_ethers.ts` or  `deploy_with_web3.ts`

In the 'tests' folder there is a script containing Mocha-Chai unit tests for 'Storage' contract.

To run a script, right click on file name in the file explorer and click 'Run'. Remember, Solidity file must already be compiled.
Output from script will appear in remix terminal.

Please note, require/import is supported in a limited manner for Remix supported modules.
For now, modules supported by Remix are ethers, web3, swarmgw, chai, multihashes, remix and hardhat only for hardhat.ethers object/plugin.
For unsupported modules, an error like this will be thrown: '<module_name> module require is not supported by Remix IDE' will be shown.
