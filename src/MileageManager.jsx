import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

import { ethers } from "ethers";

export function MileageManager(props){
    const abi = require("./abi/BikeTwins.json");

    const [tokenId, setTokenId] = useState("");
    const [amount, setAmount] = useState("");

    const [receiver, setReceiver] = useState("");

    async function increaseMileage() {
        try{
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(props.address, abi, signer);

            await contract.increaseMileage(tokenId, amount);
        }catch(err){
            console.log(err);
        }
    }
    
    async function mintBike() {
        try{
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(props.address, abi, signer);

            await contract.safeMint(receiver, tokenId);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <h2>Bike Manager</h2>
            <h3>Increase Mileage</h3>
            <TextField type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>
            <TextField type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)}/>

            <br/>
            <Button variant="contained" onClick={increaseMileage}>Increase</Button>

            <h3>Mint new Bike</h3>
            <TextField type="text" id="receiver" placeholder="Receiver" value={receiver} onChange={e => setReceiver(e.target.value)}/>
            <TextField type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>
            <br/>
            <Button variant="contained" onClick={mintBike}>Mint</Button>
        </>
        
    )
}