import { FC } from 'react';

interface IProps {
    src?: string;
    alt?: string;
    className?: string;
}

export const Image: FC<IProps> = ({ src, alt, className }) => {
    return <img className={className} src={`/media/${src}`} alt={alt} />;
};
