import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>NFT Data</h1>
      <img src ={nftImage} alt="NFT" />
        <p>
            {nftMetadata.name} <br />
            {nftMetadata.description} <br />
            {props.tokenOwner} <br />

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