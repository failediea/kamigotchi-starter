import React, { useState } from "react";
import {
  Network,
  Link,
  User,
  CreditCard,
  DoorOpen,
  DollarSign,
  Shield,
  ArrowUp,
  Fuel,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

// === Network config (EIP-3085) ===
const YOMINET_PARAMS = {
  chainId: "0x18623a6a54f3f", // 428962654539583 (hex)
  chainName: "Yominet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://jsonrpc-yominet-1.anvil.asia-southeast.initia.xyz"],
  blockExplorerUrls: [],
};
const YOMI_CHAIN_ID_DEC = "428962654539583"; // decimal (for display/copy)

// === Steps ===
const STEPS = [
  {
    title: "1. Add the Yominet Network",
    desc:
      "Use the one-click button below to add it via MetaMask/Rabby.OR copy the RPC and Chain ID",
    tag: "Network",
    cta: { label: "Add via MetaMask", href: null, action: "add-network" },
    icon: "network",
  },
  {
    title: "2. Bridge ETH to Yominet",
    desc:
      "Bridge a few dollars of ETH from Ethereum, Base, or Arbitrum using Initia Bridge or gas.zip. Keep ~$5–10 for gas to start.",
    tag: "Bridge",
    cta: { label: "Open Initia Bridge", href: "https://bridge.initia.xyz" },
    icon: "bridge",
  },
  {
    title: "3. Create Your Account",
    desc:
      "Go to the Kamigotchi site. Connect your owner wallet (MetaMask/Rabby) Then fund your Operator wallet with ETH.",
    tag: "Account",
    cta: { label: "Open Kamigotchi App", href: "https://app.kamigotchi.io" },
    icon: "user",
  },
  {
    title: "4. Acquire a Kamigotchi",
    desc:
      "Buy on Sudoswap (~0.03 ETH floor).",
    tag: "NFT",
    cta: { label: "Sudoswap (Yominet)", href: "https://sudoswap.xyz/#/browse/yominet/buy/0x5d4376b62fa8ac16dfabe6a9861e11c33a48c677" },
    icon: "card",
  },
  {
    title: "5. Enter via Scrap Confluence",
    desc:
      "Use the Kami Portal to register/bridge your NFT into the game world. You can portal out later to trade.",
    tag: "Portal",
    cta: { label: "Short Video about Portals", href: "https://x.com/kamigotchiworld/status/1961128794133008688" },
    icon: "portal",
  },
  {
    title: "6. Select a Farming Node",
    desc:
      "Farm MUSU in Normal/Scrap/Eerie/Insect rooms. Matching your Type is faster (but drains more HP).",
    tag: "Farming",
    cta: { label: "Room & Traits Guide", href: "https://docs.kamigotchi.io/game/harvesting" },
    icon: "grain", // mapped to DollarSign icon
  },
  {
    title: "7. Manage HP & Predators",
    desc:
      "Stay above the liquidation threshold. Rest, feed, and watch the enemy list. Use Kamiculator below",
    tag: "Safety",
    cta: { label: "Open kamicalculator", href: "https://www.kamiculator.xyz/" },
    icon: "shield",
  },
  {
    title: "8. Level Up & Specialize",
    desc:
      "Earn XP → spend Skill Points: Harvester, Guardian, Predator, Enlightened. Respecing is expensive; be careful with spending talents.",
    tag: "Progression",
    cta: { label: "Skill Trees", href: "https://docs.kamigotchi.io/game/kamigotchi/levels-and-skills" },
    icon: "arrow",
  },
  {
    title: "9. Gas & Ongoing Management",
    desc:
      "Every action costs ETH. Keep Owner & Operator funded. Adjust MetaMask gas: set 0.005 gwei and gas limit 172155 (see this guide).",
    tag: "Upkeep",
    cta: { label: "Gas Settings Guide", href: "https://docs.kamigotchi.io/~gitbook/image?url=https%3A%2F%2F3718080700-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F5hdwSNG802PdUg6Mv8lN%252Fuploads%252F9bqta9LVoIpt2h7rN6pK%252Fgas%2520limit%2520tutorial.png%3Falt%3Dmedia%26token%3D873cd0d4-cac7-497f-bf9a-c53ea7f0044c&width=768&dpr=1&quality=100&sign=930b15bb&sv=2" },
    icon: "gas",
  },
];

// === Background ===
function PixelBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="transparent" />
            <rect x="0" y="0" width="1" height="24" fill="#26223a" />
            <rect x="0" y="0" width="24" height="1" fill="#26223a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30 bg-fuchsia-500" />
      <div className="absolute top-1/3 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 bg-indigo-500" />
      <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20 bg-emerald-500" />
    </div>
  );
}

// === Icons via lucide-react ===
function KamiIcon({ kind }) {
  const base = "w-10 h-10";
  const color = "text-emerald-300";
  const cls = `${base} ${color}`;

  const map = {
    network: <Network className={cls} />,
    bridge: <Link className={cls} />,
    user: <User className={cls} />,
    card: <CreditCard className={cls} />,
    portal: <DoorOpen className={cls} />,
    grain: <DollarSign className={cls} />, // money icon for Farming
    shield: <Shield className={cls} />,
    arrow: <ArrowUp className={cls} />,
    gas: <Fuel className={cls} />,
  };

  return map[kind] || <User className={cls} />;
}

// === Step Card ===
function PixelCard({ step }) {
  const [copied, setCopied] = useState(false);

  async function copyInline() {
    try {
      const text = `RPC: ${YOMINET_PARAMS.rpcUrls[0]} | Chain ID: ${YOMI_CHAIN_ID_DEC}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Clipboard copy failed", err);
      alert("Could not copy to clipboard.");
    }
  }

  const handleClick = async (e) => {
    if (step?.cta?.action === "add-network") {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [YOMINET_PARAMS],
          });
        } catch (err) {
          console.error("wallet_addEthereumChain error", err);
          alert(`Error adding network: ${err.message || err}`);
        }
      } else {
        alert("No Web3 wallet detected. Please install MetaMask or another compatible wallet.");
      }
    }
  };

  return (
    // make the outermost wrapper fill the grid cell
    <div className="relative group h-full">
      <div className="absolute inset-0 rounded-2xl shadow-[0_0_0_2px_#2c2b40,6px_6px_0_0_#171625] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-transform" />
      {/* inner card fills height */}
      <div className="relative h-full rounded-2xl bg-[#151226]/80 backdrop-blur-sm border border-[#2c2b40] p-5 md:p-6 flex items-start gap-4">
        <div className="shrink-0 w-16 h-16 rounded-xl bg-[#0e0b1b] border border-[#2c2b40] grid place-items-center">
          <KamiIcon kind={step.icon} />
        </div>

        {/* content grows to use remaining height if needed */}
        <div className="flex-1 flex flex-col">
          <div className="text-xs uppercase tracking-widest text-fuchsia-300/80 mb-1">{step.tag}</div>
          <h3 className="text-lg md:text-xl font-extrabold text-white">{step.title}</h3>
          <p className="mt-2 text-sm md:text-base text-violet-100/80 leading-relaxed">{step.desc}</p>

          {step.cta && (
            <>
              <a
                href={step.cta.href || "#"}
                onClick={handleClick}
                className="inline-flex items-center mt-3 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                target={step.cta.href ? "_blank" : undefined}
                rel={step.cta.href ? "noreferrer" : undefined}
              >
                {step.cta.label}
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>

              {step?.cta?.action === "add-network" && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] relative">
                  <code className="px-2 py-1 rounded bg-[#1a1630] border border-[#2c2b40] text-violet-100/90">
                    RPC: {YOMINET_PARAMS.rpcUrls[0]}
                  </code>
                  <code className="px-2 py-1 rounded bg-[#1a1630] border border-[#2c2b40] text-violet-100/90">
                    Chain ID: {YOMI_CHAIN_ID_DEC}
                  </code>
                  <button
                    onClick={copyInline}
                    className="px-2 py-1 rounded bg-[#0f0c1f] border border-[#2c2b40] text-emerald-300 hover:text-emerald-200"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  {copied && (
                    <span className="absolute -bottom-5 left-0 text-emerald-300 text-xs">Copied!</span>
                  )}
                </div>
              )}
            </>
          )}

          {/* spacer keeps CTAs near top but allows uniform height */}
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}

// === Page ===
export default function App() {
  return (
    <div className="min-h-screen relative bg-[#0a0814] text-white">
      <PixelBackground />

      <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-600" />
          <span className="font-black tracking-tight text-xl">Kamigotchi Starter</span>
        </div>
        <nav className="hidden md:flex gap-4 text-sm text-violet-200/80">
          <a href="#steps" className="hover:text-white">Steps</a>
          <a href="https://docs.kamigotchi.io" className="hover:text-white" target="_blank" rel="noreferrer">Docs</a>
          <a href="https://discord.gg/kamigotchi" className="hover:text-white" target="_blank" rel="noreferrer">Discord</a>
        </nav>
        <a
          href="https://app.kamigotchi.io"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 font-bold shadow-[0_0_0_2px_#2c2b40,6px_6px_0_0_#171625] hover:scale-[1.02] transition"
        >
          Play Now
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-4 md:pt-8 pb-8 md:pb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Survive. Farm. <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-300">EARN</span>
            </h1>
            <p className="mt-4 text-violet-100/80 text-lg">
              A quickstart for onboarding crypto-native players to Kamigotchi. Follow 9 easy steps to get from wallet to MUSU.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#steps" className="px-4 py-2 rounded-lg border border-[#2c2b40] bg-[#120f20]/60 hover:bg-[#1a1630]">View Steps</a>
              <a href="https://sudoswap.xyz" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-[#2c2b40] bg-[#120f20]/60 hover:bg-[#1a1630]">Buy a Kami</a>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        {/* items-stretch makes grid rows equal height; each PixelCard has h-full */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {STEPS.map((s, i) => (
            <PixelCard key={i} step={s} />
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#2c2b40] bg-[#0a0814]/80">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:justify-between gap-4 text-violet-200/70 text-sm">
          <div>
            © {new Date().getFullYear()} Kamigotchi Community Guide • Made with ❤ for new players
          </div>
          <div className="flex gap-4">
            <a href="https://docs.kamigotchi.io" target="_blank" rel="noreferrer" className="hover:text-white">Docs</a>
            <a href="https://discord.gg/kamigotchi" target="_blank" rel="noreferrer" className="hover:text-white">Discord</a>
            <a href="https://github.com/Asphodel-OS/kamigotchi" target="_blank" rel="noreferrer" className="hover:text-white">Game Code</a>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
