import Head from 'next/head';
import LiveImpactPage from '../views/LiveImpactPage';

export default function LiveImpact() {
  return (
    <>
      <Head>
        <title>Live Impact — Arham Animal Ambulance | Always Care</title>
        <meta name="description" content="Track live rescue cases in real-time. See the animals being rescued, treated, and rehabilitated by Arham Animal Ambulance across India." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://arhamanimalambulance.com/live-impact" />

        <meta property="og:title" content="Live Impact — Arham Animal Ambulance | Always Care" />
        <meta property="og:description" content="Track live rescue cases in real-time. See the animals being rescued, treated, and rehabilitated by Arham Animal Ambulance across India." />
        <meta property="og:image" content="https://arhamanimalambulance.com/images/alwayscare-logo-original.png" />
        <meta property="og:url" content="https://arhamanimalambulance.com/live-impact" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Arham Animal Ambulance" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Live Impact — Arham Animal Ambulance | Always Care" />
        <meta name="twitter:description" content="Track live rescue cases in real-time. See the animals being rescued, treated, and rehabilitated by Arham Animal Ambulance across India." />
        <meta name="twitter:image" content="https://arhamanimalambulance.com/images/alwayscare-logo-original.png" />
      </Head>
      <LiveImpactPage />
    </>
  );
}
