'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Order } from '@/commerce/shop/admin/types';
import styles from './styles.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function monthsForLocale(locale: string, month: Date) {
    return new Intl.DateTimeFormat(locale, {
        month: 'long',
    }).format(month);
}

export const AdminPage: FC<{ orders: Order[] }> = ({ orders }) => {
    const t = useTranslations('admin');
    const params = useParams();
    const groupByMont = orders.reduce<
        Record<number, { name?: string; total: number }>
    >((memo, order) => {
        const date = new Date(order.createdDate || '');
        const month = date.getMonth();

        if (!memo[month]) {
            memo[month] = {
                name: monthsForLocale(params.locale as string, date),
                total: order.total || 0,
            };
        } else {
            memo[month].total += order.total || 0;
        }

        return memo;
    }, {});

    const chartData = Object.values(groupByMont);
    const labels = chartData.map((o) => o.name);
    const data = {
        labels,
        datasets: [
            {
                label: t('page.admin.main.page.chart.title'),
                data: chartData.map((o) => o.total),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <PageWrapper>
            <div className={styles.welcome}>
                <Typography variant="h5">
                    {t('page.admin.main.page.welcome.title')}
                </Typography>
                <Typography variant="body1">
                    {t('page.admin.main.page.welcome.description')}
                </Typography>
            </div>
            <Typography textAlign={'center'}>
                {t('page.admin.main.page.summery', {
                    orders: orders.length,
                    currency: orders[0]?.currency.symbol,
                    sum: chartData?.reduce((sum, d) => sum + d.total, 0),
                })}
            </Typography>
            <Line data={data} />
        </PageWrapper>
    );
};
