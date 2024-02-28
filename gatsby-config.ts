module.exports = {
  siteMetadata: {
    title: `Discover Treasure`,
    headline: `Queensland Mint`,
    siteUrl: `https://kaleidoscopic-sopapillas-147291.netlify.app/`,
    description: `Discover treasure at the Queensland Mint. Biggest range of Australian gold and silver coins. Public welcome. Buy & sell QMINT Direct and save. Visit us Instore, buy online or call 07 3184 8300.`,
    author: `@QMint`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    // {
    //   resolve: `@builder.io/partytown`,
    //   options: {
    //     name: `assets`,
    //     path: `${__dirname}/public/static/`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/assets/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: "async",
        enableListener: true,
        preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        web: [
          {
            name: 'Montserrat',
            file: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
            crossOrigin: 'anonymous',
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    // {
    //   resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
    //   options: {
    //     analyzerMode: 'server',
    //     analyzerPort: 3001,
    //   }
    // },
  ],
};
