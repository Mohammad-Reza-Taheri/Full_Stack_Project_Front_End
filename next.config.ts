// /** @type {import('next').NextConfig} */ 


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: 'https://ankibro.liara.run/edit_category',
        destination: 'https://ankibro.liara.run/',
        permanent: false, // Set to false if you want a temporary redirect
      },
      {
        source: 'https://ankibro.liara.run/category',
        destination: 'https://ankibro.liara.run/',
        permanent: false, // Set to false if you want a temporary redirect
      },
      {
        source: 'https://ankibro.liara.run/category/:category_id/cards',
        destination: 'https://ankibro.liara.run/category/:category_id',
        permanent: false, // Set to false if you want a temporary redirect
      },
      {
        source: 'https://ankibro.liara.run/category/:category_id/cards/edit_card',
        destination: 'https://ankibro.liara.run/category/:category_id',
        permanent: false, // Set to false if you want a temporary redirect
      },
    ];
  },

};

export default nextConfig;

