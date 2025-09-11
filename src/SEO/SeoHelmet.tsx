import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  url: string;
  keywords?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  type = 'website',
  image = '/og-default.jpg',
  url,
  keywords = 'software development, web development, full-stack, React, Node.js',
  articlePublishedTime,
  articleModifiedTime
}) => {
  // Ensure image URL is absolute
  const imageUrl = image.startsWith('http') ? image : `https://yourportfolio.com${image}`;
  
  // Trim description to recommended length for SEO
  const trimmedDescription = description.length > 160 
    ? `${description.substring(0, 157)}...` 
    : description;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={trimmedDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph data */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={trimmedDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Hiwa Sadraldin | Portfolio" />
      
      {/* Article specific metadata (for blog posts, etc.) */}
      {type === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {type === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      
      {/* Twitter Card data */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={trimmedDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Hiwa Sadraldin" />
    </Helmet>
  );
};

export default SEOHelmet;