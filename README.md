# Carbon Hackathon - Smart Contract Project

A Hardhat-based smart contract project built for the Carbon Hackathon, featuring integration with LacChain blockchain network. This project demonstrates a simple storage contract with gas relay functionality using the LacChain Gas Model Provider.

## Project Overview

This project includes:

- **Storage Contract**: A simple smart contract that stores and retrieves uint256 values
- **Gas Relay Integration**: Uses BaseRelayRecipient for meta-transactions
- **LacChain Integration**: Configured for deployment on LacChain hackathon network
- **TypeScript Support**: Full TypeScript integration with Hardhat
- **Modern Hardhat 3 Beta**: Uses the latest Hardhat features

## Smart Contracts

### Storage.sol
A simple storage contract that:
- Stores a uint256 value
- Tracks the contract owner
- Emits events when values are set
- Inherits from BaseRelayRecipient for gas relay functionality

## Project Structure

```
my_project/
├── contracts/
│   ├── Storage.sol              # Main storage contract
│   └── BaseRelayRecipient.sol   # Gas relay base contract
├── scripts/
│   └── deployStorage.js        # LacChain deployment script
├── test/
│   └── Counter.ts              # Test files
├── ignition/
│   └── modules/
│       └── Counter.ts          # Ignition deployment modules
└── hardhat.config.ts           # Hardhat configuration
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Compile contracts:
```bash
npx hardhat compile
```

## Usage

### Running Tests

Run all tests:
```bash
npx hardhat test
```

Run specific test types:
```bash
npx hardhat test solidity
npx hardhat test mocha
```

### Deployment

#### Deploy to LacChain Hackathon Network

The project is pre-configured for the LacChain hackathon network. Use the custom deployment script:

```bash
node scripts/deployStorage.js
```

**Note**: The deployment script contains hardcoded values for the hackathon. In production, these should be environment variables.

#### Deploy using Ignition (Local/Testnet)

For local development:
```bash
npx hardhat ignition deploy ignition/modules/Counter.ts
```

For Sepolia testnet:
```bash
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```

## Network Configuration

The project supports multiple networks:

- **hardhatMainnet**: Local simulated L1 network
- **hardhatOp**: Local simulated Optimism network
- **lacnet**: LacChain hackathon network (http://35.193.217.67)

## Key Features

### LacChain Integration
- Uses `@lacchain/gas-model-provider` for gas-free transactions
- Configured with hackathon-specific node address
- Zero gas price transactions

### Gas Relay Functionality
- Contracts inherit from `BaseRelayRecipient`
- Uses `_msgSender()` instead of `msg.sender` for relay compatibility
- Supports meta-transactions

## Development

### Technology Stack
- **Hardhat 3 Beta**: Smart contract development framework
- **TypeScript**: Type-safe development
- **Ethers.js v6**: Ethereum library
- **Mocha & Chai**: Testing framework
- **LacChain Provider**: Blockchain interaction

### Security Considerations
⚠️ **Warning**: The deployment script contains a hardcoded private key for hackathon purposes. **Never use this in production**.

For production deployments:
1. Use environment variables for private keys
2. Use hardware wallets or secure key management
3. Audit all contracts before mainnet deployment

## Contributing

This is a hackathon project. Feel free to fork and experiment!

## License

ISC License
