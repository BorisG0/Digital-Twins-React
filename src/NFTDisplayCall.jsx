import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NFTDisplay} from './NFTDisplay';

export function NFTDisplayCall({tokenId, address}) {
    const apiURL = "https://gateway.pinata.cloud/ipfs/";

    const [tokenURI, setTokenURI] = useState(null);

    const [nftMetadata, setNftMetadata] = useState({});
    const [nftImage, setNftImage] = useState();

    const [mileage, setMileage] = useState("");

    const [tokenOwner, setTokenOwner] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const abi = require("./abi/BikeTwins.json");

            try{
                await window.ethereum.send("eth_requestAccounts");

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(address, abi, provider);
                const uri = await contract.tokenURI(tokenId);
                const owner = await contract.ownerOf(tokenId);

                setTokenURI(uri);
                setTokenOwner(owner);

                try{
                    const mileage = await contract.mileageOf(tokenId);
                    setMileage(parseInt(mileage._hex.substring(2), 16));
                }catch(err){
                    setMileage("");
                }

            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [tokenId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!tokenURI) return;

                const tokenURISplit = tokenURI.split('/');
                
                let tokenHash = tokenURISplit[tokenURISplit.length - 1];
                if(tokenHash.length !== 46){
                    tokenHash = tokenURISplit[tokenURISplit.length - 2] + "/" + tokenHash;
                }

                const response = await axios.get(apiURL + tokenHash);
                setNftMetadata(response.data);
                const imgUrlSplit = response.data.image.split('/');
                const imgHash = imgUrlSplit[imgUrlSplit.length - 1];

                setNftImage(apiURL + imgHash);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [tokenURI]);


    return(
        <div>
            <NFTDisplay tokenOwner={tokenOwner} nftMetadata={nftMetadata} nftImage={nftImage} mileage={mileage}/>
        </div>
    )
}