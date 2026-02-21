import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found — Arham Animal Ambulance</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-[#292524] mb-4">404</h1>
        <p className="text-[#57534E] mb-6">This page could not be found.</p>
        <a
          href="/"
          className="px-6 py-3 bg-[#B7312C] text-white rounded-full font-semibold hover:bg-[#9A2823] transition-colors"
        >
          Go Home
        </a>
      </div>
    </>
  );
}
