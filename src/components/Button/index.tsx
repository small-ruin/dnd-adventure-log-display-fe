import * as React from 'react';
import './Button.css';

interface ButtonProps {
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, style}) => {
    return <div className="button" onClick={onClick} style={style}>{children}</div>
}

export default Button;
