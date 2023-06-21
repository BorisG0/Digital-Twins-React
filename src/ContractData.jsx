import { Button, TextField } from '@mui/material';
import { ethers } from "ethers";

export function ContractData(props){

    async function getContractData(){
        const abi = require("./abi/SneakerToken2.json");

        try{
            await window.ethereum.send("eth_requestAccounts");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(props.address, abi, provider);

            const owner = await contract.owner();
            props.setContractOwner(owner);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <h2>Contract Data</h2>
            <TextField type="text" id="contractAddress" placeholder="Contract Address" value={props.address} onChange={e => props.setAddress(e.target.value)}/>
            <Button variant="contained" onClick={getContractData}>get info</Button>
            <p>Owner: {props.owner}</p>
        </>
        
    )
}