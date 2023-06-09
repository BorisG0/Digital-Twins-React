import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ethers } from "ethers";

export function MintNFT(props){

    const [receiver, setReceiver] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [manufactureDate, setManufactureDate] = useState("");
    const [type, setType] = useState("");

    async function mintNFT() {
        console.log("Calling Contract");
        console.log(props.address);
        console.log(tokenId);

        const abi = require("./abi/SneakerToken2.json");

        try{
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const walletAddress = accounts[0];
            const signer = provider.getSigner(walletAddress)

            const contract = new ethers.Contract(props.address, abi, signer);

            await contract.safeMintData(receiver, tokenId, tokenURI, serialNumber, manufactureDate, type);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <h1>Mint Sneaker NFT</h1>
            <TextField type="text" id="receiver" placeholder="Receiver" value={receiver} onChange={e => setReceiver(e.target.value)}/>
            <TextField type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>
            <TextField type="text" id="tokenURI" placeholder="Token URI" value={tokenURI} onChange={e => setTokenURI(e.target.value)}/>
            <TextField type="number" id="serialNumber" placeholder="Serial Number" value={serialNumber} onChange={e => setSerialNumber(e.target.value)}/>
            <TextField type="text" id="manufactureDate" placeholder="Manufacture Date" value={manufactureDate} onChange={e => setManufactureDate(e.target.value)}/>
            <TextField type="text" id="type" placeholder="Type" value={type} onChange={e => setType(e.target.value)}/>

            <br/>
            <Button variant="contained" onClick={mintNFT}>Mint</Button>
        </>
        
    )
}