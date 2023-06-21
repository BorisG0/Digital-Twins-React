import { ethers } from "ethers";
import { NFTData } from './NFTData';
import React, { useEffect, useState } from 'react';
import { ContractData } from "./ContractData";
import { MileageManager } from "./MileageManager";

export function EthereumMain () {
    const [contractAddress, setContractAddress] = useState("");
    const [contractOwner, setContractOwner] = useState("");

    const[userAddress, setUserAddress] = useState("");

    async function sendTx() {
        const receiver = "0x6DEB4642bfcA6FaE36c29Be66Ed4b32a7dAAb0a7";
        console.log("Sending Transaction");
        console.log("receiver: " + receiver);

        await window.ethereum.send("eth_requestAccounts");
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        try{
            ethers.utils.getAddress(receiver);
            const tx = await signer.sendTransaction({
                to: receiver,
                value: ethers.utils.parseEther("0.01")
            });
            console.log(tx);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(window.ethereum){
            window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
                setUserAddress(res[0]);
            })
        }
    }, [window.ethereum]);


    return (
        <div>
            {window.ethereum ?
                <>
                    <p>MetaMask is installed!</p>
                    {userAddress ? <p>your address: {userAddress}</p> : <p>no address</p>}
                </>
            : <p>MetaMask is not installed!</p>}

            <h1>Ethereum Transactions</h1>
            
            <ContractData owner = {contractOwner} setContractOwner={setContractOwner} address={contractAddress} setAddress={setContractAddress}/>

            <NFTData address = {contractAddress}/>
            <MileageManager address = {contractAddress}/>
            {/* <MintNFT address = {contractAddress}/> */}
        </div>
    )
}