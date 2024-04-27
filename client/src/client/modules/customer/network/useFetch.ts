import { AxiosError } from 'axios';
import { useState } from 'react';

export const useFetch = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
    const [state, updateState] = useState<{
        loading: boolean;
        response: Awaited<ReturnType<T>> | null;
        error?: AxiosError;
    }>({
        loading: false,
        response: null,
    });

    return {
        ...state,
        async request(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
            updateState({ loading: true, response: null });

            try {
                const resp = await fn(...args);

                updateState({ loading: false, response: resp });

                return resp;
            } catch (error: any) {
                updateState({ loading: false, response: null, error });
                return error;
            }
        },
    };
};
