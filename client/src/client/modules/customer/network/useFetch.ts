import { useState } from 'react';

export const useFetch = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
    const [state, updateState] = useState<{
        loading: boolean;
        response: Awaited<ReturnType<T>> | null;
    }>({
        loading: false,
        response: null,
    });

    return {
        ...state,
        async request(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
            updateState({ loading: true, response: null });

            const resp = await fn(...args);

            updateState({ loading: false, response: resp });

            return resp;
        },
    };
};
