// Facts carried over from nalluriassociates.com (crawled 30 Oct 2026). Change them
// here only; every page reads this file.

export const brand = {
  name: 'Nalluri Associates',
  tagline: 'One Stop Solution For Home Loan',
  logo: 'images/brand/nalluri-logo.png',
  logoNav: 'images/brand/nalluri-logo-nav.png',
  social: [
    { label: 'Facebook', href: 'https://business.facebook.com/latest/home?nav_ref=bm_home_redirect&asset_id=107957644336060' },
    { label: 'Instagram', href: 'https://www.instagram.com/nalluriassociates/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nalluri-associates-b147681b3/recent-activity/all/' },
  ],
};

// Every loan the firm lists. `short` is the one-line description from the
// services cards; the detail page copy lives in src/data/loan-pages.mjs.
export const loans = {
  'home-loans': { name: 'Home Loans', footer: 'Home Loan', image: 'images/media/home.8ffb2fcf.jpg', short: 'Make your dream home a reality with easy EMI options and flexible terms.' },
  'lrd-loans': { name: 'LRD', footer: 'LRD Loan', image: 'images/media/Lrd.20b8128d.jpg', short: 'Loans based on rental income with long-term repayment options up to 15 years.' },
  'mortgage-loans': { name: 'Mortgage Loans', footer: 'Mortgage Loan', image: 'images/media/mortgage.b1192c9c.jpg', short: 'Get financing by mortgaging your property, with a maximum tenure of 15 years.' },
  'commercial-loans': { name: 'Commercial Loans', footer: 'Commercial Loan', image: 'images/media/commercial.c4d43056.jpg', short: 'Loans for purchasing or constructing commercial properties like malls, hospitals, and offices.' },
  'site-loans': { name: 'Site Loans', footer: 'Site Loan', image: 'images/media/site.9730d82e.jpg', short: 'Loans for purchasing approved sites or plots in prime areas, with flexible documentation.' },
  'overdraft-loans': { name: 'Overdraft Loans', footer: 'Overdraft Loan', image: 'images/media/overdraft.b64d4fee.jpg', short: 'Access additional funds when needed with an overdraft loan facility.' },
  'business-loans': { name: 'Business Loans', footer: 'Business Loan', image: 'images/media/business.5233cb65.jpg', short: 'Get financial support to fund your startup or business expansion with flexible terms.' },
  'car-loans': { name: 'Car Loans (Used & New)', footer: 'Car Loan', image: 'images/media/car.e2cb815d.jpg', short: 'Loans for both new and used cars, with collateral based on the vehicle’s title.' },
  'personal-loans': { name: 'Personal Loans', footer: 'Personal Loan', image: 'images/media/personal.fea46e54.jpg', short: 'Unsecured loans up to Rs. 30 lakh, with a tenure ranging from 1 to 5 years.' },
};

// The two branch sites. Hyderabad lists six loans on its live site; Andhra
// Pradesh lists all nine.
export const locations = {
  hyderabad: {
    slug: 'hyderabad',
    name: 'Hyderabad',
    title: 'Nalluri Associates - Hyderabad Branch',
    description: 'Explore tailored loan solutions and financial services at Nalluri Associates’ Hyderabad branch. Your trusted partner for home, business, car, and personal loans.',
    phone: '+91 98859 50555',
    email: 'nagarjuna@nalluriassociates.com',
    offices: [
      { city: 'Hyderabad', address: 'Nalluri Associates, Flat no:102, 4th Floor, Sri Sai Balaji Towers, Pillar No: 604 A, above Canara Bank, opposite Metro Miyapur, Hyderabad, Telangana 500049' },
    ],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.241029004972!2d78.3641793749373!3d17.496003983409825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb936b39b65ea1%3A0x22a540056046a76b!2sNalluri%20Associates!5e0!3m2!1sen!2sin!4v1733294827885!5m2!1sen!2sin',
    loans: ['home-loans', 'lrd-loans', 'mortgage-loans', 'commercial-loans', 'site-loans', 'overdraft-loans'],
    hero: {
      image: 'images/gallery/IMG-20241007-WA0071.jpg',
      alt: 'The Nalluri team walking a red carpet to the office, under the Miyapur metro line',
      caption: 'Opening day at the Miyapur office, above Canara Bank.',
      position: '50% 62%',
    },
  },
  andhrapradesh: {
    slug: 'andhrapradesh',
    name: 'Andhra Pradesh',
    title: 'Nalluri Associates - Andhra Pradesh Branch',
    description: 'Discover tailored loan solutions and financial services at Nalluri Associates’ Andhra Pradesh branch. Your trusted partner for home, business, car, and personal loans.',
    phone: '+91 98854 69805',
    email: 'babji@nalluriassociates.com',
    offices: [
      { city: 'Vijayawada', address: 'Nalluri Associates, Dr Ramadevi Building, 40-5-9, Tikkle Rd, opposite Bombay Jewellery, near Hotel DV Manor, Revenue Colony Park, Sidhartha Nagar, Labbipet, Vijayawada, Andhra Pradesh 520010' },
      { city: 'Guntur', address: 'Nalluri Associates, 5-87-7, 3rd floor Relaince Smart Building, Lakshmipuram Main Rd, Guntur, Andhra Pradesh 522006' },
    ],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.4950308145208!2d80.64579027460857!3d16.501087727733086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35faba0e14ab13%3A0x8c210608c351fffc!2sNalluri%20Associates!5e0!3m2!1sen!2sin!4v1728970385992!5m2!1sen!2sin',
    loans: ['home-loans', 'lrd-loans', 'mortgage-loans', 'commercial-loans', 'site-loans', 'overdraft-loans', 'business-loans', 'car-loans', 'personal-loans'],
    hero: {
      image: 'images/media/p14.0f51f40f.jpg',
      alt: 'Four men in a doorway hung with marigolds, one cutting a blue ribbon',
      caption: 'A ribbon cutting, from the Andhra Pradesh gallery.',
      position: '50% 40%',
    },
  },
};

// Lending partners whose logos the live site shows, in its order.
export const lenders = [
  { name: 'DCB Bank', src: 'images/media/1.c7f952a5.png' },
  { name: 'Fullerton India', src: 'images/media/2.97fa16a5.png' },
  { name: 'Magma', src: 'images/media/3.6c206bb8.png' },
  { name: 'IndusInd Bank', src: 'images/media/4.f53a33d8.png' },
  { name: 'PNB Housing Finance', src: 'images/media/5.094d3fb4.png' },
  { name: 'SBI', src: 'images/media/6.2ae4209f.png' },
  { name: 'LIC Housing Finance', src: 'images/media/7.b12d8bc3.png' },
  { name: 'HDFC', src: 'images/media/8.d8d6c9ee.png' },
  { name: 'Kotak Mahindra Bank', src: 'images/media/9.a7f4abae.png' },
];

// The section pages every branch has, in nav order.
export const sections = [
  { slug: 'about', label: 'About' },
  { slug: 'achievements', label: 'Achievements' },
  { slug: 'services', label: 'Services' },
  { slug: 'gallery', label: 'Gallery' },
  { slug: 'faqs', label: 'FAQs' },
  { slug: 'contact', label: 'Contact' },
];

export const telHref = (phone) => 'tel:' + phone.replace(/\s+/g, '');
