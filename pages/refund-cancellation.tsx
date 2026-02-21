import Head from 'next/head';
import RefundCancellationPage from '../views/RefundCancellationPage';

export default function RefundCancellation() {
  return (
    <>
      <Head>
        <title>Refund & Cancellation — Arham Animal Ambulance</title>
        <meta name="description" content="Refund and cancellation policy for donations to Arham Animal Ambulance." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://alwayscare.org/refund-cancellation" />

        <meta property="og:title" content="Refund & Cancellation — Arham Animal Ambulance" />
        <meta property="og:description" content="Refund and cancellation policy for donations to Arham Animal Ambulance." />
        <meta property="og:url" content="https://alwayscare.org/refund-cancellation" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Arham Animal Ambulance" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Refund & Cancellation — Arham Animal Ambulance" />
        <meta name="twitter:description" content="Refund and cancellation policy for donations to Arham Animal Ambulance." />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alwayscare.org/" },
            { "@type": "ListItem", "position": 2, "name": "Refund & Cancellation", "item": "https://alwayscare.org/refund-cancellation" }
          ]
        }) }} />
      </Head>
      <RefundCancellationPage />
    </>
  );
}
