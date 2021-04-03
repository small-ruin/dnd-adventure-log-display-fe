import * as React from 'react';
import './Button.scss';

interface ButtonProps {
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: ButtonType;
}

type ButtonType = 'primary' | 'circle' | 'text';

const Button: React.FC<ButtonProps> = (props) => {
    const { children, onClick, type = 'primary' } = props;
    let { style } = props;

    return <div className={`button button-${type}`} onClick={onClick} style={style}>{children}</div>
}

export { Button };
export default Button;
