import Head from 'next/head';
import HomePage from '../views/HomePage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Arham Animal Ambulance | Free 24/7 Animal Rescue Across India</title>
        <meta name="description" content="Find the nearest free animal ambulance in 40+ Indian cities. 24/7 emergency rescue, on-site treatment, and rehabilitation for injured street animals." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://arhamanimalambulance.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="Arham Animal Ambulance | Free 24/7 Animal Rescue Across India" />
        <meta property="og:description" content="Find the nearest free animal ambulance in 40+ Indian cities. 24/7 emergency rescue, on-site treatment, and rehabilitation for injured street animals." />
        <meta property="og:image" content="https://arhamanimalambulance.com/images/alwayscare-logo-original.png" />
        <meta property="og:url" content="https://arhamanimalambulance.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Arham Animal Ambulance" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arham Animal Ambulance | Free 24/7 Animal Rescue Across India" />
        <meta name="twitter:description" content="Find the nearest free animal ambulance in 40+ Indian cities. 24/7 emergency rescue, on-site treatment, and rehabilitation for injured street animals." />
        <meta name="twitter:image" content="https://arhamanimalambulance.com/images/alwayscare-logo-original.png" />
      </Head>
      <HomePage />
    </>
  );
}
