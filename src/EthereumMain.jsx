import { ethers } from "ethers";

export function EthereumMain () {
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

    return (
        <div>
            {window.ethereum ? <p>MetaMask is installed!</p> : <p>MetaMask is not installed!</p>}

            <h1>Ethereum Main</h1>
            
            <button onClick={sendTx}>Send Transaction</button>
        </div>
    )
}