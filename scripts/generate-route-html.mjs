/**
 * Post-build script: generates route-specific HTML files from dist/index.html.
 *
 * Problem: SPA serves the same index.html for all routes. AI crawlers that
 * don't execute JS see identical content (title, meta, noscript) on every page.
 *
 * Solution: After vite build, create dist/{route}/index.html for each route
 * with unique <title>, meta tags, OG tags, canonical, and noscript content.
 * Vercel serves static files before applying rewrites, so these take priority.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const DIST = 'dist';
const DOMAIN = 'https://arhamanimalambulance.com';

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

// Shared noscript wrapper
const noscriptWrap = (inner) => `
    <noscript>
      <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Open Runde',system-ui,sans-serif;color:#292524;">
        <header style="text-align:center;margin-bottom:40px;">
          <img src="/images/arham-alwayscare-logo.webp" alt="Arham Animal Ambulance — Always Care" width="200" height="60" style="margin:0 auto 16px;display:block;" />
${inner}
        </header>
        <footer style="border-top:1px solid #E8E0D8;padding-top:20px;text-align:center;color:#78716C;font-size:13px;">
          <p><a href="/" style="color:#B8650A;">Back to Home</a> | &copy; 2026 Arham Yuva Seva Group</p>
        </footer>
      </div>
    </noscript>`;

const routes = [
  {
    path: 'live-impact',
    title: 'Live Impact — Arham Animal Ambulance | Always Care',
    description: 'Track live rescue cases in real-time. See the animals being rescued, treated, and rehabilitated by Arham Animal Ambulance across India.',
    noscript: noscriptWrap(`
          <h1 style="font-size:28px;font-weight:700;margin:0 0 8px;">Live Impact — Rescue Case Tracker</h1>
          <p style="font-size:16px;color:#57534E;margin:0;">Track live rescue cases in real-time from Arham Animal Ambulance across India.</p>
        </header>

        <main>
          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Real-Time Rescue Tracking</h2>
            <p style="color:#57534E;line-height:1.7;">The Live Impact page provides a real-time database of 700+ rescue cases handled by Arham Animal Ambulance. Every rescue is tracked from the moment of the emergency call through treatment and recovery.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Search &amp; Filter</h2>
            <p style="color:#57534E;line-height:1.7;">Search across 13+ fields including case ID, address, animal type, condition, treatment given, medication dosage, doctor observations, and more. Sort by most recent or oldest cases.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Case Details</h2>
            <p style="color:#57534E;line-height:1.7;">Each case includes detailed information: animal type, site name, status, condition, affected body part, treatment given, medication dosage, doctor observation, recommendation, and informer details. Cases are displayed in a masonry grid layout with progressive loading.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">About Arham Animal Ambulance</h2>
            <p style="color:#57534E;line-height:1.7;">Arham Animal Ambulance ("Always Care") operates 43+ fully-equipped ambulances with trained veterinarians across 40+ cities in India. All services are 100% free. Over 1.5 lakh (150,000+) animals rescued and treated.</p>
          </section>

          <nav style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Pages</h2>
            <ul style="color:#57534E;line-height:1.8;padding-left:20px;">
              <li><a href="/" style="color:#B8650A;">Home — Find Nearest Ambulance</a></li>
              <li><a href="/privacy-policy" style="color:#B8650A;">Privacy Policy</a></li>
              <li><a href="/terms-conditions" style="color:#B8650A;">Terms &amp; Conditions</a></li>
              <li><a href="/refund-cancellation" style="color:#B8650A;">Refund &amp; Cancellation Policy</a></li>
            </ul>
          </nav>
        </main>
`),
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy — Arham Animal Ambulance',
    description: 'Privacy policy for Arham Animal Ambulance.',
    noscript: noscriptWrap(`
          <h1 style="font-size:28px;font-weight:700;margin:0 0 8px;">Privacy Policy</h1>
          <p style="font-size:16px;color:#57534E;margin:0;">Privacy policy for Arham Animal Ambulance (Always Care).</p>
        </header>

        <main>
          <section style="margin-bottom:32px;">
            <p style="color:#57534E;line-height:1.7;">At arham.org, accessible from www.arham.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by arham.org and how we use it.</p>
            <p style="color:#57534E;line-height:1.7;">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at support@alwayscare.org</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Log Files</h2>
            <p style="color:#57534E;line-height:1.7;">arham.org follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Cookies and Web Beacons</h2>
            <p style="color:#57534E;line-height:1.7;">Like any other website, arham.org uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Privacy Policies</h2>
            <p style="color:#57534E;line-height:1.7;">Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on arham.org, which are sent directly to users' browser. Note that arham.org has no access to or control over these cookies that are used by third-party advertisers.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Children's Information</h2>
            <p style="color:#57534E;line-height:1.7;">arham.org does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Online Privacy Policy Only</h2>
            <p style="color:#57534E;line-height:1.7;">This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in arham.org.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Consent</h2>
            <p style="color:#57534E;line-height:1.7;">By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
          </section>
        </main>
`),
  },
  {
    path: 'terms-conditions',
    title: 'Terms & Conditions — Arham Animal Ambulance',
    description: 'Terms and conditions for using the Arham Animal Ambulance website.',
    noscript: noscriptWrap(`
          <h1 style="font-size:28px;font-weight:700;margin:0 0 8px;">Terms &amp; Conditions</h1>
          <p style="font-size:16px;color:#57534E;margin:0;">Terms and conditions for using the Arham Animal Ambulance website.</p>
        </header>

        <main>
          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Welcome to arham.org!</h2>
            <p style="color:#57534E;line-height:1.7;">These terms and conditions outline the rules and regulations for the use of Arham's Website, located at https://www.arham.org. By accessing this website we assume you accept these terms and conditions. Do not continue to use arham.org if you do not agree to take all of the terms and conditions stated on this page.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Cookies</h2>
            <p style="color:#57534E;line-height:1.7;">We employ the use of cookies. By accessing arham.org, you agreed to use cookies in agreement with the Arham's Privacy Policy.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">License</h2>
            <p style="color:#57534E;line-height:1.7;">Unless otherwise stated, Arham and/or its licensors own the intellectual property rights for all material on arham.org. All intellectual property rights are reserved. You may access this from arham.org for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p style="color:#57534E;line-height:1.7;">You must not: republish material from arham.org; sell, rent or sub-license material; reproduce, duplicate or copy material; redistribute content from arham.org.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Content Liability</h2>
            <p style="color:#57534E;line-height:1.7;">We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Reservation of Rights</h2>
            <p style="color:#57534E;line-height:1.7;">We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time.</p>
          </section>

          <section style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Disclaimer</h2>
            <p style="color:#57534E;line-height:1.7;">To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
          </section>
        </main>
`),
  },
  {
    path: 'refund-cancellation',
    title: 'Refund & Cancellation — Arham Animal Ambulance',
    description: 'Refund and cancellation policy for donations to Arham Animal Ambulance.',
    noscript: noscriptWrap(`
          <h1 style="font-size:28px;font-weight:700;margin:0 0 8px;">Refund &amp; Cancellation Policy</h1>
          <p style="font-size:16px;color:#57534E;margin:0;">Refund and cancellation policy for donations to Arham Animal Ambulance.</p>
        </header>

        <main>
          <section style="margin-bottom:32px;">
            <p style="color:#57534E;line-height:1.7;">Our policy on refund and cancellation of donations received for Arham activities on secure online payment gateway as under:</p>
            <p style="color:#57534E;line-height:1.7;">Any request for cancellations and refund of online donations once duly placed on the website, shall not be entertained under any circumstances. No cash or refund of money will be allowed after completing the online donation as it is an extremely cumbersome process. We therefore request you to be sure before you donate.</p>
          </section>

          <nav style="margin-bottom:32px;">
            <h2 style="font-size:22px;font-weight:700;margin:0 0 12px;">Pages</h2>
            <ul style="color:#57534E;line-height:1.8;padding-left:20px;">
              <li><a href="/" style="color:#B8650A;">Home — Find Nearest Ambulance</a></li>
              <li><a href="/live-impact" style="color:#B8650A;">Live Impact — Rescue Case Tracker</a></li>
              <li><a href="/privacy-policy" style="color:#B8650A;">Privacy Policy</a></li>
              <li><a href="/terms-conditions" style="color:#B8650A;">Terms &amp; Conditions</a></li>
            </ul>
          </nav>
        </main>
`),
  },
];

function generateRouteHtml(route) {
  let html = template;
  const url = `${DOMAIN}/${route.path}`;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // Replace noscript block
  html = html.replace(
    /\n    <noscript>[\s\S]*?<\/noscript>/,
    route.noscript
  );

  return html;
}

// Generate HTML for each route
for (const route of routes) {
  const outDir = join(DIST, route.path);
  const outFile = join(outDir, 'index.html');

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, generateRouteHtml(route), 'utf-8');

  console.log(`  Generated ${outFile}`);
}

console.log(`\n  Route HTML generation complete (${routes.length} pages)`);
