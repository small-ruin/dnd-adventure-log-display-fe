import React, { useEffect, useState } from 'react';
import './Loading.css';

export default function Loading() {
    const [msg, setMsg] = useState('Loading...');

    useEffect(() => {
        let handler = setTimeout(() => {
            if (msg.length < 10)
                setMsg(msg + '.')
            else 
                setMsg('Loading')
        }, 500)
        
        return () => {
            clearTimeout(handler)
        }
    })
    return <div className="loading">{msg}</div>
}
