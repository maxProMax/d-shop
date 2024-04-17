import { useRouter } from 'next/navigation';
import { Routes } from './routes';

export const useAdminNavigation = () => {
    const router = useRouter();

    return {
        goToAdmin: () => router.push(Routes.ADMIN),
        goToAdminUsers: () => router.push(Routes.ADMIN_SETTINGS_USERS),
    };
};
