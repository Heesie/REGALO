/* REGALO — placeholder catalogue. Names, prices and colours follow the Figma
   "Shop (fase 2)" design and stay placeholders until the collection is final. */
(function () {
  const C = {
    sand: { name: 'Sand', hex: '#d8c8ad' },
    ecru: { name: 'Ecru', hex: '#efe9dd' },
    espresso: { name: 'Espresso', hex: '#4a3a31' },
    olive: { name: 'Olive', hex: '#6b6a4b' },
    navy: { name: 'Navy', hex: '#2b3140' },
    stone: { name: 'Stone', hex: '#b9afa6' },
    terracotta: { name: 'Terracotta', hex: '#9c4a36' },
  };

  const products = [
    { id: 'crew-tee', name: 'Signature Crew-neck Tee', cat: 'Signature Tops', price: 95, img: 'p-crew-tee', colours: [C.sand, C.ecru, C.espresso],
      desc: 'A mid-weight cotton tee with a clean crew neck and relaxed shoulder. Made to keep its shape, wash after wash.',
      fabric: 'Mid-weight 100% cotton jersey with a soft, dry hand. Relaxed fit with a clean crew neck that keeps its shape.' },
    { id: 'tank', name: 'Signature Tank Top', cat: 'Signature Tops', price: 75, img: 'p-tank', colours: [C.ecru, C.espresso] },
    { id: 'cardigan', name: 'Fine Knit Cardigan', cat: 'Fine Knitwear', price: 245, img: 'p-cardigan', colours: [C.sand, C.espresso] },
    { id: 'pleated', name: 'Pleated Tailored Trouser', cat: 'Tailored Trousers', price: 185, img: 'p-pleated', colours: [C.sand, C.stone, C.ecru] },
    { id: 'wide', name: 'Wide Tailored Trouser', cat: 'Tailored Trousers', price: 195, img: 'p-wide', colours: [C.sand, C.ecru, C.espresso, C.stone] },
    { id: 'linen', name: 'Relaxed Linen Trouser', cat: 'Contemporary Trousers', price: 165, img: 'p-linen', colours: [C.ecru, C.olive], tag: 'sold' },
    { id: 'polo', name: 'Fine Knit Polo', cat: 'Fine Knitwear', price: 175, img: 'p-polo', colours: [C.espresso, C.sand, C.navy] },
    { id: 'merino', name: 'Merino Crew Sweater', cat: 'Fine Knitwear', price: 225, img: 'p-merino', colours: [C.ecru, C.stone, C.navy], tag: 'new' },
    { id: 'chino', name: 'Relaxed Pleated Chino', cat: 'Contemporary Trousers', price: 155, img: 'p-chino', colours: [C.ecru, C.sand, C.olive] },
    { id: 'track-jacket', name: 'Leisure Track Jacket', cat: 'Leisurewear', price: 195, img: 'p-track-jacket', colours: [C.ecru, C.espresso], tag: 'new' },
    { id: 'track-pant', name: 'Leisure Track Pant', cat: 'Leisurewear', price: 165, img: 'p-track-pant', colours: [C.sand, C.espresso] },
    { id: 'longsleeve', name: 'Signature Long-sleeve Tee', cat: 'Signature Tops', price: 115, img: 'p-longsleeve', colours: [C.ecru, C.sand, C.espresso] },
    { id: 'wool', name: 'Wool Blend Trouser', cat: 'Tailored Trousers', price: 215, img: 'p-wool', colours: [C.espresso, C.stone] },
    { id: 'cap', name: 'Signature Cap', cat: 'Accessories', price: 55, img: 'p-cap', colours: [C.ecru, C.olive], tag: 'new' },
    { id: 'linen-blazer', name: 'Unstructured Linen Blazer', cat: 'Shirts & Jackets', price: 345, img: 'p-linen-blazer', colours: [C.ecru, C.sand], tag: 'new',
      desc: 'A soft, unlined blazer in washed linen with natural shoulders and patch pockets. Worn open over a tank or folded over the shoulder.' },
    { id: 'overshirt', name: 'Linen Overshirt', cat: 'Shirts & Jackets', price: 165, img: 'p-overshirt', colours: [C.olive, C.sand],
      desc: 'A relaxed overshirt in garment-dyed linen with two flap pockets. Easy on its own, or layered open over a tee.' },
    { id: 'cable-knit', name: 'Cable Knit Sweater', cat: 'Fine Knitwear', price: 235, img: 'p-cable-knit', colours: [C.ecru, C.stone],
      desc: 'A crew-neck sweater in soft cotton-cashmere with a classic cable. Light enough for summer evenings.' },
    { id: 'mock-neck', name: 'Ribbed Mock-neck Sweater', cat: 'Fine Knitwear', price: 255, img: 'p-mock-neck', colours: [C.espresso, C.sand],
      desc: 'A chunky ribbed knit with a low mock neck, in a wool and alpaca blend. Made for cooler days by the coast.' },
  ];

  // Lookbook (CMS): each look lists the pieces worn, the colour as styled and
  // where the hotspot sits on the photo (x / y in % of the image).
  const looks = [
    { id: 'look-01', title: 'Linen at noon', img: 'look-01', w: 1052, h: 1400,
      desc: 'An unstructured linen blazer over a fine tank, with wide pleated trousers that move with you. Made for long, warm afternoons.',
      items: [
        { id: 'linen-blazer', colour: 'Ecru', x: 36, y: 34 },
        { id: 'tank', colour: 'Ecru', x: 54, y: 29 },
        { id: 'wide', colour: 'Stone', x: 52, y: 62 },
      ] },
    { id: 'look-02', title: 'The white edit', img: 'look-02', w: 933, h: 1400,
      desc: 'A cable knit, pleated trousers and a linen blazer slung over the shoulder. Tonal whites, easy from morning to evening.',
      items: [
        { id: 'cable-knit', colour: 'Ecru', x: 31, y: 47 },
        { id: 'linen-blazer', colour: 'Ecru', x: 47, y: 55 },
        { id: 'pleated', colour: 'Ecru', x: 34, y: 72 },
      ] },
    { id: 'look-03', title: 'Path through the hills', img: 'look-03', w: 787, h: 1400,
      desc: 'A ribbed mock-neck in deep espresso with wide trousers in sand. Texture over contrast, for cooler days by the coast.',
      items: [
        { id: 'mock-neck', colour: 'Espresso', x: 50, y: 31 },
        { id: 'wide', colour: 'Sand', x: 50, y: 62 },
      ] },
    { id: 'look-04', title: 'Via Monte Napoleone', img: 'look-04', w: 933, h: 1400,
      desc: 'A fine knit polo tucked into pleated trousers. Quietly sharp, from the office to the aperitivo.',
      items: [
        { id: 'polo', colour: 'Espresso', x: 52, y: 28 },
        { id: 'pleated', colour: 'Sand', x: 45, y: 62 },
      ] },
    { id: 'look-05', title: 'Afternoon shade', img: 'look-05', w: 1120, h: 1400,
      desc: 'A linen overshirt in olive, a knit thrown over the shoulders and relaxed chinos. Layered, light and unhurried.',
      items: [
        { id: 'overshirt', colour: 'Olive', x: 55, y: 62 },
        { id: 'cardigan', colour: 'Sand', x: 78, y: 50 },
        { id: 'chino', colour: 'Sand', x: 44, y: 93 },
      ] },
    { id: 'look-06', title: 'Golden hour', img: 'look-06', w: 785, h: 1400,
      desc: 'A ribbed knit polo with wool trousers in espresso. Warm tones for the drive home.',
      items: [
        { id: 'polo', colour: 'Sand', x: 55, y: 55 },
        { id: 'wool', colour: 'Espresso', x: 55, y: 79 },
      ] },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const unavailable = { 'crew-tee': ['XS'], tank: ['XS'], polo: ['XL'], wide: ['XS'] };

  products.forEach((p) => {
    p.desc ||= `Cut from natural fabrics with considered weights and careful finishing. A ${p.cat.toLowerCase().replace(/s$/, '')} designed to stay relevant for years.`;
    p.fabric ||= 'Natural fibres only, chosen for how they feel and how they age. Each piece carries a short note on its fabric, weight and finishing.';
    p.unavailable = unavailable[p.id] || [];
  });

  const euro = (n) => '€ ' + n.toFixed(2).replace('.', ',');

  window.Regalo = Object.assign(window.Regalo || {}, {
    products,
    looks,
    findLook: (id) => looks.find((l) => l.id === id),
    sizes,
    euro,
    find: (id) => products.find((p) => p.id === id),
    img: (name) => `assets/img/${name}.jpg`,
  });
})();
