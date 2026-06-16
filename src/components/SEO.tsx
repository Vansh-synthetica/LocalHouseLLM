import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: object;
  noindex?: boolean;
}

const SEO = ({
  title = "LocalHouseLLM — Open, Modular Infrastructure for Decentralized AI",
  description = "LocalHouseLLM is an AI research company building open, modular infrastructure for decentralized AI — interoperable components for communication, orchestration, memory, safety, tools, and intelligence modules.",
  keywords = "LocalHouseLLM, decentralized AI, open AI infrastructure, modular AI, AI research company, AICL, AMAI, Anvira, Nomi, composable AI, interoperable AI components, AI ownership, open source AI",
  canonical = "https://localhousellm.com",
  ogImage = "https://localhousellm.com/og-image.png",
  type = "website",
  author = "LocalHouseLLM",
  publishedTime,
  modifiedTime,
  schema,
  noindex = false
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="LocalHouseLLM" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@localhousellm" />
      <meta name="twitter:creator" content="@localhousellm" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
