import React, { FunctionComponent, useEffect, useRef } from 'react';
import './DropDown.scss';

export interface DropdownItem<T = number | string> {
    id: T,
    text: string,
}

export enum Position {
    top = 1,
    bottom,
}

interface DropdownProps<T = number | string> {
    list: DropdownItem<T>[],
    onSelect?(item: DropdownItem<T>, e: React.MouseEvent): void,
    visible?: boolean,
    style?: React.CSSProperties,
    position?: Position,
}

const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    const {list, onSelect = ()=>{}, visible = false, children, style, position=Position.top} = props;
    const dropdownMenu = useRef<HTMLDivElement>(null);
    const Item = (itemProps: DropdownItem) => {
        return <div className="dropdown-item" onClick={e => onSelect(itemProps, e)}>
            {itemProps.text}
        </div>
    }
    useEffect(() => {
        const node = dropdownMenu.current;
        if (node) {
            if (position === Position.top) {
                node.style.top = `${0 - node.getBoundingClientRect().height - 15}px`;
            }
            if (position === Position.bottom) {
                node.style.bottom = `${0 - node.getBoundingClientRect().height - 15}px`;
            }
        }
    })
    return (
        <div className='dropdown-wrapper' style={style}>
            {<div className="dropdown-menu" ref={dropdownMenu} style={{visibility: visible ? 'visible' : 'hidden'}}>
                {
                    list.map(i => <Item key={i.id} id={i.id} text={i.text} />)
                }
            </div>}
            {children}
        </div>
    )
}
export { Dropdown };
export default Dropdown;