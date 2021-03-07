import React, { useState, useEffect } from 'react';
import { Adventure, Log } from '../../interface';
import { get } from '../../utils';
import { useParams, Link } from 'react-router-dom';
import './Adventure.css';

interface Params {
  id: string
}
export default function AdventureComp() {
  const { id } = useParams<Params>();

  const [adv, setAdv] = useState<Adventure | null>(null)
  const [logs, setLogs] = useState<Log[] | null>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    get('/adventure/' + id).then(res => {
      setAdv(res.data);
    }, err => {
      console.error(err);
      setError(true);
    })
    
    get('/adventure/' + id + '/logs').then(res => {
      setLogs(res.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!adv) {
    return <>loading...</>
  }

  if (error) {
    return <>something error</>
  }

  return (
    <div className='adventure mainContent'>
      <h1>{ adv.name }</h1>
      <h3>{ adv.createdAt }</h3>
      {
        logs?.map(log => <Link to={`/log/${log.id}`} key={log.id}>{ log.name }</Link>)
      }
    </div>
  )
}