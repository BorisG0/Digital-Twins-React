import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider, Collapse } from '@mui/material';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { ethers } from "ethers";

const apiURL = "https://gateway.pinata.cloud/ipfs/";

export function NFTData(props) {
    const [tokenId, setTokenId] = useState("");
    const [tokenURI, setTokenURI] = useState(null);
    const [tokenOwner, setTokenOwner] = useState();

    const [nftMetadata, setNftMetadata] = useState({});
    const [nftImage, setNftImage] = useState();

    const [serialNumber, setSerialNumber] = useState("");
    const [manufactureDate, setManufactureDate] = useState("");
    const [type, setType] = useState("");
    const [mileage, setMileage] = useState("");

    const [attributesOpen, setAttributesOpen] = useState(false);
    const handleAttributesClick = () => {
        setAttributesOpen(!attributesOpen);
    }

    async function getNFTData() {
        const abi = require("./abi/BikeTwins.json");

        try{
            await window.ethereum.send("eth_requestAccounts");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(props.address, abi, provider);
            const uri = await contract.tokenURI(tokenId);
            const owner = await contract.ownerOf(tokenId);

            setTokenURI(uri);
            setTokenOwner(owner);

            try{
                const serialNumber = await contract.serialNumber(tokenId);
                const manufactureDate = await contract.manufactureDate(tokenId);
                const type = await contract.typeOf(tokenId);

                setSerialNumber(parseInt(serialNumber._hex.substring(2), 16));
                setManufactureDate(parseInt(manufactureDate._hex.substring(2), 16));
                setType(parseInt(type._hex.substring(2), 16));
            }catch(err){
                setSerialNumber("");
                setManufactureDate("");
                setType("");
            }

            try{
                const mileage = await contract.mileageOf(tokenId);
                setMileage(parseInt(mileage._hex.substring(2), 16));
            }catch(err){
                setMileage("");
            }

            
        }catch(err){
            console.log(err);
        }
    }

    async function getNFTDataERC1155() {
        const abi = require("./abi/MyBikes.json");

        try{
            await window.ethereum.send("eth_requestAccounts");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(props.address, abi, provider);
            let uri = await contract.uri(tokenId);

            const hex = (+tokenId).toString(16);
            const padded = hex.padStart(64, '0');
            
            uri = uri.replace("{id}", padded);

            setTokenURI(uri);
            

            try{
                const serialNumber = await contract.mileages(tokenId);
                setSerialNumber(parseInt(serialNumber._hex.substring(2), 16));

            }catch(err){
                setSerialNumber("");
                console.log(err);
            }

            
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!tokenURI) return;

                const tokenURISplit = tokenURI.split('/');
                
                let tokenHash = tokenURISplit[tokenURISplit.length - 1];
                if(tokenHash.length != 46){
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

    if(!props.address) return (<div></div>);

  return (
    <div id="nftMetadataDisplay">
      <h1>Display NFT</h1>

        <TextField type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>
        <br/>
        <Button variant="contained" onClick={getNFTData}>Get NFT Data (ERC721)</Button>
        <br/>
        <Button variant="contained" onClick={getNFTDataERC1155}>Get NFT Data (ERC1155)</Button>

        <List id="nftMetadataList">
            <ListItem button>
                <ListItemText secondary="owner" primary={tokenOwner} />
            </ListItem>
            <Divider/>
            <ListItem button divider>
                <ListItemText secondary="name" primary={nftMetadata.name} />
            </ListItem>
            <ListItem button divider>
                <ListItemText secondary="description" primary={nftMetadata.description} />
            </ListItem>
            <ListItem button divider>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <img src ={nftImage} alt="NFT" id='nftImage'/>
                    <ListItemText secondary="image"/>
                </div>
            </ListItem>
            <ListItem button onClick={handleAttributesClick}>
                <ListItemText primary="attributes"/>
                {attributesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={attributesOpen}>
                {nftMetadata.attributes?
                <List>
                    {nftMetadata.attributes.map((a, index)=> (
                        <ListItem button divider key={index} sx={{ pl: 4}}>
                            <ListItemText primary={a.value} secondary={a.trait_type}/>
                        </ListItem>
                    ))}
                </List>
                : <div></div>}
            </Collapse>
        </List>

        serial number: {serialNumber}
        <br/>
        manufacture date: {manufactureDate}
        <br/>
        type: {type}
        <br/>
        mileage: {mileage}
    </div>
  );
}