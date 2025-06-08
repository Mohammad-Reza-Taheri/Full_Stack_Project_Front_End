import type { NextConfig } from "next";

//  /** @type {import('next').NextConfig} */ 

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/edit_category',
        destination: '/',
        permanent: false, // Set to false if you want a temporary redirect
      },
      {
        source: '/category',
        destination: '/',
        permanent: false, // Set to false if you want a temporary redirect
      },
         {
        source: '/category/:category_id/cards',
        destination: '/category/:category_id',
        permanent: false, // Set to false if you want a temporary redirect
      },
        {
        source: '/category/:category_id/cards/edit_card',
        destination: '/category/:category_id',
        permanent: false, // Set to false if you want a temporary redirect
      },
    ];
  },

};

export default nextConfig;

