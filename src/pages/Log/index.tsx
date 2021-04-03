import { useState, useEffect } from 'react';
import { Adventure, Log, LogDetail } from '../../interface';
import { get, Urls } from '../../request';
import { Link, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Dropdown, DropdownItem, Loading, Button, BreadCrumb  } from '../../components';
import menus, { LOG_OPERATIONS, MENU_TYPE } from './logMenus';
import logOperationHandles from './logOperationHandlers';
import { throttle } from '../../utils';

interface Params {
    id: string
}

let lastScrollTop = 0

export default function LogComp() {
    const { id } = useParams<Params>();

    const [log, setLog] = useState<LogDetail | null>(null);
    const [logs, setLogs] = useState<Log[] | null>(null);
    const [adventure, setAdventure] = useState<Adventure | null>(null);
    const [showSetting, setShowSetting] = useState<boolean>(true);
    const [nextId, setNextId] = useState<string | null>(null);
    const [prevId, setPrevId] = useState<string | null>(null);
    const [currentMenu, setCurrentMenu] = useState<MENU_TYPE | null>(null);

    useEffect(() => {
        get('/log/' + id)
            .then((res: AxiosResponse<LogDetail>) => {
                setLog(res.data)
                const adventure = res.data.adventure;
                
                if (adventure) {
                    setAdventure(adventure);

                    const arr = adventure.order.split(',');
                    const nowIndex = arr.findIndex(i => i === id);
                    nowIndex !== 0 && setPrevId(arr[nowIndex - 1]);
                    nowIndex !== arr.length - 1 && setNextId(arr[nowIndex + 1]);

                    getLogList(adventure.id);
                }
            })
    }, [id]);

    function getLogList(adventureId: number) {
        get(`/adventure/${adventureId}/logs`).then((res: AxiosResponse<Log[]>) => {
            if (Array.isArray(res.data)) {
                setLogs(res.data);
            }
        })
    }

    useEffect(() => {
        const handleScroll = throttle(() => {
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop) {
                setShowSetting(false)
            } else {
                setShowSetting(true)
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    
            // hide dropdown
            setCurrentMenu(null);
        }, 300, true)

        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll)
    })

    useEffect(() => {
        if (currentMenu) {
            setTimeout(() => window.addEventListener('click', clickOut));
        } else {
            window.removeEventListener('click', clickOut)
        }
        return () => window.removeEventListener('click', clickOut);
    })

    function clickOut(e: MouseEvent) { 
        setCurrentMenu(null)
    };

    useEffect(() => {
        const root = document.getElementById('root');
        root && (root.style.background = 'linear-gradient(#BDC0BA, #0089A7)');
        return () => { root && (root.style.background = '#BDC0BA') };
    })

    if (!log) {
        return <Loading></Loading>
    }

    function handlerMenuClick(id: MENU_TYPE) {
        setCurrentMenu(currentMenu === null ? id : null);
    }
    function handlerMenuItemClick({ id }: DropdownItem<LOG_OPERATIONS>) {
        logOperationHandles[id]();
    }
    function getDropdownVisible(id: MENU_TYPE) {
        return id === currentMenu ? true : false
    }
    function getMenuAnimationClassName() {
        return showSetting ? 'log-bottom-menu-slideup' : 'log-bottom-menu-slidedown';
    }

    return (
        <div className="log main-content">
            <BreadCrumb adventure={adventure} logList={logs} currentLogName={log.name} />
            <h1>{log.name}</h1>
            <h3 className="grey-title">{log.createdAt}</h3>
            <div className="content-hook" dangerouslySetInnerHTML={{ __html: log.content }}></div>
            { <div className={`bottom-menu ${getMenuAnimationClassName()}`}>
                    {
                        menus.map(menu => menu.dropdown ? <Dropdown
                            key={menu.id}
                            list={menu.dropdown}
                            onSelect={handlerMenuItemClick}
                            visible={getDropdownVisible(menu.id)}
                            style={{ padding: '5px 0'}}>
                                <Button type='text' onClick={() => handlerMenuClick(menu.id)} style={{ color: '#FCFAF2' }}>{menu.text}</Button>
                        </Dropdown> : <Button type='text' style={{ color: '#FCFAF2' }}>{menu.text}</Button>)
                    }
            </div>}
            <div className={'bottom-button-group'}>
                {prevId && <Link to={Urls.getLogUrl(prevId)}>上一夜</Link>}
                {nextId && <Link to={Urls.getLogUrl(nextId)}>下一夜</Link>}
            </div>
        </div>
    )
}
