import React, { useEffect, useState } from 'react';
import axios from 'axios';

const url = "https://gateway.pinata.cloud/ipfs/QmQ4HTumB95wAQRP1bBwGDVcYid1P1Y2VScRTXJBtLtJUy";
const url2 = "https://ipfs.io/ipfs/QmQ4HTumB95wAQRP1bBwGDVcYid1P1Y2VScRTXJBtLtJUy";
const url3 = "https://ipfs.io/ipfs/QmPxeEwnsGXesy9Rpv9qNnwqWJixhdwpVihL6uAiypDeuD";
const urlImage = "https://ipfs.io/ipfs/QmXyz5zehrN4fqwJcHhNjYenki6SFGbavwTPFGnHFfrf4c";
const testurl = "https://jsonplaceholder.typicode.com/todos/1";
const url4 = "https://ipfs.io/ipfs/QmWazDwQToJGBjsXwDCF2CT1SYK377bHvYC5SC69VEvSrW/1.json";

const apiURL = "https://gateway.pinata.cloud/ipfs/";

export function NFTData(tokenURI) {
    const [nftMetadata, setNftMetadata] = useState({});
    const [nftImage, setNftImage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYzJiN2ZlNS01ZjI0LTRiODEtOGZkMy1mMzk5NGFlOTk2NDYiLCJlbWFpbCI6Im1zcWVycWZhYnZvbWZ6bHZ6YkBiYml0cS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODRiZDkxMjgzMTViYmFhNzgzMmEiLCJzY29wZWRLZXlTZWNyZXQiOiI4ZDBiNDc2ZjFhMzUzNDYwMzBmNjcxZDMyNzY4ODdjNTkzNjljMzFmYzdkYjQ3NDc4ODBiZGMzZThjMzJkNGVjIiwiaWF0IjoxNjg2MDczNTk5fQ.wgDcDlfnayfz_1c9Q2_Vl0Pn_HeyM8MzJeSfA-2Fmi0'
          },
          params: {
            'hashContains': 'QmQ4HTumB95wAQRP1bBwGDVcYid1P1Y2VScRTXJBtLtJUy'
          }
        });

        if(!tokenURI.tokenURI) return;

        const tokenURISplit = tokenURI.tokenURI.split('/');
        
        let tokenHash = tokenURISplit[tokenURISplit.length - 1];
        if(tokenURISplit.length == 6){
            tokenHash = tokenURISplit[tokenURISplit.length - 2] + "/" + tokenHash;
        }

        const response2 = await axios.get(apiURL + tokenHash);
        setNftMetadata(response2.data);
        const imgUrlSplit = response2.data.image.split('/');
        const imgHash = imgUrlSplit[imgUrlSplit.length - 1];

        setNftImage(apiURL + imgHash);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [tokenURI]);



  return (
    <div>
      <h1>NFT Data</h1>
      <img src ={nftImage} alt="NFT" />
        <p>
            {nftMetadata.name} <br />
            {nftMetadata.description}
        </p>
    </div>
  );
}