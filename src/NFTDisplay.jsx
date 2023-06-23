import { List, ListItem, ListItemText, Divider, Collapse, Link } from '@mui/material';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import { useState } from 'react';

export function NFTDisplay({tokenOwner, nftMetadata, nftImage, mileage, tokenId, contractAddress}){

    const [attributesOpen, setAttributesOpen] = useState(false);
    const handleAttributesClick = () => {
        setAttributesOpen(!attributesOpen);
    }

    return(
        <div>
            {nftMetadata.name ?
            <>
                <h2>NFT</h2>
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
                        <ListItemText secondary="mileage" primary={mileage} />
                    </ListItem>
                    <ListItem button divider>
                        <Link href={`https://testnets.opensea.io/assets/goerli/${contractAddress}/${tokenId}`}>OpenSea</Link>
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
            </>
            : <div></div>}
        </div>
    )
}