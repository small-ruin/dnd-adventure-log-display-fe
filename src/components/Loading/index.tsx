import React, { useState } from 'react';
import './Loading.css';

export default function Loading() {
    const [msg, setMsg] = useState('Loading...');

    setTimeout(() => {
        if (msg.length < 10)
            setMsg(msg + '.')
        else 
            setMsg('Loading')
    }, 500)
    return <div className="loading">{msg}</div>
}
