import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:local/backend/:path*',
                destination: `${process.env.BACKEND_HREF}/:path*`,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
