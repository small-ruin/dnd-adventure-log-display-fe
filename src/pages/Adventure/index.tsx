import React, { useState, useEffect } from 'react';
import { Adventure, Log, SearchResult } from '../../interface';
import cheerio from 'cheerio';
import { get, Urls } from '../../request';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

interface Params {
  id: string
}
export default function AdventureComp() {
  const { id } = useParams<Params>();

  const [key, setKey] = useState<string>('');
  const [adv, setAdv] = useState<Adventure | null>(null)
  const [logs, setLogs] = useState<Log[] | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<SearchResult[]>([])

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
  }, [id]);

  if (!adv) {
    return <Loading></Loading>
  }

  if (error) {
    return <>something error</>
  }

  return (
    <div className='adventure main-content'>
      <h1 className='title'>{ adv.name }</h1>
      <h3 className='createAt grey-title'>{ adv.createAt }</h3>
      <div className='content'>
        <section className='left'>
            {
                logs?.map(log => <Link className={'log-list'} to={ Urls.getLogUrl(log.id)} key={log.id}>{ log.name }</Link>)
            }
        </section>
        <section className='right'>
            <input value={key} onChange={event => setKey(event.target.value)} />
            <Button onClick={() => handleSearch() }>搜索</Button>
            {
                searchResult?.map(i => {
                    return <div key={i.id}>
                        <h4><Link style={{color: '#333'}} to={Urls.getLogUrl(i.id)}>{ i.name }</Link></h4>
                        { i.results.map((result, i) => <div key={result + i} dangerouslySetInnerHTML={{__html: result}}></div>) }
                    </div>
                })
            }
        </section>
      </div>
    </div>
  )

  function handleSearch() {
      get('/adventure/search', { params: { key, id } })
        .then(res => {
            if (res.data.length > 0) {
                res.data.forEach((log: Log & SearchResult) => log.results = parseHtml(log.content));
                setSearchResult(res.data)
            }
        })
  }

  function parseHtml(htmlStr: string) {
    htmlStr = htmlStr.substr(3, htmlStr.length - 3);
    const $ = cheerio.load(htmlStr);
    const result: string[] = [];
    $('font, p').each(function() {
        const text = $(this).html();
        if (text && text.indexOf(key) !== -1) {
            const temp = $('<div>').append($(this).clone())
            result.push(temp.html() || '');
        }
    })
    return result;
  }
}
