import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, utils } from "ethers";

// @ts-ignore
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [address, setAccounts] = React.useState<string>("");
  const [provider, setProvider] = React.useState<providers.Web3Provider>();

  async function connect() {
    if (!process.env.REACT_APP_INFURA_ID) {
      throw new Error("Missing Infura Id");
    }
    const web3Provider = new WalletConnectProvider({
      infuraId: process.env.REACT_APP_INFURA_ID,
    });

    const accounts = (await web3Provider.enable()) as string[];

    setAccounts(accounts[0]);

    const provider = new providers.Web3Provider(web3Provider);

    const msg = `Authenticate ${accounts[0]}`;

    const sig = await provider.send("personal_sign", [msg, accounts[0]]);

    console.log("Signature", sig);

    const signer = await utils.verifyMessage(msg, sig);

    console.log("isValid", signer === accounts[0]);

    setProvider(provider);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{provider ? "Connected!" : "Not connected"}</div>
        {!address ? <div onClick={connect}>Connect</div> : <div>{address}</div>}
      </header>
    </div>
  );
}

export default App;
