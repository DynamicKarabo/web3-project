/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Image optimization
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },

    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Experimental features for performance
    experimental: {
        optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
    },

    // Production optimizations
    productionBrowserSourceMaps: false,
    poweredByHeader: false,

    // Compression
    compress: true,

    // React strict mode
    reactStrictMode: true,

    // Bundle analyzer (run with ANALYZE=true npm run build)
    ...(process.env.ANALYZE === 'true' && {
        webpack: (config, { isServer }) => {
            if (!isServer) {
                const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
                config.plugins.push(
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static',
                        reportFilename: './analyze.html',
                        openAnalyzer: false,
                    })
                );
            }
            return config;
        },
    }),
};

export default nextConfig;
