import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { NFTDisplayCall } from './NFTDisplayCall';

export function NFTData(props) {
    const [tokenId, setTokenId] = useState("");

    if(!props.address) return (<div></div>);

  return (
    <div id="nftMetadataDisplay">
      <h2>Display NFT</h2>

        <TextField type="number" id="tokenId" placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)}/>

        {tokenId ? <NFTDisplayCall tokenId={tokenId} address={props.address}/> : <div></div>}
    </div>
  );
}