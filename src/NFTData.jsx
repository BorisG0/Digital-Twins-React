import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const apiURL = "https://gateway.pinata.cloud/ipfs/";

export function NFTData(props) {
    const [nftMetadata, setNftMetadata] = useState({});
    const [nftImage, setNftImage] = useState();

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
      <img src ={nftImage} alt="NFT" id="nftImage" />

        <List id="nftMetadataList">
            <ListItem button>
                <ListItemText secondary="owner" primary={props.tokenOwner} />
            </ListItem>
            <Divider/>
            <ListItem button divider>
                <ListItemText secondary="name" primary={nftMetadata.name} />
            </ListItem>
            <ListItem button>
                <ListItemText secondary="description" primary={nftMetadata.description} />
            </ListItem>
        </List>

        <p>
            
            owner: {props.tokenOwner} <br />
            name: {nftMetadata.name} <br />
            description: {nftMetadata.description} <br />

            attributes: <br />
            {nftMetadata.name ? 
                <>
                    {nftMetadata.attributes.map((a, index)=> (
                        <span key={index}>
                            <>
                                {a.trait_type}: {a.value}
                            </>
                            <br />
                        </span>
                    ))}
                </>
             : null}

        </p>
    </div>
  );
}