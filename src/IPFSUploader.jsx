import axios from 'axios';
import { Button } from '@mui/material';

export function IPFSUploader () {
    const auth = process.env.REACT_APP_PINATA_AUTH;
    
    const testApiConnection = async () => {
        try {
          const response = await axios.get('https://api.pinata.cloud/data/testAuthentication', {
            headers: {
              'Authorization': auth
            }
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const testApiUploadJSON = async () => {
        var data = JSON.stringify({
            "pinataOptions": {
              "cidVersion": 1
            },
            "pinataMetadata": {
              "name": "testing",
              "keyvalues": {
                "customKey": "customValue",
                "customKey2": "customValue2"
              }
            },
            "pinataContent": {
              "somekey": "somevalue"
            }
        });


        var config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': auth
            },
            data : data
        };
          
        const res = await axios(config);
        console.log(res.data);
    }

    return (
        <div>
            <h2>IPFS Uploader</h2>
            <Button variant="contained" onClick={testApiConnection}>connection test</Button>
            <Button variant="contained" onClick={testApiUploadJSON}>upload test</Button>
        </div>
    )
}