import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UALProvider } from 'ual-reactjs-renderer'
import { Anchor } from 'ual-anchor'
import { Lynx } from 'ual-lynx'
import { TokenPocket } from 'ual-token-pocket'
import { Wombat } from 'ual-wombat'
import { EOSIOAuth } from 'ual-eosio-reference-authenticator'
import { Metamask } from 'ual-metamask'
import { Wax } from "@alienworlds/ual-wax";


const endpointlist = ["https://api.waxsweden.org","https://wax.eosdac.io", "https://wax.pink.qq", "https://api.wax.bountyblok.io", "https://chain.wax.io"]
let endpoint;


const appName = "EOSETF";

const chain = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "eos.greymass.com",
      //https://dsp.maltablock.org
      //host: "dsp.airdropsdac.com", https://node2.blockstartdsp.com"dsp.eosphere.io",https://dsp.eosdetroit.io,https://node1.eosdsp.com
      port: "",
    },
  ],
};

const anchor = new Anchor([chain], {
  appName,
});
const wax = new Wax([chain]);

const lynx = new Lynx([chain])
const tokenPocket = new TokenPocket([chain])
const wombat = new Wombat([chain], { appName: 'EOSETF' })
const eosioAuth = new EOSIOAuth([chain], { appName, protocol: 'eosio' })
const metamask = new Metamask([chain])


const supportedChains = [chain];
const supportedAuthenticators = [wax, anchor];



const routing = (
  <UALProvider
      chains={supportedChains}
      authenticators={supportedAuthenticators}
      appName={appName}
    >
      <App />
    </UALProvider>
);

if(localStorage.getItem("endpoint") === null){
  for(let item in endpointlist){
    try{
      fetch(`${endpointlist[item]}/v1/chain/get_table_rows`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "pollpollpoll",
          table: "divperiod",
          scope: "pollpollpoll",
          limit: 1,
        }),
      }).then((res) => {
          if(res.ok){
            localStorage.setItem("endpoint", endpointlist[item])
            endpoint = endpointlist[item]
            console.log("Endpoint works for you:" + endpointlist[item])
            ReactDOM.render(routing, document.getElementById("root"));
          }
          else{
            console.log("Endpoint does not work for you:" + endpointlist[item])
          }
        }).catch(error => {
          console.log("Endpoint seems to be down:"+endpointlist[item])
      })
      }catch(error){
        console.log("Endpoint seems to be down:"+endpointlist[item])
      }
  }
  }
  else{
    ReactDOM.render(routing, document.getElementById("root"));
  }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
