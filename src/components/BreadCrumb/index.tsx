import { FC, useContext, useEffect, useState } from 'react';
import { Adventure, Log } from '../../interface';
import { Button, Dropdown, DropdownItem, Position } from '../index';
import { advsContext } from '../../pages/App/App';
import { Urls } from '../../request/url';
import './BreadCrumb.scss';
import { useHistory } from 'react-router';

interface Props {
    adventureList?: Adventure[],
    adventure?: Adventure | null,
    logList?: Log[] | null,
    currentLogName?: string,
}

enum Bread {
    adventure = 1,
    log
}

const BreadCrumb: FC<Props> = ({adventure, logList, currentLogName}) => {
    const adventureList = useContext(advsContext);
    const [currentBread, setCurrentBread] = useState<Bread | null>(null)
    const adventureListDropItem: DropdownItem[] | undefined = adventureList?.map(({id, name}) => ({ id: id, text: name }));
    const logListDropItem: DropdownItem[] | undefined = logList?.map(({id, name}) => ({ id, text: name }));
    const history = useHistory();

    useEffect(() => {
        if (currentBread) {
            setTimeout(() => window.addEventListener('click', clickOut));
        } else {
            window.removeEventListener('click', clickOut)
        }
        return () => window.removeEventListener('click', clickOut);
    })

    function clickOut(e: MouseEvent) { 
        setCurrentBread(null)
    };

    function handleButtonClick(e: React.MouseEvent, bread: Bread) {
        e.stopPropagation();
        setCurrentBread(currentBread ? null : bread);
    }

    function handleBreadClick(bread: Bread, id: number | string) {
        const url = bread === Bread.log ? Urls.getLogUrl(id) : Urls.getAdventureUrl(id);
        history.push(url);
    }

    const adventureButton = <Button
        onClick={(e) => handleButtonClick(e, Bread.adventure)}
        type='text' >{adventure ? adventure.name : '未知冒险'}</Button>;
    const logButton = <Button
        onClick={(e) => handleButtonClick(e, Bread.log)}
        type='text'>{currentLogName}</Button>;

    return <div className='bread-crumb'>
        <Button type='text'>小废墟</Button>
        &gt;
        {
            adventureListDropItem ?
                <Dropdown list={adventureListDropItem}
                    visible={currentBread === Bread.adventure}
                    onSelect={({id}) => handleBreadClick(Bread.adventure, id)}
                    position={Position.bottom}>{adventureButton}</Dropdown> :
                adventureButton
        }
        &gt;
        { 
            currentLogName &&
                logListDropItem ?
                    <Dropdown list={logListDropItem}
                        visible={currentBread === Bread.log}
                        onSelect={({id}) => handleBreadClick(Bread.log, id)}
                        position={Position.bottom}>{logButton}</Dropdown> :
                    logButton
        }
    </div>
}

export { BreadCrumb };
export default BreadCrumb;