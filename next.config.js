/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/todos'
            }
        ]
    }
}

module.exports = nextConfig
