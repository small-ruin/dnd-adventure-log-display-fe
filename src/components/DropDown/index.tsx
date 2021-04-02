import React, { FunctionComponent } from 'react';

export interface DropdownItem<T = number | string> {
    id: T,
    text: string,
}

interface DropdownProps<T = number | string> {
    list: DropdownItem<T>[],
    onSelect(item: DropdownItem<T>, e: React.MouseEvent): void,
    visible?: boolean,
}

const Dropdown: FunctionComponent<DropdownProps> = ({list, onSelect, visible = false, children}) => {
    const Item = (itemProps: DropdownItem) => {
        return <div className="dropdown-item" onClick={e => onSelect(itemProps, e)}>
            {itemProps.text}
        </div>
    }
    return (
        <div className='dropdown-wrapper'>
            {visible && <div className="dropdown-menu">
                {
                    list.map(i => <Item id={i.id} text={i.text} />)
                }
            </div>}
            {children}
        </div>
    )
}
export default Dropdown;