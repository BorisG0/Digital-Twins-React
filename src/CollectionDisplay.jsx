import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

export function CollectionDisplay () {
    const abi = require("./abi/BikeTwins.json");
    const contractAddress = "0x93dC6b4Fd36d9dd43De5e634C7D944c5222144fC";

    const [userAddress, setUserAddress] = useState("");
    const [userBalance, setUserBalance] = useState(0);
    const [userNFTs, setUserNFTs] = useState([]);

    async function getBalanceOf() {
        try{
            await window.ethereum.send("eth_requestAccounts");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);

            const balance = await contract.balanceOf(userAddress);
            setUserBalance(parseInt(balance._hex.substring(2), 16));

            let NFTs = [];

            for(let i = 0 ; i < 15; i++){
                try{
                    const owner = await contract.ownerOf(i);
                    console.log(i, owner);
                    if(owner.toLowerCase() === userAddress.toLowerCase()){
                        console.log("setting nft")
                        NFTs.push(i);
                    }
                }catch(err){
                    console.log(i, "no owner");
                }
            }

            setUserNFTs(NFTs);
            
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <h2>Collection Display</h2>
            <TextField type="text" placeholder="user address" value={userAddress} onChange={e => setUserAddress(e.target.value)}/>
            <br/>
            <Button variant="contained" onClick={getBalanceOf}>get balance</Button>
            <p>Balance: {userBalance}</p>
            <p>NFTs: {userNFTs.map((nft, index) => <span key={index}>{nft} </span>)}</p>
        </div>
    )
}