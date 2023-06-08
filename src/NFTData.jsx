import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider, Collapse } from '@mui/material';
import {ExpandLess, ExpandMore} from '@mui/icons-material';

const apiURL = "https://gateway.pinata.cloud/ipfs/";

export function NFTData(props) {
    const [nftMetadata, setNftMetadata] = useState({});
    const [nftImage, setNftImage] = useState();

    const [attributesOpen, setAttributesOpen] = useState(false);
    const handleAttributesClick = () => {
        setAttributesOpen(!attributesOpen);
    }

    useEffect(() => {
        const fetchData = async () => {
        try {
            if(!props.tokenURI) return;

            const tokenURISplit = props.tokenURI.split('/');
            
            let tokenHash = tokenURISplit[tokenURISplit.length - 1];
            if(tokenURISplit.length == 6){
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
    }, [props]);

    if(!props.tokenURI) return (<div></div>);

  return (
    <div id="nftMetadataDisplay">
      <h1>NFT Data</h1>

        <List id="nftMetadataList">
            <ListItem button>
                <ListItemText secondary="owner" primary={props.tokenOwner} />
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
    </div>
  );
}