// The two branch galleries, from the live /hyderabad/gallery and
// /andhrapradesh/gallery pages (crawled 30 Oct 2026). Every photograph the live
// page shows appears once, grouped into sets drawn from what the photos show;
// inside a set the live order is kept, except that Hyderabad's events set lifts
// p5 (third on the live page) to the front as its lead photograph.
//
// De-duplicated from the live pages:
// - Hyderabad: Gallery2/p38.jpg and p39.jpg are the same file (one kept, p38).
// - Andhra Pradesh: p24 is listed twice, and p38/p39 are the same file (one of each kept).
//
// Alt text describes what is in the frame. No person is named and no award is
// titled unless the photograph shows the words legibly.

// Alt text per photograph, keyed by the file's base name before any hash.
const ALT = {
  // The Miyapur office opening
  'IMG-20241007-WA0077': 'Cutting a red ribbon at the glass door of the new office, under a garland of flowers',
  'IMG-20241007-WA0089': 'Guests with scissors at the red ribbon across the office door',
  'IMG-20241007-WA0091': 'A handshake at the office door once the ribbon is cut',
  'IMG-20241007-WA0097': 'A couple at the glass door of the office, a priest in saffron beside them',
  'IMG-20241007-WA0093': 'A couple bowing as they step across the office threshold',
  'IMG-20241007-WA0084': 'A priest performing a puja at a table of fruit, flowers and a coconut',
  'IMG-20241007-WA0081': 'Lighting incense at the puja table inside the office',
  'IMG-20241007-WA0056': 'A man in white standing in the new office, flowers on the desk beside him',
  'IMG-20241007-WA0076': 'Family and guests gathered in the office for the puja',
  'IMG-20241007-WA0053': 'A priest and a seated couple at the puja table, fruit and flowers before them',
  'IMG-20241007-WA0054': 'A couple holding a puja plate in the office',
  'IMG-20241007-WA0088': 'The office doorway framed in an arch of flowers',
  'IMG-20241007-WA0055': 'Framed prints on the office wall',
  'IMG-20241007-WA0096': 'Guests on a red carpet laid outside the building',
  'IMG-20241007-WA0082': 'Men talking beside a black car outside the building',
  'IMG-20241007-WA0095': 'Guests arriving past a black car, the metro line behind them',
  'IMG-20241007-WA0071': 'The team walking a red carpet to the office, under the metro line',
  'IMG-20241007-WA0094': 'Guests walking the red carpet down the lane to the office',
  'IMG-20241007-WA0074': 'A guest making an offering at the puja table beside a marigold garland',
  'IMG-20241007-WA0047': 'A woman holding a bouquet cuts the red ribbon at the office door',
  'IMG-20241007-WA0044': 'The Nalluri Associates home loans signboard outside the building',
  'IMG-20241007-WA0066': 'Two men in white on the red carpet outside the building',
  // Guests at the new office
  'IMG-20241007-WA0078': 'A memento presented to a young guest in the office',
  'IMG-20241007-WA0092': 'Four women and a man standing together in the new office',
  'IMG-20241007-WA0075': 'Two men talking across a desk, the garlanded doorway behind them',
  'IMG-20241007-WA0079': 'Men standing and talking in the new office',
  'IMG-20241007-WA0086': 'Two men in white shirts smiling in the office',
  'IMG-20241007-WA0083': 'A potted plant handed over among a group of men',
  'IMG-20241007-WA0064': 'Guests seated around a desk in a cabin',
  'IMG-20241007-WA0080': 'Three men talking across a desk in a cabin',
  'IMG-20241007-WA0072': 'A woman in a blue sari receiving a bouquet of pink roses',
  'IMG-20241007-WA0067': 'A letter handed over in a cabin, a brass ornament held up beside it',
  'IMG-20241007-WA0090': 'A woman in a blue sari holding a bouquet between two men',
  'IMG-20241007-WA0063': 'A group holding up a large decorative plaque in the office',
  'IMG-20241007-WA0059': 'A man wearing a red shawl shaking hands with a guest',
  'IMG-20241007-WA0070': 'A black memento passing between two men in front of framed prints',
  'IMG-20241007-WA0073': 'A black memento presented among four men',
  'IMG-20241007-WA0061': 'A man in white handing a memento to a younger guest',
  'IMG-20241007-WA0057': 'Two men smiling as a memento changes hands',
  'IMG-20241007-WA0085': 'Guests in conversation around a desk',
  'IMG-20241007-WA0062': 'A woman in a blue sari standing by a desk where men sit talking',
  'IMG-20241007-WA0058': 'Three men seated around a desk, bouquets behind them',
  'IMG-20241007-WA0060': 'Guests seated around a desk with bouquets of flowers',
  'IMG-20241007-WA0065': 'A memento presented among a group of men',
  'IMG-20241007-WA0068': 'A house-shaped wall clock presented among four guests',
  'IMG-20241009-WA0010': 'Men talking around a desk in a cabin',
  'IMG-20241007-WA0048': 'Two women exchanging a bouquet, two men between them',
  'IMG-20241009-WA0009': 'Guests seated around a desk, a woman among them',
  'IMG-20241009-WA0008': 'The office team and guests in a row, thumbs up',
  'IMG-20241009-WA0007': 'A house-shaped wall clock presented to two guests wearing lanyards',
  'IMG-20241009-WA0006': 'Men in conversation around a desk',
  'IMG-20241007-WA0046': 'Two women and a man seated at a desk in a cabin',
  'IMG-20241009-WA0003': 'Two men seated at a desk',
  'IMG-20241007-WA0049': 'Two men holding a black memento together',
  'IMG-20241007-WA0051': 'A house-shaped wall clock handed to a guest in a checked shirt',
  'IMG-20241007-WA0052': 'Four men standing together in the office',
  // Trophies, plaques and certificates
  'IMG-20241209-WA0014': 'A framed silver plaque against a dark curtain',
  'IMG-20241209-WA0019': 'A trophy with a clock face, in a clear case',
  'IMG-20241209-WA0020': 'A framed Indiabulls Home Loans certificate of association',
  'IMG-20241209-WA0021': 'A slim trophy on a stand tied with ribbon',
  'IMG-20241209-WA0023': 'A gold plaque on a wooden mount',
  'IMG-20241209-WA0024': 'A glass trophy with the LIC HFL logo on a tall stand',
  'IMG-20241209-WA0025': 'A framed letter',
  'IMG-20241209-WA0026': 'A gold plaque with the LIC HFL logo',
  'IMG-20241209-WA0027': 'A gold trophy topped with a round emblem',
  'IMG-20241209-WA0028': 'A framed IDBI Bank certificate of achievement',
  'IMG-20241209-WA0029': 'A star-topped trophy on a dark stand',
  'IMG-20241209-WA0030': 'A Reliance certificate of association made out to Nalluri Associates',
  'IMG-20241209-WA0031': 'A gold trophy with a star and the LIC HFL logo',
  'IMG-20241209-WA0032': 'A framed certificate',
  'IMG-20241209-WA0033': 'A framed certificate with a blue border',
  // Rooms and corridors
  'IMG-20241209-WA0015': 'A corridor running past a wall sign with an arrow',
  'IMG-20241209-WA0016': 'A lit corridor leading to an open office door, a plant on either side',
  'IMG-20241209-WA0017': 'A doorway opening onto a long corridor',
  'IMG-20241209-WA0018': 'A long white corridor with a plant on either side',
  'IMG-20241209-WA0022': 'An office door signed Nalluri Associates in Telugu, a plant on either side',
  // The p series: events, awards and a ribbon cutting
  p1: 'A guest in a suit receiving a gift in an office, a table with red skirting behind',
  p3: 'Four men standing in an office in front of shelves of awards',
  p5: 'A man wearing a crown receiving a framed certificate, an audience seated in front',
  p6: 'A speaker on a stage before a large screen',
  p7: 'Six men posing together at an event',
  p8: 'A row of men in jackets posing together at an event',
  p10: 'Two men standing together in an office',
  p11: 'A red folder handed over at an event, balloons behind',
  p12: 'A man in a garland and shawl among a crowd at an event',
  p13: 'A man in white seated at a desk with a bouquet',
  p14: 'Four men in masks in a doorway hung with marigolds, one cutting a blue ribbon',
  p15: 'A man in a waistcoat seated at a desk with a printer and a monitor',
  p16: 'Three men standing together in an office',
  p17: 'A young woman handing a small potted plant to a man in a waistcoat',
  p18: 'Four men standing in an office, three of them in masks',
  p19: 'A young woman and two men exchanging a gift bag',
  p20: 'The blue ribbon being cut, guests in masks and face shields',
  p21: 'A potted plant presented beside an LIC HFL gift bag',
  p22: 'A young woman handing a potted plant to a man in a mask',
  p23: 'Four guests standing by a doorway hung with marigolds',
  p24: 'The Nalluri Associates signboard above a doorway hung with marigolds',
  p25: 'Trophies, plaques and framed certificates on the Nalluri Associates award shelf',
  p29: 'A young woman presenting a gift to a man in a face shield',
  p30: 'Two men holding a framed certificate on stage',
  p31: 'Four men holding a small trophy in front of a backdrop',
  p33: 'Three men in masks after the ribbon cutting',
  p34: 'A red folder presented to a man in a cream kurta',
  p35: 'Two men in front of a GIC Housing Finance banner',
  p36: 'A bouquet of yellow flowers presented at a meeting',
  p37: 'A framed certificate presented on a stage, an audience in front',
  p38: 'Two views of an office: a desk under shelves of awards, and staff at their desks',
  p40: 'A man speaking into a microphone before a projected slide',
  p41: 'Four men posing together at an event',
  p42: 'A gift in red wrapping handed over in an office',
  p43: 'A young woman with two men, one of them in a mask',
};

// Hyderabad's live gallery serves /Gallery2/<name>.jpg; the full-size copies live
// in images/gallery/, the 640px thumbnails in images/thumb/.
const hyd = (name) => ({ key: name, full: `images/gallery/${name}.jpg`, thumb: `images/thumb/${name}.jpg`, alt: ALT[name] });
// Andhra Pradesh's serves /_next/static/media/<name>.<hash>.jpg; copies in images/media/.
const ap = (file) => {
  const key = file.split('.')[0];
  return { key, full: `images/media/${file}.jpg`, thumb: `images/thumb/${file}.jpg`, alt: ALT[key] };
};

const D7 = (n) => `IMG-20241007-WA00${n}`;
const D9 = (n) => `IMG-20241009-WA00${n}`;
const D12 = (n) => `IMG-20241209-WA00${n}`;

// layout: 'lead' (the first photo wide, the rest beneath), 'aside' (the head
// held beside the photos), 'band' (on paper-2), 'pair' (two photos filling the row).
export const galleries = {
  hyderabad: [
    {
      id: 'opening',
      title: 'Opening the Miyapur office',
      line: 'The red carpet under the metro line, the ribbon at the door and the puja inside.',
      layout: 'lead',
      photos: [D7('77'), D7('89'), D7('91'), D7('97'), D7('93'), D7('84'), D7('81'), D7('56'), D7('76'), D7('53'), D7('54'), D7('88'), D7('55'), D7('96'), D7('82'), D7('95'), D7('71'), D7('94'), D7('74'), D7('47'), D7('44'), D7('66')].map(hyd),
    },
    {
      id: 'guests',
      title: 'Guests at the new office',
      line: 'Bouquets, plants and mementos, and conversations across the new desks.',
      layout: 'aside',
      photos: [D7('78'), D7('92'), D7('75'), D7('79'), D7('86'), D7('83'), D7('64'), D7('80'), D7('72'), D7('67'), D7('90'), D7('63'), D7('59'), D7('70'), D7('73'), D7('61'), D7('57'), D7('85'), D7('62'), D7('58'), D7('60'), D7('65'), D7('68'), D9('10'), D7('48'), D9('09'), D9('08'), D9('07'), D9('06'), D7('46'), D9('03'), D7('49'), D7('51'), D7('52')].map(hyd),
    },
    {
      id: 'awards',
      title: 'Trophies, plaques and certificates',
      line: 'Each one photographed against a dark curtain, then all of them together on the office shelf.',
      layout: 'band',
      photos: [D12('14'), D12('19'), D12('20'), D12('21'), D12('23'), D12('24'), D12('25'), D12('26'), D12('27'), D12('28'), D12('29'), D12('30'), D12('31'), D12('32'), D12('33'), 'p25'].map(hyd),
    },
    {
      id: 'rooms',
      title: 'Rooms and corridors',
      line: 'The corridor to a door signed Nalluri Associates in Telugu, and two views of an office.',
      layout: 'aside',
      photos: [D12('15'), D12('16'), D12('17'), D12('18'), D12('22'), 'p38'].map(hyd),
    },
    {
      id: 'events',
      title: 'Events and awards',
      line: 'Certificates, gifts and bouquets presented on stages and at meetings.',
      layout: 'lead',
      photos: ['p5', 'p1', 'p3', 'p6', 'p7', 'p8', 'p10', 'p11', 'p12', 'p34', 'p35', 'p36', 'p37', 'p40', 'p41'].map(hyd),
    },
    {
      id: 'ribbon',
      title: 'A ribbon cutting',
      line: 'Guests in masks at a blue ribbon, under marigolds.',
      layout: 'aside',
      photos: ['p13', 'p14', 'p15', 'p16', 'p18', 'p20', 'p21', 'p33'].map(hyd),
    },
  ],
  andhrapradesh: [
    {
      id: 'ribbon',
      title: 'A ribbon cutting',
      line: 'Guests in masks at a blue ribbon under marigolds, the Nalluri Associates signboard, and plants given in welcome.',
      layout: 'lead',
      photos: ['p14.0f51f40f', 'p20.2c01f1b8', 'p13.2d456eca', 'p15.c6b6ed12', 'p16.9a3cf9d1', 'p17.183ab128', 'p18.d065aeac', 'p19.7ad9f268', 'p21.cae802ab', 'p22.38807eba', 'p23.34fdc54d', 'p24.7ac859de', 'p29.5cbe16f4', 'p33.5e035444', 'p43.6fcf83fa'].map(ap),
    },
    {
      id: 'events',
      title: 'Events and awards',
      line: 'Certificates, trophies, gifts and bouquets presented on stages and at meetings.',
      layout: 'aside',
      photos: ['p1.0d268160', 'p3.a64943e7', 'p5.205ca829', 'p6.1c53df94', 'p7.f50c2c30', 'p8.a8b512bb', 'p10.12299bbf', 'p11.f4700bc6', 'p12.3b0c613a', 'p30.dd2dc9b4', 'p31.67430bbc', 'p34.899d39c2', 'p35.0527ce34', 'p36.e3ec4ea9', 'p37.7e46c7ae', 'p41.df487f7b', 'p42.78e2ccfa', 'p40.1859dabe'].map(ap),
    },
    {
      id: 'shelf',
      title: 'The award shelf and the office',
      line: 'Trophies and certificates on the shelf, and two views of an office.',
      layout: 'pair',
      photos: ['p25.1894a450', 'p38.a870b2ba'].map(ap),
    },
  ],
};

for (const [loc, sets] of Object.entries(galleries)) {
  for (const set of sets) for (const p of set.photos) if (!p.alt) throw new Error(`gallery: no alt text for ${p.key} (${loc})`);
}
