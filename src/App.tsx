import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

// @ts-ignore
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [provider, setprovider] = React.useState<providers.Web3Provider>();

  async function connect() {
    if (!process.env.REACT_APP_INFURA_ID) {
      throw new Error("Missing Infura Id");
    }
    const web3Provider = new WalletConnectProvider({
      infuraId: process.env.REACT_APP_INFURA_ID,
    });

    await web3Provider.enable();

    const provider = new providers.Web3Provider(web3Provider);

    setprovider(provider);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{provider ? "Connected!" : "Not connected"}</div>
        <div onClick={connect}>Connect</div>
      </header>
    </div>
  );
}

export default App;
