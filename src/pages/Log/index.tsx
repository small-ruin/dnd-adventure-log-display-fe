import React, { useState, useEffect } from 'react';
import { Log } from '../../interface';
import { get } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import './Log.css';
import Loading from '../../components/Loading'
import Button from '../../components/Button';
import { AxiosResponse } from 'axios';

interface Params {
  id: string
}

let lastScrollTop = 0

export default function LogComp() {
  const { id } = useParams<Params>();

  const [log, setLog] = useState<Log | null>(null);
  const [showSetting, setShowSetting] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [bracketsShowing, setBracketsShowing] = useState<boolean>(true);
  const [nextId, setNextId] = useState<string | null>(null);
  const [prevId, setPrevId] = useState<string | null>(null);
  
  let fontSize = 18;

  useEffect(() => {
    get('/log/' + id)
        .then((res: AxiosResponse<Log>) => {
            setLog(res.data)
            const order = res.data.adventure?.order;

            if (order) {
                const arr = order.split(',');
                const nowIndex = arr.findIndex(i => i ===id);
                nowIndex !== 0 && setPrevId(arr[nowIndex - 1]);
                nowIndex !== arr.length - 1 && setNextId(arr[nowIndex + 1]);
            }
        })

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
  }, [id]);

  if (!log) {
    return <Loading></Loading>
  }

  return (
    <div className="log mainContent">
        <div className="modal" style={{ display: showDialog ? 'flex' : 'none' }}>
            <div className="modal-close" onClick={toggleModal}>✗</div>
            <div>实验功能，谨慎使用：</div>
            <div className="button-group">
                {
                    bracketsShowing
                    ? <Button type="text" onClick={hideBrackets}>去除括号</Button>
                    : <Button type="text" onClick={showBrackets}>显示单行括号</Button>
                }
                <Button type="text" onClick={removeColor}>忽略Log颜色</Button>
            </div>
            <div className="button-group">
                <Button type="text" onClick={() => stepFontSize(1)}>字号+</Button>
                <Button type="text" onClick={() => stepFontSize(-1)}>字号-</Button>
            </div>
            <div className="button-group">
            <Button type="text" onClick={() => setFontFamily('Helvetica Neue, Microsoft YaHei, PingFang SC, Heiti SC, sans-serif')}>黑体</Button>
            <Button type="text" onClick={() => setFontFamily('Georgia,Times New Roman,Times,Songti SC,serif')}>宋体</Button>
            （移动端无效）
            </div>
        </div>
      <h1>{ log.name }</h1>
      <h3 className="grey-title">{ log.createdAt }</h3>
      <div className="content-hook" dangerouslySetInnerHTML={{ __html: log.content}}></div>
      <Button
        type={'circle'}
        style={{ position: 'fixed', bottom: '5%', right: '5%', display: showSetting ? 'block' : 'none' }}
        onClick={toggleModal}>设置</Button>
        <div className={'bottom-button-group'}>
            { prevId && <Link to={'/log/' + prevId}>上一夜</Link>}
            { nextId && <Link to={'/log/' + nextId}>下一夜</Link>}
        </div>
    </div>
  )

    function hideBrackets() {
        const eles: HTMLElement[] = Array.from(document.querySelectorAll('font, br'));
        eles.forEach(ele => {
            const text = ele.textContent;
            if (text && text.match(/.*> [（()].*[)）]?/)) {
                // const prev = ele.previousElementSibling as HTMLElement | null;
                // while (prev && prev.textContent?.match(/&nbsp;|\d+:\d+:\d+|<br>/)) {
                //     prev.style.display = 'none'
                // }
                ele.style.display = 'none'
            } else {
                ele.textContent && (ele.textContent = ele.textContent.replace(/（.*）/g, ''));
            }
        })
        setBracketsShowing(false);
    }
    function showBrackets() {
        const eles: HTMLElement[] = Array.from(document.querySelectorAll('font, br'));
        eles.forEach(ele => {
            if (ele.style.display === 'none')
                ele.style.display = 'inline';
        })
        setBracketsShowing(true);
    }
    function removeColor() {
        document.querySelectorAll('font').forEach(ele => {
            ele.setAttribute('color', '#333');
        });
    }
    function stepFontSize(step: number) {
        let $contentHook: HTMLElement | null = document.querySelector('.content-hook p');
        fontSize += step;
        if ($contentHook?.style)
            $contentHook.style.fontSize = fontSize + 'px';
    }
    function setFontFamily(family: string) {
        let $contentHook: HTMLElement | null = document.querySelector('.content-hook p');
        if ($contentHook?.style)
            $contentHook.style.fontFamily = family 
    }
    function toggleModal() {
        setShowDialog(!showDialog)
    }
}
