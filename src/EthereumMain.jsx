import { ethers } from "ethers";
import { NFTData } from './NFTData';
import React, { useEffect, useState } from 'react';

export function EthereumMain () {
    const [contractAddress, setContractAddress] = useState("");
    const [tokenId, setTokenId] = useState("");

    const[ tokenURI, setTokenURI ] = useState(null);

    async function sendTx() {
        const receiver = "0x6DEB4642bfcA6FaE36c29Be66Ed4b32a7dAAb0a7";
        console.log("Sending Transaction");
        console.log("receiver: " + receiver);

        await window.ethereum.send("eth_requestAccounts");
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        try{
            ethers.utils.getAddress(receiver);
            const tx = await signer.sendTransaction({
                to: receiver,
                value: ethers.utils.parseEther("0.01")
            });
            console.log(tx);
        } catch (err) {
            console.log(err);
        }
    }

    async function callContract() {
        console.log(contractAddress);
        console.log(tokenId);

        const address = "0x36373d2e0A8dBbBd96980Df1026F1B124bCd7878";
        const abi = require("./abi/SneakerToken.json");

        try{
            await window.ethereum.send("eth_requestAccounts");
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);
            const uri = await contract.tokenURI(tokenId);

            setTokenURI(uri);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            {window.ethereum ? <p>MetaMask is installed!</p> : <p>MetaMask is not installed!</p>}

            <h1>Ethereum Transactions</h1>
            
            <button onClick={sendTx}>Send Transaction</button>
            <p></p>
            <input type="text" id="contractAddress" placeholder="Contract Address" value={contractAddress} onChange={e => setContractAddress(e.target.value)}/>
            <input type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>
            <button onClick={callContract}>Call Contract</button>

            <NFTData tokenURI = {tokenURI}/>

        </div>
    )
}