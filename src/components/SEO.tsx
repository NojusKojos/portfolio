import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const SITE_NAME = 'Nojus Peciukonis';
const DEFAULT_DESCRIPTION = 'Nojus Peciukonis — Music Artist. Producer. Sound architect.';
const SITE_URL = 'https://nojus.vercel.app';

const SEO: React.FC<SEOProps> = ({ title, description = DEFAULT_DESCRIPTION, path = '' }) => {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
