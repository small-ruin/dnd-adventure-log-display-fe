import { FC } from 'react';
import { Adventure, Log } from '../../interface';
import { Button, Dropdown, DropdownItem } from '../index';
import './BreadCrumb.scss';

interface Props {
    adventureList?: Adventure[],
    adventure?: Adventure | null,
    logList?: Log[],
    currentLogName?: string,
}

const BreadCrumb: FC<Props> = ({adventure, adventureList, logList, currentLogName}) => {
    const adventureListDropItem: DropdownItem[] | undefined = adventureList?.map(({id, name}) => ({ id: id, text: name }));
    const logListDropItem: DropdownItem[] | undefined = logList?.map(({id, name}) => ({ id, text: name }));

    const adventureButton = <Button type='text'>{adventure ? adventure.name : '未知冒险'}</Button>;
    const logButton = <Button type='text'>{currentLogName}</Button>;

    return <div className='bread-crumb'>
        <Button type='text'>小废墟</Button>
        &gt;
        {
            adventureListDropItem ?
                <Dropdown list={adventureListDropItem}>{adventureButton}</Dropdown> :
                adventureButton
        }
        &gt;
        { 
            currentLogName &&
                logListDropItem ?
                    <Dropdown list={logListDropItem}>{logButton}</Dropdown> :
                    logButton
        }
    </div>
}

export { BreadCrumb };
export default BreadCrumb;