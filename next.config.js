/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    output: 'standalone',
    webpack: (config, { _isServer }) => {
        config.resolve.alias['@uml2code'] = path.resolve(__dirname, './src/');

        return config;
    },
}

module.exports = nextConfig
