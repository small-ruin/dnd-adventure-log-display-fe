import React, { useState, useEffect } from 'react';
import { Adventure } from '../../interface';
import { get, Urls } from '../../request';
import { Link } from 'react-router-dom';
import './adventureList.css';
import '../../components/Loading'
import Loading from '../../components/Loading';
import Revachol from '../../asset//Revachol_034.webp';

  const diceMaker = [
    "“是啊。”她凝视着窗外，并没有听到你的话。“或许整个世界都被诅咒了？这是个多么危险的地方啊。从来没有什么是按照你希望的方式运作的。”",
    "“这就是大家喜欢角色扮演游戏的原因。你可以随心所欲地成为任何人。你可以一遍遍地尝试。不过即使是掷骰子，也有某种固有的暴力因素在里面。”",
    "“就好像你每次锻造骰子的时候，有些东西就会消失。另一种替代的结局，或者是一个完全不同的世界……”她从桌子上抓起一对骰子，拿到灯光下查看。",
  ]

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
        <img src={Revachol} alt="新奇骰子匠" width="90"></img>
        { diceMaker.map(i => <p key={i}>{i}</p>)}
        { advs.map(adv => <Link className="adventure-link" to={ Urls.getAdventureUrl(adv.id) } key={adv.id}>{ adv.name }</Link>) }
    </div>
  )
}
