import { NFTData } from './NFTData';
import React, { useEffect, useState } from 'react';
import { ContractData } from "./ContractData";
import { MileageManager } from "./MileageManager";
import { Button } from '@mui/material';

export function EthereumMain () {
    const [adminPageOn, setAdminPageOn] = useState(false);
    const [contractAddress, setContractAddress] = useState("");
    const [contractOwner, setContractOwner] = useState("");

    const[userAddress, setUserAddress] = useState("");

    useEffect(() => {
        if(window.ethereum){
            window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
                setUserAddress(res[0]);
            })
        }
    }, []);


    return (
        <div>
            <Button variant="contained" onClick={() => setAdminPageOn(!adminPageOn)}>Toggle Admin Page</Button>
            {window.ethereum ?
                <>
                    <p>MetaMask is installed!</p>
                    {userAddress ? <p>your address: {userAddress}</p> : <p>no address</p>}
                </>
            : <p>MetaMask is not installed!</p>}

            {adminPageOn ?
                <>
                    <h1>Admin Page</h1>
                    <ContractData owner = {contractOwner} setContractOwner={setContractOwner} address={contractAddress} setAddress={setContractAddress}/>

                    <NFTData address = {contractAddress}/>
                    <MileageManager address = {contractAddress}/>
                </>:
                <>
                    <h1>User Page</h1>
                </>
            }

            
            {/* <MintNFT address = {contractAddress}/> */}
        </div>
    )
}