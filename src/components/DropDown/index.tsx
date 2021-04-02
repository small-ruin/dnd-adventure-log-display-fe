import React, { FunctionComponent, useEffect, useRef } from 'react';
import './DropDown.scss';

export interface DropdownItem<T = number | string> {
    id: T,
    text: string,
}

interface DropdownProps<T = number | string> {
    list: DropdownItem<T>[],
    onSelect(item: DropdownItem<T>, e: React.MouseEvent): void,
    visible?: boolean,
    style?: React.CSSProperties,
}

const Dropdown: FunctionComponent<DropdownProps> = ({list, onSelect, visible = false, children, style}) => {
    const dropdownMenu = useRef<HTMLDivElement>(null);
    const Item = (itemProps: DropdownItem) => {
        return <div className="dropdown-item" onClick={e => onSelect(itemProps, e)}>
            {itemProps.text}
        </div>
    }
    useEffect(() => {
        const node = dropdownMenu.current;
        if (node) {
            node.style.top = `${0 - node.getBoundingClientRect().height - 15}px`;
        }
    })
    return (
        <div className='dropdown-wrapper' style={style}>
            {visible && <div className="dropdown-menu" ref={dropdownMenu}>
                {
                    list.map(i => <Item key={i.id} id={i.id} text={i.text} />)
                }
            </div>}
            {children}
        </div>
    )
}
export default Dropdown;