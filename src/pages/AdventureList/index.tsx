import React, { useState, useEffect } from 'react';
import { Adventure } from '../../interface';
import { get } from '../../utils';
import { Link } from 'react-router-dom';
import './adventureList.css';
import '../../components/Loading'
import Loading from '../../components/Loading';

export default function AdventureComp() {
  const [advs, setAdvs] = useState<Adventure[] | null>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    get('/adventure').then(res => {
      setAdvs(res.data);
    }, err => {
      console.error(err);
      setError(true);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!advs) {
    return <Loading></Loading>
  }

  if (error) {
    return <>something error</>
  }

  return (
    <div className='adventure-list mainContent'>
        <img src="/Revachol_034.webp" alt="???" width="90"></img>
        <p>一叠文件已经放在桌上，如同她一开始就知道你需要什么。</p>
        <p>你仿佛听到了掷骰的声音。你开始觉得自己错过了一个侦察检定。这件事情也许没什么大不了的……</p>
        { advs.map(adv => <Link className="adventure-link" to={`/adventure/${ adv.id }`} key={adv.id}>{ adv.name }</Link>) }
    </div>
  )
}
