import hre from "hardhat";
import { ethers } from "ethers";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const { LacchainProvider, LacchainSigner } = require("@lacchain/gas-model-provider");
const artifact = require("../artifacts/contracts/Storage.sol/Storage.json");


//RPC AND NODE ADDRESS FOR DEMO PROPOSES DURING THE HACKATON.
//FOR PRODUCTION USE YOUR OWN RPC AND NODE ADDRESS

const RPC_URL     =  "http://35.193.217.67";
const NODE_ADDR   =  "0xeeb69e2bffb267122d3ea9161bce16f94885244a";

//FOR DEMO PROPOSES WE CREATE A RANDOM WALLET YOU SHOULD USE A REAL ONE
//const PRIVATE_KEY = "0xYOURPRIVATEKEYHERE";

let randomWallet = ethers.Wallet.createRandom();
const PRIVATE_KEY = randomWallet.privateKey;

async function main() {
  console.log("Starting deploy of contract:", artifact.contractName);

  const expiration = Date.now() + 5 * 60 * 1000; // ahora + 5 min
  const provider = new LacchainProvider(RPC_URL);
  const signer   = new LacchainSigner(PRIVATE_KEY, provider, NODE_ADDR, expiration);

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);

  console.log("Attempting deployment using factory.deploy()...");
  
  try {

    const contract = await factory.deploy({ gasLimit: 3000000n, gasPrice: 0n });
    console.log("Deployment transaction sent, waiting for confirmation...");
    
    const deployedContract = await contract.waitForDeployment();
    const address = await deployedContract.getAddress();
    
    console.log("Contract deployed at:", address);
    return;
    
  } catch (error) {
    console.log('Factory.deploy() failed:', error.message);
  }
  

}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
