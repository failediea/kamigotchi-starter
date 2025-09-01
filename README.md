# Kamigotchi Starter Guide

A sleek, modern onboarding guide for new Kamigotchi players. This React application provides a step-by-step walkthrough to get users from wallet setup to actively farming in the Kamigotchi ecosystem.

## Features

- **One-Click Network Addition**: Automatically adds Yominet network to MetaMask/Rabby wallets
- **Step-by-Step Guide**: 9 comprehensive steps from setup to gameplay
- **Modern UI**: Glassmorphism design with pixel-perfect animations
- **Web3 Integration**: Direct wallet interaction for network configuration
- **Mobile Responsive**: Works seamlessly across all device sizes
- **External Links**: Direct integration with bridges, marketplaces, and documentation

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/failediea/kamigotchi-starter.git
cd kamigotchi-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Network Configuration

The app is preconfigured for **Yominet** (Kamigotchi's Layer 2):

```javascript
const YOMINET_PARAMS = {
  chainId: "0x18623a6a54f3f", // 428962654539583
  chainName: "Yominet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://jsonrpc-yominet-1.anvil.asia-southeast.initia.xyz"],
  blockExplorerUrls: [],
};
```

## Key Components

### Steps Overview

1. **Network Setup** - Add Yominet to wallet
2. **Bridge ETH** - Transfer funds from mainnet/L2s
3. **Account Creation** - Connect wallet and fund operator
4. **NFT Acquisition** - Purchase Kamigotchi on Sudoswap
5. **Portal Entry** - Bridge NFT into game world
6. **Node Selection** - Choose farming location
7. **HP Management** - Avoid liquidation
8. **Character Progression** - Level up and specialize
9. **Gas Optimization** - Manage ongoing costs

### Technical Features

- **Wallet Integration**: EIP-3085 network addition
- **Responsive Grid**: CSS Grid with equal-height cards
- **Modern Animations**: Hover effects and smooth transitions  
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized with React best practices

## Customization

### Styling
The app uses Tailwind CSS with a custom dark theme:
- Primary: Fuchsia/Indigo gradients
- Background: Deep purple/black tones
- Accent: Emerald for CTAs

### Content
Update the `STEPS` array to modify guide content:

```javascript
const STEPS = [
  {
    title: "Step Title",
    desc: "Step description",
    tag: "Category",
    cta: { label: "Button Text", href: "https://link.com" },
    icon: "network", // matches KamiIcon mapping
  },
  // ... more steps
];
```

### Network Configuration
To change networks, update `YOMINET_PARAMS` with your desired chain parameters.

## Dependencies

### Core
- React 18+
- Lucide React (icons)
- @vercel/analytics

### Styling  
- Tailwind CSS
- Custom glassmorphism effects

### Web3
- Native `window.ethereum` integration
- EIP-3085 network addition support

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

*Web3 features require MetaMask or compatible wallet extension*

## Security Considerations

⚠️ **Important**: This guide connects to Yominet, a custom Layer 2 network. Users should:

- Only use funds they can afford to lose
- Verify network parameters independently
- Understand the risks of custom networks
- Keep backup access to funds on mainnet

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- [Kamigotchi Documentation](https://docs.kamigotchi.io)
- [Kamigotchi Discord](https://discord.gg/kamigotchi)
- [Sudoswap (Yominet)](https://sudoswap.xyz/#/browse/yominet)
- [Initia Bridge](https://bridge.initia.xyz)
- [Kamiculator](https://www.kamiculator.xyz/)

## License

MIT License - feel free to fork and customize for your community!

## Support

- **Issues**: Report bugs via GitHub Issues
- **Community**: Join the [Kamigotchi Discord](https://discord.gg/kamigotchi)
- **Documentation**: Visit [docs.kamigotchi.io](https://docs.kamigotchi.io)

---

*Made with ❤️ for the Kamigotchi community*
