/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://homedesigncenter.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://homedesigncenter.com/sitemap.xml',
      'https://homedesigncenter.com/server-sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  alternateRefs: [
    {
      href: 'https://homedesigncenter.com',
      hreflang: 'en',
    },
    {
      href: 'https://homedesigncenter.com/es',
      hreflang: 'es',
    },
  ],
  // Generate a sitemap for server-side dynamic routes
  additionalPaths: async () => {
    const result = []
    
    // Add any dynamic routes here
    // Example:
    // result.push({ loc: '/projects/1', lastmod: new Date().toISOString() })
    
    return result
  },
} 