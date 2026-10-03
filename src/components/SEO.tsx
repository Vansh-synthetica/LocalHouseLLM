import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://localhousellm.com';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  /** Absolute canonical URL. Defaults to the current path on SITE_URL. */
  canonical?: string;
  /** Absolute URL of a representative image (screenshot, cover). */
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: object;
  noindex?: boolean;
}

const SEO = ({
  title = 'LocalHouseLLM — Modular Infrastructure for Local AI',
  description = 'LocalHouseLLM builds open, modular infrastructure for local and decentralized AI. Home of Anvira, Anvira Notes, Nomi, and the AICL protocol.',
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogImageAlt,
  ogImageWidth,
  ogImageHeight,
  type = 'website',
  author = 'LocalHouseLLM',
  publishedTime,
  modifiedTime,
  schema,
  noindex = false,
}: SEOProps) => {
  const { pathname } = useLocation();
  const url = canonical ?? `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`;
  const image = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />

      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {ogImageWidth && <meta property="og:image:width" content={String(ogImageWidth)} />}
      {ogImageHeight && <meta property="og:image:height" content={String(ogImageHeight)} />}
      <meta property="og:site_name" content="LocalHouseLLM" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}
      <meta name="twitter:site" content="@localhousellm" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default SEO;
