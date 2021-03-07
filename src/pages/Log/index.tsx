import React, { useState, useEffect } from 'react';
import { Log } from '../../interface';
import { get } from '../../utils';
import { useParams } from 'react-router-dom';
import './Log.css';
import Loading from '../../components/Loading'
import Button from '../../components/Button';

interface Params {
  id: string
}

let lastScrollTop = 0

export default function LogComp() {
  const { id } = useParams<Params>();

  const [log, setLog] = useState<Log | null>(null);
  const [showSetting, setShowSetting] = useState<boolean>(true);


  useEffect(() => {
    get('/log/' + id).then(res => setLog(res.data))

    document.addEventListener("scroll", e => handleScroll());

    function handleScroll() {
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        console.log(st, lastScrollTop)
        if (st > lastScrollTop){
            console.log('down')
            setShowSetting(false)
        } else {
            console.log('up')
            setShowSetting(true)
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!log) {
    return <Loading></Loading>
  }



  return (
    <div className="log mainContent">
      <h1>{ log.name }</h1>
      <h3 className="grey-title">{ log.createdAt }</h3>
      <div dangerouslySetInnerHTML={{ __html: log.content}}></div>
      <Button style={{ position: 'fixed', bottom: '5%', right: '5%',
        borderRadius: '50%', width: '40px', height: '40px', padding: 0, textAlign: 'center', lineHeight: '40px',
        display: showSetting ? 'block' : 'none' }}>设置</Button>
    </div>
  )



}
