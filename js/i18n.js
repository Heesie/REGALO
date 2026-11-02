/* REGALO — EN / NL language switch.
   The pages are written in English. This script runs in <head> and watches the
   DOM with a MutationObserver, so every text node and label (including content
   rendered later by main.js) is swapped before it is painted. English stays the
   source of truth: each node remembers its English text, so switching back is
   lossless. */
(function () {
  const NL = {
    // Shared: header, menu, bag, footer
    'Skip to content': 'Naar de inhoud',
    'REGALO home': 'REGALO home',
    'Main': 'Hoofdmenu',
    'Our Story': 'Ons verhaal',
    'Language': 'Taal',
    'Open bag': 'Tas openen',
    'Bag': 'Tas',
    'Menu': 'Menu',
    'Mobile': 'Mobiel menu',
    'Join the list': 'Schrijf je in',
    'Join the list →': 'Schrijf je in →',
    'Your bag': 'Je tas',
    'Close bag': 'Tas sluiten',
    'Close': 'Sluiten',
    'Subtotal': 'Subtotaal',
    'Shipping calculated at checkout. Incl. VAT.': 'Verzendkosten worden berekend bij het afrekenen. Incl. btw.',
    'Checkout': 'Afrekenen',
    'Timeless Elegance That Endures.': 'Tijdloze elegantie die blijft.',
    'Explore': 'Ontdek',
    'The Collection': 'De collectie',
    'Follow': 'Volg ons',
    'Help': 'Hulp',
    'Manage preferences': 'Voorkeuren beheren',
    'Secure checkout': 'Veilig afrekenen',
    'Your bag is empty.': 'Je tas is leeg.',
    'Your bag is empty': 'Je tas is leeg',
    'Discover the collection': 'Ontdek de collectie',
    'Shop the collection': 'Bekijk de collectie',
    'Decrease': 'Minder',
    'Increase': 'Meer',
    'Remove': 'Verwijderen',
    'Coming soon': 'Binnenkort',
    'Sold out': 'Uitverkocht',
    'New': 'Nieuw',
    'Color': 'Kleur',
    'Add to bag': 'In mijn tas',
    'Added ✓': 'Toegevoegd ✓',
    'Please select a size': 'Kies eerst een maat',
    'Please enter a valid email address.': 'Vul een geldig e-mailadres in.',
    'This field is required.': 'Dit veld is verplicht.',
    'Drag to explore': 'Sleep om te ontdekken',
    'Swipe to explore': 'Swipe om te ontdekken',
    'Read More': 'Lees meer',
    'Read more': 'Lees meer',

    // Colours
    'Sand': 'Zand', 'Ecru': 'Ecru', 'Espresso': 'Espresso', 'Olive': 'Olijf',
    'Navy': 'Marineblauw', 'Stone': 'Steen', 'Terracotta': 'Terracotta',

    // Join form
    'Be the first to discover REGALO.': 'Ontdek REGALO als eerste.',
    'Email address': 'E-mailadres',
    'your@email.com': 'jouw@email.nl',
    'We respect your inbox. Unsubscribe anytime.': 'We gaan zorgvuldig om met je inbox. Uitschrijven kan altijd.',
    'Collection & launch announcements': 'Nieuws over collecties en de lancering',
    'News about the first launch and future collections.': 'Nieuws over de eerste lancering en toekomstige collecties.',
    'Inside Regalo': 'Inside Regalo',
    'Stories, inspiration and updates on the brand.': 'Verhalen, inspiratie en updates over het merk.',
    "Thank you — you're on the list.": 'Dank je wel — je staat op de lijst.',
    "We'll write when the first collection opens.": 'We laten het je weten zodra de eerste collectie opent.',

    // Home
    'REGALO — Timeless Elegance': 'REGALO — Tijdloze elegantie',
    'REGALO is a modern European fashion and lifestyle house. Timeless elegance, refined confidence and enduring quality.': 'REGALO is een modern Europees mode- en lifestylehuis. Tijdloze elegantie, verfijnd zelfvertrouwen en blijvende kwaliteit.',
    'Introduction': 'Introductie',
    'Close-up of a vintage sewing machine in soft natural light': 'Close-up van een vintage naaimachine in zacht daglicht',
    'Timeless Elegance': 'Tijdloze elegantie',
    'Discover Our Story': 'Ontdek ons verhaal',
    'Scroll': 'Scroll',
    'Designed for Elegance': 'Ontworpen voor elegantie',
    'Created for generations.': 'Gemaakt voor generaties.',
    'The first collection': 'De eerste collectie',
    'Signature Tops, Fine Knitwear and Tailored Trousers. Join the list to hear first when the collection opens.': 'Signature Tops, Fine Knitwear en Tailored Trousers. Schrijf je in en hoor als eerste wanneer de collectie opent.',
    'Lookbook': 'Lookbook',
    'Mediterranean warmth, natural light.': 'Mediterrane warmte, natuurlijk licht.',
    'Previous look': 'Vorige look',
    'Next look': 'Volgende look',
    'Look 01 — linen suit in warm evening light': 'Look 01 — linnen pak in warm avondlicht',
    'Look 02 — white shirt and trousers by a classic car': 'Look 02 — wit overhemd en pantalon bij een klassieke auto',
    'Look 03 — knitwear and pleated trousers': 'Look 03 — breiwerk en pantalon met plooien',
    'Look 04 — relaxed tailoring': 'Look 04 — ontspannen tailoring',
    'Look 05 — fine knit polo': 'Look 05 — fijngebreide polo',
    'Look 06 — summer tailoring': 'Look 06 — zomerse tailoring',
    'Timeless by Design': 'Tijdloos door ontwerp',
    'Refined confidence, inspired by the warmth of the Mediterranean.': 'Verfijnd zelfvertrouwen, geïnspireerd door de warmte van de Middellandse Zee.',
    'The REGALO signature brings a youthful perspective to timeless elegance. Considered fabrics and modern silhouettes balance refinement with ease, allowing room for movement, individuality and everyday life.': 'De REGALO-signatuur geeft tijdloze elegantie een jeugdige blik. Doordachte stoffen en moderne silhouetten brengen verfijning en gemak in balans, met ruimte voor beweging, individualiteit en het dagelijks leven.',
    'We believe that true elegance does not demand attention. It speaks through confidence, simplicity and refinement.': 'Wij geloven dat echte elegantie geen aandacht opeist. Ze spreekt door zelfvertrouwen, eenvoud en verfijning.',

    // Our Story
    'Our Story — REGALO': 'Ons verhaal — REGALO',
    'Not to create more. But to create better. The story behind REGALO.': 'Niet om meer te maken, maar om beter te maken. Het verhaal achter REGALO.',
    'Two men resting on a stone wall above the Mediterranean sea': 'Twee mannen die uitrusten op een stenen muur boven de Middellandse Zee',
    'Not to create more.': 'Niet om meer te maken.',
    'But to create better.': 'Maar om beter te maken.',
    'True elegance has become increasingly rare.': 'Echte elegantie is steeds zeldzamer geworden.',
    'In a world where fashion moves faster than ever, trends come and go and collections disappear within weeks. Clothing is often designed for the moment rather than for a lifetime.': 'In een wereld waarin mode sneller beweegt dan ooit, komen en gaan trends en verdwijnen collecties binnen enkele weken. Kleding wordt vaak ontworpen voor het moment in plaats van voor een leven lang.',
    'REGALO was created as a response to that reality. Not to chase trends. Not to compete in fast fashion. But to create timeless luxury through craftsmanship, thoughtful design and uncompromising quality.': 'REGALO is ontstaan als antwoord op die realiteit. Niet om trends na te jagen. Niet om mee te doen aan fast fashion. Maar om tijdloze luxe te creëren met vakmanschap, doordacht ontwerp en compromisloze kwaliteit.',
    'We believe that true elegance does not demand attention. It speaks through confidence, simplicity and refinement. Style should never define who you are. It should strengthen who you already are.': 'Wij geloven dat echte elegantie geen aandacht opeist. Ze spreekt door zelfvertrouwen, eenvoud en verfijning. Stijl hoort niet te bepalen wie je bent. Stijl hoort te versterken wie je al bent.',
    'Every garment begins with the same question': 'Elk kledingstuk begint met dezelfde vraag',
    "Will this still deserve a place in someone's wardrobe twenty years from now?": 'Verdient dit over twintig jaar nog steeds een plek in iemands kledingkast?',
    'If the answer is no, it does not belong to REGALO.': 'Als het antwoord nee is, hoort het niet bij REGALO.',
    'Silhouette in movement, wide trousers': 'Silhouet in beweging, wijde pantalon',
    'Youthful elegance, made for movement.': 'Jeugdige elegantie, gemaakt om in te bewegen.',
    'The REGALO signature brings a youthful perspective to timeless elegance. Considered fabrics and modern silhouettes balance refinement with ease, allowing room for movement, individuality and everyday life. Inspired by the warmth of the Mediterranean.': 'De REGALO-signatuur geeft tijdloze elegantie een jeugdige blik. Doordachte stoffen en moderne silhouetten brengen verfijning en gemak in balans, met ruimte voor beweging, individualiteit en het dagelijks leven. Geïnspireerd door de warmte van de Middellandse Zee.',
    'Materials & Quality': 'Materialen & kwaliteit',
    'Quality you can feel, and see over time.': 'Kwaliteit die je voelt, en na jaren nog ziet.',
    'Every piece starts with the fabric. We work only with natural materials and partners who share our standard for finishing.': 'Elk stuk begint bij de stof. We werken alleen met natuurlijke materialen en met partners die onze standaard voor afwerking delen.',
    'Detail of fabric structure': 'Detail van de stofstructuur',
    'Natural fabrics': 'Natuurlijke stoffen',
    'Cotton, wool and viscose. No synthetic blends, chosen for how they feel and how they age.': 'Katoen, wol en viscose. Geen synthetische mengsels, gekozen om hoe ze voelen en hoe ze ouder worden.',
    'Detail of a box pleat and seam': 'Detail van een stolpplooi en naad',
    'Considered construction': 'Doordachte constructie',
    'Box-pleated trousers, clean seams and a fit that sits right. Details you notice when you wear them.': 'Pantalons met stolpplooien, strakke naden en een pasvorm die klopt. Details die je merkt als je ze draagt.',
    'Tailor at work in the atelier': 'Kleermaker aan het werk in het atelier',
    'Made by specialists': 'Gemaakt door specialisten',
    'Produced with partners known for their craft. Countries and makers will be shared once confirmed.': 'Geproduceerd met partners die bekendstaan om hun vakmanschap. Landen en makers delen we zodra ze bevestigd zijn.',
    'Beyond Clothing': 'Meer dan kleding',
    'Not for today. But for generations.': 'Niet voor vandaag. Maar voor generaties.',
    'Our ambition reaches beyond clothing alone. REGALO is built as a modern European fashion and lifestyle house, where every detail reflects the same philosophy: timeless elegance, refined confidence and enduring quality.': 'Onze ambitie reikt verder dan kleding alleen. REGALO is opgebouwd als een modern Europees mode- en lifestylehuis, waarin elk detail dezelfde filosofie weerspiegelt: tijdloze elegantie, verfijnd zelfvertrouwen en blijvende kwaliteit.',
    'Mediterranean light through arches': 'Mediterraan licht door bogen',
    'Hands and fabric detail': 'Handen en stofdetail',
    'Friends on a terrace': 'Vrienden op een terras',
    'Discover what we are making.': 'Ontdek waar we aan werken.',

    // Shop (coming soon)
    'The Collection · Coming soon — REGALO': 'De collectie · Binnenkort — REGALO',
    'Signature pieces in natural fabrics and modern silhouettes. The first REGALO collection is coming soon.': 'Signature pieces in natuurlijke stoffen en moderne silhouetten. De eerste REGALO-collectie komt binnenkort.',
    'House of Regalo': 'House of Regalo',
    'Signature pieces in natural fabrics and modern silhouettes, designed to remain relevant for years to come. The first collection is coming soon.': 'Signature pieces in natuurlijke stoffen en moderne silhouetten, ontworpen om jarenlang relevant te blijven. De eerste collectie komt binnenkort.',
    'Man in a linen jacket and white trousers sitting on a wooden sailing boat': 'Man in een linnen jasje en witte broek op een houten zeilboot',
    'Where the collection begins': 'Waar de collectie begint',
    'A plain white T-shirt on a wooden hanger': 'Een effen wit T-shirt aan een houten hanger',
    'Crew-neck T-shirts and tank tops': 'T-shirts met ronde hals en tanktops',
    'Man in a soft grey cardigan among trees': 'Man in een zacht grijs vest tussen de bomen',
    'Cardigans and knitwear': 'Vesten en breiwerk',
    'Man in tailored trousers standing in a doorway': 'Man in een pantalon op maat in een deuropening',
    'Pleated trousers, tailored fit': 'Pantalons met plooien, getailleerde pasvorm',
    'More categories follow as the collection grows: Contemporary Trousers, Leisurewear and Accessories.': 'Meer categorieën volgen naarmate de collectie groeit: Contemporary Trousers, Leisurewear en Accessories.',
    'Every collection should remain relevant for the next twenty years.': 'Elke collectie moet de komende twintig jaar relevant blijven.',
    'Natural fabrics, considered weights and careful finishing. Each piece comes with a short story about its material and craft.': 'Natuurlijke stoffen, doordachte gewichten en zorgvuldige afwerking. Bij elk stuk hoort een kort verhaal over het materiaal en het vakmanschap.',
    'The first pieces': 'De eerste stukken',
    '9 pieces arriving with the first collection': '9 stukken die met de eerste collectie verschijnen',

    // Collection (shop fase 2)
    'The Collection — REGALO': 'De collectie — REGALO',
    'Timeless pieces in natural fabrics. Designed to last, made to be worn.': 'Tijdloze stukken in natuurlijke stoffen. Ontworpen om lang mee te gaan, gemaakt om gedragen te worden.',
    'Categories': 'Categorieën',
    'All': 'Alles',
    'Sort:': 'Sorteer:',
    'Sort products': 'Producten sorteren',
    'Newest': 'Nieuwste',
    'Price: low to high': 'Prijs: laag naar hoog',
    'Price: high to low': 'Prijs: hoog naar laag',
    'pieces': 'stukken',
    'Load more': 'Meer laden',
    'Material & Craft': 'Materiaal & vakmanschap',
    'Chosen for how it feels, and how it ages.': 'Gekozen om hoe het voelt, en hoe het ouder wordt.',
    'Mid-weight cotton, merino knits and wool blends. Every piece carries a short note on its fabric, weight and finishing.': 'Middelzwaar katoen, merino breiwerk en wolmengsels. Bij elk stuk hoort een korte toelichting over stof, gewicht en afwerking.',
    'Read about our fabrics': 'Lees over onze stoffen',
    'Detail of fabric and finishing': 'Detail van stof en afwerking',
    'Comfort, considered.': 'Comfort, doordacht.',
    'Tracksuits in soft cotton and wool, cut with the same care as our tailoring. From the morning walk to the evening terrace.': 'Trainingspakken van zacht katoen en wol, gesneden met dezelfde zorg als onze tailoring. Van de ochtendwandeling tot het terras in de avond.',
    'Shop Leisurewear': 'Bekijk Leisurewear',
    'Man in white on a terrace overlooking the sea': 'Man in het wit op een terras met uitzicht op zee',
    'Tijdelijke inhoud: productnamen, prijzen en kleuren zijn placeholders tot de collectie definitief is.': 'Tijdelijke inhoud: productnamen, prijzen en kleuren zijn placeholders tot de collectie definitief is.',
    'Shipping across the EU': 'Verzending binnen de EU',
    'Delivered with tracking. Countries and rates follow at launch.': 'Bezorgd met track & trace. Landen en tarieven volgen bij de lancering.',
    'Natural fabrics only': 'Alleen natuurlijke stoffen',
    'Cotton, wool and viscose. No synthetic blends.': 'Katoen, wol en viscose. Geen synthetische mengsels.',
    'Size Guide on every piece': 'Maattabel bij elk stuk',
    'Garment measurements and fit notes next to each size.': 'Afmetingen en pasvormadvies bij elke maat.',

    // Product
    'Breadcrumb': 'Kruimelpad',
    'Enlarge image': 'Afbeelding vergroten',
    'Detail of collar and fabric': 'Detail van kraag en stof',
    'Alternative view': 'Andere weergave',
    'Worn on a Mediterranean coastal path': 'Gedragen op een mediterraan kustpad',
    'Colour:': 'Kleur:',
    'Size': 'Maat',
    'Size Guide': 'Maattabel',
    'Shipping across the EU · Natural fabrics only': 'Verzending binnen de EU · Alleen natuurlijke stoffen',
    'Details & Fabric': 'Details & stof',
    'Fit & Sizing': 'Pasvorm & maat',
    'Relaxed fit with a slightly dropped shoulder. True to size — take your usual size, or one size down for a closer fit. The model is 1.86 m and wears size M.': 'Ruime pasvorm met een iets verlaagde schouder. Valt normaal — kies je gebruikelijke maat, of een maat kleiner voor een nauwere pasvorm. Het model is 1,86 m en draagt maat M.',
    'Care Guide': 'Wasvoorschrift',
    'Wash at 30°C inside out with similar colours. Do not tumble dry; dry flat to keep the shape. Iron on low heat on the reverse.': 'Binnenstebuiten wassen op 30 °C met vergelijkbare kleuren. Niet in de droger; liggend drogen zodat het zijn vorm houdt. Op lage temperatuur strijken aan de binnenkant.',
    'We chose a mid-weight cotton jersey that feels dry and soft on the skin and keeps its shape over time. The crew neck is finished with a narrow rib so it lies flat, and the shoulder seam sits slightly dropped for an easy fit.': 'We kozen een middelzware katoenen jersey die droog en zacht aanvoelt op de huid en zijn vorm behoudt. De ronde hals is afgewerkt met een smalle boord zodat hij plat ligt, en de schoudernaad zit iets verlaagd voor een ontspannen pasvorm.',
    'Country of production and maker details will be added once confirmed.': 'Productieland en gegevens van de maker volgen zodra ze bevestigd zijn.',
    'Styled with': 'Combineer met',
    'Chest': 'Borst',
    'Length': 'Lengte',
    'Shoulder': 'Schouder',
    'Garment measurements, laid flat. Placeholder values until the final fit samples are approved.': 'Afmetingen van het kledingstuk, plat gemeten. Voorlopige waarden tot de definitieve pasmodellen zijn goedgekeurd.',
    'A mid-weight cotton tee with a clean crew neck and relaxed shoulder. Made to keep its shape, wash after wash.': 'Een middelzwaar katoenen T-shirt met een strakke ronde hals en ontspannen schouder. Gemaakt om zijn vorm te houden, was na was.',
    'Mid-weight 100% cotton jersey with a soft, dry hand. Relaxed fit with a clean crew neck that keeps its shape.': 'Middelzware jersey van 100% katoen met een zachte, droge aanraking. Ruime pasvorm met een strakke ronde hals die zijn vorm houdt.',
    'Natural fibres only, chosen for how they feel and how they age. Each piece carries a short note on its fabric, weight and finishing.': 'Alleen natuurlijke vezels, gekozen om hoe ze voelen en hoe ze ouder worden. Bij elk stuk hoort een korte toelichting over stof, gewicht en afwerking.',

    // Look pages (shop the look)
    'Shop the look': 'Shop de look',
    'Shop the look: every piece from the REGALO lookbook, ready to add to your bag.': 'Shop de look: elk stuk uit het REGALO-lookbook, klaar om in je tas te leggen.',
    'pieces in this look': 'stukken in deze look',
    'Total for the look': 'Totaal voor de look',
    'Add the full look': 'Voeg de hele look toe',
    'Choose a size for each piece, or add pieces one by one.': 'Kies een maat per stuk, of voeg de stukken één voor één toe.',
    'Choose a size for each piece': 'Kies een maat voor elk stuk',
    'More looks': 'Meer looks',
    'Linen at noon': 'Linnen op het middaguur',
    'The white edit': 'In het wit',
    'Path through the hills': 'Over de heuvels',
    'Via Monte Napoleone': 'Via Monte Napoleone',
    'Afternoon shade': 'Middagschaduw',
    'Golden hour': 'Gouden uur',
    'An unstructured linen blazer over a fine tank, with wide pleated trousers that move with you. Made for long, warm afternoons.': 'Een ongevoerde linnen blazer over een fijne tanktop, met een wijde pantalon met plooien die met je meebeweegt. Gemaakt voor lange, warme middagen.',
    'A cable knit, pleated trousers and a linen blazer slung over the shoulder. Tonal whites, easy from morning to evening.': 'Een kabeltrui, een pantalon met plooien en een linnen blazer over de schouder. Wit op wit, makkelijk van ochtend tot avond.',
    'A ribbed mock-neck in deep espresso with wide trousers in sand. Texture over contrast, for cooler days by the coast.': 'Een geribde trui met lage col in diep espresso, met een wijde pantalon in zand. Textuur boven contrast, voor koelere dagen aan de kust.',
    'A fine knit polo tucked into pleated trousers. Quietly sharp, from the office to the aperitivo.': 'Een fijngebreide polo ingestopt in een pantalon met plooien. Ingetogen scherp, van kantoor tot aperitivo.',
    'A linen overshirt in olive, a knit thrown over the shoulders and relaxed chinos. Layered, light and unhurried.': 'Een linnen overshirt in olijf, een vest over de schouders en een ontspannen chino. Gelaagd, licht en zonder haast.',
    'A ribbed knit polo with wool trousers in espresso. Warm tones for the drive home.': 'Een geribde gebreide polo met een wollen pantalon in espresso. Warme tinten voor de rit naar huis.',
    'A soft, unlined blazer in washed linen with natural shoulders and patch pockets. Worn open over a tank or folded over the shoulder.': 'Een zachte, ongevoerde blazer van gewassen linnen met natuurlijke schouders en opgezette zakken. Open gedragen over een tanktop of over de schouder.',
    'A relaxed overshirt in garment-dyed linen with two flap pockets. Easy on its own, or layered open over a tee.': 'Een ontspannen overshirt van stukgeverfd linnen met twee klepzakken. Makkelijk op zichzelf, of open over een T-shirt.',
    'A crew-neck sweater in soft cotton-cashmere with a classic cable. Light enough for summer evenings.': 'Een trui met ronde hals van zacht katoen-kasjmier met een klassieke kabel. Licht genoeg voor zomeravonden.',
    'A chunky ribbed knit with a low mock neck, in a wool and alpaca blend. Made for cooler days by the coast.': 'Een grofgebreide geribde trui met een lage col, van een mengsel van wol en alpaca. Gemaakt voor koelere dagen aan de kust.',

    // Contact
    'Contact — REGALO': 'Contact — REGALO',
    'Send REGALO a message. We reply within one working day.': 'Stuur REGALO een bericht. We reageren binnen één werkdag.',
    'Send us a message': 'Stuur ons een bericht',
    "A question about a piece, sizing or the first collection? Write to us below and we'll get back to you personally.": 'Een vraag over een stuk, over maten of over de eerste collectie? Schrijf ons hieronder en we nemen persoonlijk contact met je op.',
    'Opening hours': 'Openingstijden',
    'Monday – Friday': 'Maandag – vrijdag',
    'Saturday': 'Zaterdag',
    'Sunday': 'Zondag',
    'Closed': 'Gesloten',
    'We reply within one working day.': 'We reageren binnen één werkdag.',
    'Email': 'E-mail',
    'REGALO on Instagram': 'REGALO op Instagram',
    'Your first name': 'Je voornaam',
    'Your last name': 'Je achternaam',
    'Phone number (optional)': 'Telefoonnummer (optioneel)',
    'Your message': 'Je bericht',
    'Write something…': 'Schrijf hier je bericht…',
    'Send message': 'Bericht versturen',
    'Your message opens in your own email app, ready to send to hello@regalo.com.': 'Je bericht opent in je eigen e-mailapp, klaar om te versturen naar hello@regalo.com.',
    'Thank you — your message is ready.': 'Dank je wel — je bericht staat klaar.',
    "Your email app has opened with your message. Press send there and we'll reply within one working day.": 'Je e-mailapp is geopend met je bericht. Druk daar op versturen en we reageren binnen één werkdag.',
    'Nothing opened? Email us directly at': 'Opende er niets? Mail ons dan direct op',
    'Write another message': 'Nog een bericht schrijven',
    'Name': 'Naam',
    'Phone': 'Telefoon',
    'Message from': 'Bericht van',

    // Checkout
    'Checkout — REGALO': 'Afrekenen — REGALO',
    'Back to bag': 'Terug naar je tas',
    'Contact': 'Contact',
    'We send your order confirmation here.': 'Hier sturen we je orderbevestiging naartoe.',
    'Keep me updated on new collections': 'Houd me op de hoogte van nieuwe collecties',
    'Delivery address': 'Bezorgadres',
    'First name': 'Voornaam',
    'Last name': 'Achternaam',
    'Address': 'Adres',
    'Postal code': 'Postcode',
    'City': 'Plaats',
    'Country': 'Land',
    'Netherlands': 'Nederland',
    'Belgium': 'België',
    'Germany': 'Duitsland',
    'France': 'Frankrijk',
    'Italy': 'Italië',
    'Spain': 'Spanje',
    'Phone (optional)': 'Telefoon (optioneel)',
    'Delivery': 'Bezorging',
    'Standard delivery': 'Standaard bezorging',
    '2 to 4 working days, with tracking': '2 tot 4 werkdagen, met track & trace',
    'To be confirmed': 'Volgt nog',
    'Express delivery': 'Express bezorging',
    '1 to 2 working days, signature on delivery': '1 tot 2 werkdagen, aftekenen bij levering',
    'Payment': 'Betaling',
    'Pay directly via your bank': 'Direct betalen via je bank',
    'Card': 'Creditcard',
    'Pay with your PayPal account': 'Betalen met je PayPal-account',
    'For payments from Belgium': 'Voor betalingen vanuit België',
    'Payment methods per country are confirmed with the payment provider before launch.': 'Betaalmethoden per land worden voor de lancering met de betaalprovider afgestemd.',
    'Place order': 'Bestelling plaatsen',
    'By placing your order you agree to the terms and the returns policy.': 'Door je bestelling te plaatsen ga je akkoord met de voorwaarden en het retourbeleid.',
    'Order summary': 'Overzicht',
    'items': 'artikelen',
    'Shipping': 'Verzending',
    'Total': 'Totaal',
    'Incl. VAT': 'Incl. btw',

    // Confirmation
    'Order confirmed — REGALO': 'Bestelling bevestigd — REGALO',
    'Thank you for your order.': 'Bedankt voor je bestelling.',
    'Order': 'Bestelling',
    '· A confirmation has been sent to your email address.': '· Je ontvangt een bevestiging op je e-mailadres.',
    'Confirmation by email': 'Bevestiging per e-mail',
    'Packed with care': 'Met zorg ingepakt',
    'On its way with tracking': 'Onderweg met track & trace',
    'Continue shopping': 'Verder winkelen',
    'Back to World of Regalo': 'Terug naar de wereld van Regalo',
  };

  // Strings that carry numbers or product data
  const PATTERNS = [
    [/^Showing (\d+) of (\d+)$/, (m) => `${m[1]} van ${m[2]} getoond`],
    [/^Quick add (.+)$/, (m) => `Snel toevoegen: ${m[1]}`],
    [/^Look (\d+) · (.+) — REGALO$/, (m) => `Look ${m[1]} · ${NL[m[2]] || m[2]} — REGALO`],
    [/^Look (\d+) — (.+)$/, (m) => `Look ${m[1]} — ${NL[m[2]] || m[2]}`],
    [/^(.+) · (\d+) colours?$/, (m) => `${m[1]} · ${m[2]} ${m[2] === '1' ? 'kleur' : 'kleuren'}`],
    [/^(\w+) unavailable$/, (m) => `${m[1]} niet beschikbaar`],
    [/^(.+), front view$/, (m) => `${m[1]}, vooraanzicht`],
    [/^(\w+) · (\w+)(?: · Qty (\d+))?$/, (m) => `${NL[m[1]] || m[1]} · ${m[2]}${m[3] ? ` · Aantal ${m[3]}` : ''}`],
    [/^Cut from natural fabrics with considered weights and careful finishing\. A .+ designed to stay relevant for years\.$/,
      () => 'Gemaakt van natuurlijke stoffen met doordachte gewichten en zorgvuldige afwerking. Ontworpen om jarenlang relevant te blijven.'],
  ];

  const REV = {};
  Object.keys(NL).forEach((k) => { REV[NL[k]] = k; });
  const ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const lookup = (en) => {
    const k = norm(en);
    if (NL[k] != null) return NL[k];
    for (const [re, fn] of PATTERNS) { const m = k.match(re); if (m) return fn(m); }
    return null;
  };
  // Keep the original leading/trailing whitespace around the translated text
  const wrap = (orig, text) => { const m = orig.match(/^(\s*)[\s\S]*?(\s*)$/); return m[1] + text + m[2]; };
  // Text written by the page while in Dutch is mapped back to its English source
  const toSource = (cur) => { const en = REV[norm(cur)]; return en != null && en !== norm(cur) ? wrap(cur, en) : cur; };

  let lang = 'en';
  try { lang = localStorage.getItem('regalo-lang') === 'nl' ? 'nl' : 'en'; } catch (e) {}

  const store = new WeakMap(); // node -> { key: { en, out } }
  function apply(node, key, cur, set) {
    if (cur == null || !/[A-Za-z]/.test(cur)) return;
    let recs = store.get(node);
    if (!recs) store.set(node, (recs = {}));
    let r = recs[key];
    if (!r || cur !== r.out) r = recs[key] = { en: toSource(cur) };
    const t = lang === 'nl' ? lookup(r.en) : null;
    r.out = t == null ? r.en : wrap(r.en, t);
    if (r.out !== cur) set(r.out);
  }
  const text = (n) => {
    const p = n.parentNode;
    if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE') return;
    apply(n, '#text', n.nodeValue, (v) => (n.nodeValue = v));
  };
  const attr = (el, a) => apply(el, a, el.getAttribute(a), (v) => el.setAttribute(a, v));
  const meta = (el) => el.nodeName === 'META' && el.name === 'description' && attr(el, 'content');

  function translate(root) {
    if (root.nodeType === 3) return text(root);
    if (root.nodeType !== 1) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) text(w.currentNode);
    const els = [root, ...root.querySelectorAll('[placeholder],[aria-label],[alt],[title],meta[name=description]')];
    els.forEach((el) => { ATTRS.forEach((a) => el.hasAttribute?.(a) && attr(el, a)); meta(el); });
  }

  const mo = new MutationObserver((list) => {
    list.forEach((m) => {
      if (m.type === 'childList') m.addedNodes.forEach(translate);
      else if (m.type === 'characterData') text(m.target);
      else if (m.type === 'attributes') m.attributeName === 'content' ? meta(m.target) : attr(m.target, m.attributeName);
    });
  });
  mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: [...ATTRS, 'content'] });

  function set(next) {
    lang = next === 'nl' ? 'nl' : 'en';
    try { localStorage.setItem('regalo-lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
    translate(document.documentElement);
    document.querySelectorAll('.lang-switch__btn').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', b.dataset.lang === lang);
    });
    document.dispatchEvent(new CustomEvent('regalo:lang', { detail: lang }));
  }

  document.documentElement.lang = lang;
  window.Regalo = Object.assign(window.Regalo || {}, { i18n: { set, get: () => lang, t: (s) => (lang === 'nl' && lookup(s)) || s } });
})();
