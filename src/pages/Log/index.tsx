import React, { useState, useEffect } from 'react';
import { Log } from '../../interface';
import { get } from '../../utils';
import { useParams } from 'react-router-dom';

interface Params {
  id: string
}
export default function LogComp() {
  const { id } = useParams<Params>();

  const [log, setLog] = useState<Log | null>(null)

  useEffect(() => {
    get('/log/' + id).then(res => setLog(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!log) {
    return <>loading...</>
  }

  return (
    <div className="log mainContent">
      <h1>{ log.name }</h1>
      <h3>{ log.createdAt }</h3>
      <div dangerouslySetInnerHTML={{ __html: log.content}}></div>
    </div>
  )
}