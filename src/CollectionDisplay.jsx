import { TextField } from '@mui/material';
import React, { useState } from 'react';

export function CollectionDisplay () {
    const [userAddress, setUserAddress] = useState("");
    
    return (
        <div>
            <h2>Collection Display</h2>
            <TextField type="text" placeholder="user address" value={userAddress} onChange={e => setUserAddress(e.target.value)}/>
        </div>
    )
}