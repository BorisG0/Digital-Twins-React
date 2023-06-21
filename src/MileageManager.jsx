import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ethers } from "ethers";

export function MileageManager(props){

    const [tokenId, setTokenId] = useState("");
    const [amount, setAmount] = useState("");

    async function mintNFT() {
        console.log("Calling Contract");
        console.log(props.address);
        console.log(tokenId);

        const abi = require("./abi/BikeTwins.json");

        try{
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(props.address, abi, signer);

            await contract.increaseMileage(tokenId, amount);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <h1>Increase Mileage</h1>
            <TextField type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>
            <TextField type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)}/>

            <br/>
            <Button variant="contained" onClick={mintNFT}>Mint</Button>
        </>
        
    )
}