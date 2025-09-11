import { MetadataRoute } from 'next';

// This function generates the sitemap.xml file at build time.
// It helps search engines like Google understand the structure of the site and discover all relevant pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://simplythebest.vn'; // Replace with the actual domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // TODO: Add dynamic routes for community posts, products, user profiles, etc.
    // when the backend and database are connected.
  ];
}
