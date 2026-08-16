/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://your-domain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/studio', '/api'] },
    ],
  },
  exclude: ['/studio/*'],
  alternateRefs: [
    { href: `${process.env.SITE_URL || 'https://your-domain.com'}/en`, hreflang: 'en' },
    { href: `${process.env.SITE_URL || 'https://your-domain.com'}/ru`, hreflang: 'ru' },
  ],
}
