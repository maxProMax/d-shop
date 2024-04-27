import { CheckoutSuccessPage } from '@/client/pages/site/pages/checkout/success';

export default function CheckoutSuccess({
    searchParams,
}: {
    searchParams: { id: string };
}) {
    return <CheckoutSuccessPage orderId={searchParams.id} />;
}
