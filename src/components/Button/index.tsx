import * as React from 'react';
import './Button.scss';

interface ButtonProps {
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: ButtonType;
}

type ButtonType = 'default' | 'circle' | 'text';

const Button: React.FC<ButtonProps> = (props) => {
    const { children, onClick, type = 'default' } = props;
    let { style } = props;

    const circleStyle: React.CSSProperties = { borderRadius: '50%', width: '40px', height: '40px', padding: 0, textAlign: 'center', lineHeight: '40px' };
    const textStyle: React.CSSProperties = { backgroundColor: 'inherit', color: '#234A84', };
    const defaultStyle: React.CSSProperties = { display: 'inline-block', padding: '5px 10px', borderRadius: '2px' }

    const styleMap: {
        [K in ButtonType]: React.CSSProperties;
    } = { default: defaultStyle, circle: circleStyle, text: textStyle }

    style = Object.assign({}, styleMap[type], style);

    return <div className="button" onClick={onClick} style={style}>{children}</div>
}

export default Button;
