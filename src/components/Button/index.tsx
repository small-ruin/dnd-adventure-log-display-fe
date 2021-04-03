import { FC, HTMLProps } from 'react';
import './Button.scss';

interface ButtonProps extends HTMLProps<HTMLDivElement> {
    type?: ButtonType;
}

type ButtonType = 'primary' | 'circle' | 'text';

const Button: FC<ButtonProps> = (props) => {
    const { children, type = 'primary', ...rest } = props;

    return <div className={`button button-${type}`} {...rest}>{children}</div>
}

export { Button };
export default Button;
