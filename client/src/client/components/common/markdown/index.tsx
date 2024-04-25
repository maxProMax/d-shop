'use client';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Typography from '@mui/material/Typography';

export const Markdown: FC<{ text?: string; className?: string }> = ({
    text,
    className,
}) => {
    return (
        <div className={className}>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    p: (props) => (
                        <Typography className={props.className}>
                            {props.children}
                        </Typography>
                    ),
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
};
