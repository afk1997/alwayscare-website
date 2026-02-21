import type { AppProps } from 'next/app';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-sans antialiased text-[#292524] selection:bg-[#FDEAEA] selection:text-[#B7312C] overflow-x-hidden">
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NWFC97WX');`,
        }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-[#292524] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
