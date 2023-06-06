import { ethers } from "ethers";
import { useEffect, useState } from "react";

export function EthereumMain () {

    const imageUrl = "https://www.shutterstock.com/image-photo/bunch-bananas-isolated-on-white-260nw-1722111529.jpg";
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImg(objectURL);
    }

    useEffect(() => {
        fetchImage();
    }, [])


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

    async function callContract() {
        const address = "0x36373d2e0A8dBbBd96980Df1026F1B124bCd7878";
        const abi = require("./abi/SneakerToken.json");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(address, abi, provider);
        const owner = await contract.tokenURI(1);
        console.log(owner);
    }

    return (
        <div>
            {window.ethereum ? <p>MetaMask is installed!</p> : <p>MetaMask is not installed!</p>}

            <h1>Ethereum Transactions</h1>
            
            <button onClick={sendTx}>Send Transaction</button>
            <br />
            <button onClick={callContract}>Call Contract</button>

            <br />
            <img src={img} />
        </div>
    )
}