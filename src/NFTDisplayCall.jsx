import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';

export function NFTDisplayCall({tokenId, address}) {
    const [tokenURI, setTokenURI] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const abi = require("./abi/BikeTwins.json");

            try{
                await window.ethereum.send("eth_requestAccounts");

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(address, abi, provider);
                const uri = await contract.tokenURI(tokenId);

                setTokenURI(uri);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [tokenId]);


    return(
        <div>
            <h2>NFT</h2>
            <p>tokenId: {tokenId} address: {address}</p>
            <p>tokenURI: {tokenURI}</p>
        </div>
    )
}