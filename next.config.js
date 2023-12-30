/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack : (config, {buildId,isServer,dev,defaultLoaders,webpack}) => {
    //     config.resolve.alias.canvas = false
    //     config.resolve.alias.encoding = false
    //     return config
    // },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    images : {
        remotePatterns : [
            {
                protocol : 'https',
                hostname : 'utfs.io',
            }
        ]
    }
}

module.exports = nextConfig
