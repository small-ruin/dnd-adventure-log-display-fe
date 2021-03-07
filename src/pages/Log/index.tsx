import React, { useState, useEffect } from 'react';
import cheerio from 'cheerio';
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
  const [showDiaolog, setShowDialog] = useState<boolean>(false);

  let fontSize = 16;

  useEffect(() => {
    get('/log/' + id).then(res => setLog(res.data))

    document.addEventListener("scroll", e => handleScroll());

    function handleScroll() {
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop){
            setShowSetting(false)
        } else {
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
        <div className="modal" style={{ display: showDiaolog ? 'flex' : 'none' }}>
            <div className="modal-close" onClick={toggleModal}>✗</div>
            <div>实验功能，谨慎使用：</div>
            <div className="button-group">
                <Button onClick={removeBrackets}>去除括号</Button>
                <Button onClick={removeColor}>忽略Log颜色</Button>
                <Button onClick={() => stepFontSize(1)}>字号+</Button>
                <Button onClick={() => stepFontSize(-1)}>字号-</Button>
            </div>
        </div>
      <h1>{ log.name }</h1>
      <h3 className="grey-title">{ log.createdAt }</h3>
      <div className="content-hook" dangerouslySetInnerHTML={{ __html: log.content}}></div>
      <Button
        style={{ position: 'fixed', bottom: '5%', right: '5%',
            borderRadius: '50%', width: '40px', height: '40px', padding: 0, textAlign: 'center', lineHeight: '40px',
            display: showSetting ? 'block' : 'none' }}
        onClick={toggleModal}>设置</Button>
    </div>
  )

    function removeBrackets() {
        const $ = cheerio.load(log?.content || '');
        const newHtmlArr: string[] = [];
        $('font, br').each(function() {
            const $node = $(this);
            const text = $node.text()
            if (text.match(/.*> [（()].*[)）]?/)) {
                while (newHtmlArr.length && newHtmlArr[newHtmlArr.length - 1].match(/&nbsp;|\d+:\d+:\d+|<br>/)) {
                    newHtmlArr.pop();
                }
                return;
            }
            $node.text(text.replace(/（.*）/g, ''));
            newHtmlArr.push($('<div>').append($node.clone()).html() || '');
        })
        newHtmlArr.unshift('<p>');
        newHtmlArr.push('</p>');
        setLog(Object.assign({}, log, { content: newHtmlArr.join('') }))
    }
    function removeColor() {
        document.querySelectorAll('font').forEach(ele => {
            ele.setAttribute('color', '#333');
        });
    }
    function stepFontSize(step: number) {
        let $contentHook = document.querySelector('.content-hook p');
        fontSize += step;
        $contentHook?.setAttribute('style', 'font-size:' + fontSize + 'px');
    }
    function toggleModal() {
        setShowDialog(!showDiaolog)
    }
}
