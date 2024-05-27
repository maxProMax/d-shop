import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/:local/backend/:path*',
                destination: `${process.env.BACKEND_HREF}/:path*`,
            },
            {
                source: '/:local/media/:path*',
                destination: `${process.env.BACKEND_HREF}/:path*`,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|png)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=100, must-revalidate',
                    },
                ],
            },
        ];
    },
};

export default withNextIntl(nextConfig);
