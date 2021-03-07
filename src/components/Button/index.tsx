import * as React from 'react';
import './Button.css';

interface ButtonProps {
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick}) => {
    return <div className="button" onClick={onClick}>{children}</div>
}

export default Button;
