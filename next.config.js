/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.vecteezy.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
            },
        ],
    },
};
