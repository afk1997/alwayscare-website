import Head from 'next/head';
import TermsConditionsPage from '../views/TermsConditionsPage';

export default function TermsConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions — Arham Animal Ambulance</title>
        <meta name="description" content="Terms and conditions for using the Arham Animal Ambulance website." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://alwayscare.org/terms-conditions" />

        <meta property="og:title" content="Terms & Conditions — Arham Animal Ambulance" />
        <meta property="og:description" content="Terms and conditions for using the Arham Animal Ambulance website." />
        <meta property="og:url" content="https://alwayscare.org/terms-conditions" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Arham Animal Ambulance" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms & Conditions — Arham Animal Ambulance" />
        <meta name="twitter:description" content="Terms and conditions for using the Arham Animal Ambulance website." />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alwayscare.org/" },
            { "@type": "ListItem", "position": 2, "name": "Terms & Conditions", "item": "https://alwayscare.org/terms-conditions" }
          ]
        }) }} />
      </Head>
      <TermsConditionsPage />
    </>
  );
}
