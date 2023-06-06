import React, { useEffect } from 'react';
import axios from 'axios';

export function NFTData() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.pinata.cloud/data/testAuthentication', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYzJiN2ZlNS01ZjI0LTRiODEtOGZkMy1mMzk5NGFlOTk2NDYiLCJlbWFpbCI6Im1zcWVycWZhYnZvbWZ6bHZ6YkBiYml0cS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODRiZDkxMjgzMTViYmFhNzgzMmEiLCJzY29wZWRLZXlTZWNyZXQiOiI4ZDBiNDc2ZjFhMzUzNDYwMzBmNjcxZDMyNzY4ODdjNTkzNjljMzFmYzdkYjQ3NDc4ODBiZGMzZThjMzJkNGVjIiwiaWF0IjoxNjg2MDczNTk5fQ.wgDcDlfnayfz_1c9Q2_Vl0Pn_HeyM8MzJeSfA-2Fmi0'
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>NFT Data</h1>
    </div>
  );
}
