import { useState, useEffect } from 'react';
import { Log } from '../../interface';
import { get } from '../../request';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading'
import Button from '../../components/Button';
import { AxiosResponse } from 'axios';
import Dropdown, { DropdownItem } from '../../components/DropDown';
import menus, { LOG_OPERATIONS, MENU_TYPE } from './logMenus';
import logOperationHandles from './logOperationHandlers';
import { throttle } from '../../utils';

interface Params {
    id: string
}

let lastScrollTop = 0

export default function LogComp() {
    const { id } = useParams<Params>();

    const [log, setLog] = useState<Log | null>(null);
    const [showSetting, setShowSetting] = useState<boolean>(true);
    const [nextId, setNextId] = useState<string | null>(null);
    const [prevId, setPrevId] = useState<string | null>(null);
    const [currentMenu, setCurrentMenu] = useState<MENU_TYPE | null>(null);

    useEffect(() => {
        get('/log/' + id)
            .then((res: AxiosResponse<Log>) => {
                setLog(res.data)
                const order = res.data.adventure?.order;

                if (order) {
                    const arr = order.split(',');
                    const nowIndex = arr.findIndex(i => i === id);
                    nowIndex !== 0 && setPrevId(arr[nowIndex - 1]);
                    nowIndex !== arr.length - 1 && setNextId(arr[nowIndex + 1]);
                }
            })

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
    }, [id]);

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
                {prevId && <Link to={'/log/' + prevId}>上一夜</Link>}
                {nextId && <Link to={'/log/' + nextId}>下一夜</Link>}
            </div>
        </div>
    )
}
