'use client';
import {
    FC,
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from 'react';
import {
    userCheck,
    userLoginGuest,
    getCart,
} from '@/commerce/shop/admin/client';
import { Cart } from '@/commerce/shop/admin/types';

type UserContextType = {
    cart?: Cart;
    updateCart?: (cart: Cart) => void;
};

export const UserContext = createContext<UserContextType>({});
export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, updateState] = useState<UserContextType>({});

    useEffect(() => {
        async function userAuth() {
            try {
                await userCheck();
            } catch {
                const { data: user } = await userLoginGuest();
            }

            const { data: cart } = await getCart();

            updateState((s) => ({ ...s, cart }));
        }

        userAuth();
    }, []);

    return (
        <UserContext.Provider
            value={{
                ...state,
                updateCart: (cart) => updateState((s) => ({ ...s, cart })),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
