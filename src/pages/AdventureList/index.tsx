import React, { useState, useEffect } from 'react';
import { Adventure } from '../../interface';
import { get } from '../../utils';
import { Link } from 'react-router-dom';
import './adventureList.css';

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
    return <>loading...</>
  }

  if (error) {
    return <>something error</>
  }

  return (
    <div className='adventureList mainContent'>
      { advs.map(adv => <Link to={`/adventure/${ adv.id }`} key={adv.id}>{ adv.name }</Link>) }
    </div>
  )
}