import { ethers } from "ethers";
import { NFTData } from './NFTData';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { MintNFT } from "./MintNFT";

export function EthereumMain () {
    const [contractAddress, setContractAddress] = useState("");
    const [tokenId, setTokenId] = useState("");

    const[ tokenURI, setTokenURI ] = useState(null);
    const[ tokenOwner, setTokenOwner ] = useState();

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
        console.log("Calling Contract");
        console.log(contractAddress);
        console.log(tokenId);

        const abi = require("./abi/SneakerToken.json");

        try{
            await window.ethereum.send("eth_requestAccounts");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);
            const uri = await contract.tokenURI(tokenId);
            const owner = await contract.ownerOf(tokenId);

            setTokenURI(uri);
            setTokenOwner(owner);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            {window.ethereum ? <p>MetaMask is installed!</p> : <p>MetaMask is not installed!</p>}

            <h1>Ethereum Transactions</h1>
            
            <Button variant="contained" onClick={sendTx}>Send Transaction</Button>
            <p></p>
            <TextField type="text" id="contractAddress" placeholder="Contract Address" value={contractAddress} onChange={e => setContractAddress(e.target.value)}/>
            <TextField type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>
            <br/>
            <Button variant="contained" onClick={callContract}>Get NFT Data</Button>

            <NFTData tokenURI = {tokenURI} tokenOwner = {tokenOwner}/>

            <MintNFT/>
        </div>
    )
}