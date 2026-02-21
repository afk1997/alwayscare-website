import Head from 'next/head';
import PrivacyPolicyPage from '../views/PrivacyPolicyPage';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Arham Animal Ambulance</title>
        <meta name="description" content="Privacy policy for Arham Animal Ambulance." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://alwayscare.org/privacy-policy" />

        <meta property="og:title" content="Privacy Policy — Arham Animal Ambulance" />
        <meta property="og:description" content="Privacy policy for Arham Animal Ambulance." />
        <meta property="og:url" content="https://alwayscare.org/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Arham Animal Ambulance" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy — Arham Animal Ambulance" />
        <meta name="twitter:description" content="Privacy policy for Arham Animal Ambulance." />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alwayscare.org/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://alwayscare.org/privacy-policy" }
          ]
        }) }} />
      </Head>
      <PrivacyPolicyPage />
    </>
  );
}
