export interface SamplePhoto {
  id: string;
  title: string;
  description: string;
  tags: string[];
  svgContent: string;
}

export const SAMPLE_PHOTOS: SamplePhoto[] = [
  {
    id: 'urban-street',
    title: 'Urban Street & Power Lines',
    description: 'Electric poles, cables, brick buildings, street lamps, and architectural grills.',
    tags: ['Infrastructure', 'Urban', 'Lines'],
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 750" width="1000" height="750">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4a6572" />
          <stop offset="60%" stop-color="#d9826c" />
          <stop offset="100%" stop-color="#ffb088" />
        </linearGradient>
        <linearGradient id="brickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#5c382c" />
          <stop offset="100%" stop-color="#3d231a" />
        </linearGradient>
      </defs>
      <!-- Sunset Sky -->
      <rect width="1000" height="750" fill="url(#skyGrad)" />
      
      <!-- Distant City Silhouette -->
      <path d="M 0 520 L 80 500 L 140 530 L 220 480 L 320 540 L 480 470 L 620 520 L 780 460 L 880 510 L 1000 480 L 1000 750 L 0 750 Z" fill="#2b2d42" opacity="0.6" />

      <!-- Foreground Left Building with brick and windows -->
      <rect x="0" y="320" width="280" height="430" fill="url(#brickGrad)" />
      <!-- Window Grills -->
      <rect x="40" y="360" width="70" height="90" fill="#1f1815" rx="4" />
      <rect x="50" y="370" width="20" height="30" fill="#ffeaa7" opacity="0.8" />
      <rect x="80" y="370" width="20" height="30" fill="#ffeaa7" opacity="0.8" />
      <rect x="50" y="410" width="20" height="30" fill="#ffeaa7" opacity="0.8" />
      <rect x="80" y="410" width="20" height="30" fill="#ffeaa7" opacity="0.8" />
      <!-- Iron security bars -->
      <line x1="40" y1="385" x2="110" y2="385" stroke="#111" stroke-width="3" />
      <line x1="40" y1="425" x2="110" y2="425" stroke="#111" stroke-width="3" />
      <line x1="60" y1="360" x2="60" y2="450" stroke="#111" stroke-width="3" />
      <line x1="90" y1="360" x2="90" y2="450" stroke="#111" stroke-width="3" />

      <rect x="150" y="360" width="70" height="90" fill="#1f1815" rx="4" />
      <rect x="160" y="370" width="50" height="70" fill="#4a5568" opacity="0.7" />

      <!-- Street ground -->
      <polygon points="0,660 1000,660 1000,750 0,750" fill="#1a1c23" />
      <line x1="0" y1="710" x2="1000" y2="710" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="30 20" opacity="0.5" />

      <!-- Prominent Wooden Utility / Electric Pole -->
      <rect x="720" y="160" width="22" height="520" fill="#3e2723" rx="2" />
      <!-- Crossbars on utility pole -->
      <rect x="660" y="200" width="140" height="12" fill="#2d1d17" rx="2" />
      <rect x="680" y="240" width="100" height="10" fill="#2d1d17" rx="2" />
      <!-- Insulators on crossbars (ceramic caps) -->
      <circle cx="670" cy="195" r="7" fill="#81d4fa" />
      <circle cx="731" cy="195" r="7" fill="#81d4fa" />
      <circle cx="790" cy="195" r="7" fill="#81d4fa" />
      <circle cx="690" cy="235" r="6" fill="#81d4fa" />
      <circle cx="770" cy="235" r="6" fill="#81d4fa" />

      <!-- Transformer cylinder box on pole -->
      <rect x="735" y="270" width="36" height="56" fill="#546e7a" rx="4" />

      <!-- High-voltage Power Lines & Cables draping across the sky -->
      <path d="M 0 140 Q 360 260 670 195" stroke="#111" stroke-width="2.5" fill="none" />
      <path d="M 0 180 Q 380 300 731 195" stroke="#111" stroke-width="2.5" fill="none" />
      <path d="M 0 220 Q 400 340 790 195" stroke="#111" stroke-width="2.5" fill="none" />
      <path d="M 670 195 Q 840 240 1000 200" stroke="#111" stroke-width="2.5" fill="none" />
      <path d="M 790 195 Q 890 230 1000 220" stroke="#111" stroke-width="2.5" fill="none" />
      <path d="M 735 320 Q 520 460 280 430" stroke="#1a202c" stroke-width="3" fill="none" />

      <!-- Street Light Lamp Post on Sidewalk -->
      <path d="M 460 680 L 460 380 Q 460 330 500 330 L 520 330" stroke="#374151" stroke-width="8" fill="none" />
      <path d="M 505 330 L 535 345 L 490 345 Z" fill="#e5e7eb" />
      <ellipse cx="512" cy="350" rx="14" ry="7" fill="#ffeb3b" opacity="0.9" />

      <!-- Tree branches with autumn foliage on Right edge -->
      <path d="M 1000 450 Q 880 430 840 370 Q 800 310 820 220" stroke="#4a3728" stroke-width="16" fill="none" />
      <circle cx="860" cy="270" r="45" fill="#c05621" opacity="0.9" />
      <circle cx="910" cy="230" r="55" fill="#dd6b20" opacity="0.85" />
      <circle cx="820" cy="340" r="40" fill="#9c4221" opacity="0.9" />
    </svg>`
  },
  {
    id: 'cozy-study',
    title: 'Study Room & Clock Workspace',
    description: 'Wooden desk, vintage mechanical clock, stacked notebooks, reading spectacles, and potted succulent.',
    tags: ['Interior', 'Objects', 'Still Life'],
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 750" width="1000" height="750">
      <defs>
        <radialGradient id="lampGlow" cx="720" cy="280" r="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#fff3c4" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#ffd166" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#121826" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <!-- Background Wall -->
      <rect width="1000" height="750" fill="url(#wallGrad)" />

      <!-- Wooden Wall Bookshelf with Books -->
      <rect x="80" y="80" width="550" height="24" fill="#854d0e" rx="3" />
      <!-- Books arranged vertically and tilted -->
      <rect x="110" y="24" width="22" height="80" fill="#b91c1c" rx="2" />
      <rect x="134" y="20" width="28" height="84" fill="#1d4ed8" rx="2" />
      <rect x="164" y="30" width="18" height="74" fill="#047857" rx="2" />
      <rect x="184" y="16" width="32" height="88" fill="#d97706" rx="2" />
      <rect x="220" y="26" width="24" height="78" fill="#4338ca" rx="2" />
      <!-- Tilted Book -->
      <polygon points="270,104 290,104 260,34 240,34" fill="#6d28d9" />

      <!-- Round Vintage Brass Mechanical Clock on Wall -->
      <circle cx="480" cy="180" r="65" fill="#fef08a" stroke="#ca8a04" stroke-width="10" />
      <circle cx="480" cy="180" r="52" fill="#fffbeb" />
      <!-- Hour ticks -->
      <line x1="480" y1="135" x2="480" y2="143" stroke="#1f2937" stroke-width="3" />
      <line x1="480" y1="217" x2="480" y2="225" stroke="#1f2937" stroke-width="3" />
      <line x1="435" y1="180" x2="443" y2="180" stroke="#1f2937" stroke-width="3" />
      <line x1="517" y1="180" x2="525" y2="180" stroke="#1f2937" stroke-width="3" />
      <!-- Clock Hands showing 10:10 -->
      <line x1="480" y1="180" x2="455" y2="155" stroke="#111827" stroke-width="4" stroke-linecap="round" />
      <line x1="480" y1="180" x2="510" y2="150" stroke="#111827" stroke-width="3" stroke-linecap="round" />
      <circle cx="480" cy="180" r="4" fill="#b91c1c" />

      <!-- Warm Desktop Lamp Ambient Glow -->
      <circle cx="720" cy="280" r="350" fill="url(#lampGlow)" />

      <!-- Desk Surface -->
      <rect x="0" y="440" width="1000" height="310" fill="#78350f" />
      <rect x="0" y="440" width="1000" height="15" fill="#92400e" />

      <!-- Architect Desk Lamp on Right -->
      <rect x="740" y="650" width="80" height="16" fill="#334155" rx="4" />
      <line x1="780" y1="650" x2="750" y2="450" stroke="#475569" stroke-width="8" stroke-linecap="round" />
      <circle cx="750" cy="450" r="8" fill="#1e293b" />
      <line x1="750" y1="450" x2="720" y2="300" stroke="#475569" stroke-width="8" stroke-linecap="round" />
      <!-- Lamp shade cone -->
      <polygon points="690,260 770,290 710,340" fill="#0284c7" />
      <polygon points="700,310 735,335 680,350" fill="#fef08a" opacity="0.9" />

      <!-- Reading Spectacles on Desk -->
      <ellipse cx="440" cy="550" rx="28" ry="20" fill="none" stroke="#d97706" stroke-width="4" />
      <ellipse cx="510" cy="550" rx="28" ry="20" fill="none" stroke="#d97706" stroke-width="4" />
      <path d="M 468 548 Q 475 542 482 548" stroke="#d97706" stroke-width="4" fill="none" />
      <line x1="412" y1="550" x2="385" y2="540" stroke="#d97706" stroke-width="3" />
      <line x1="538" y1="550" x2="565" y2="540" stroke="#d97706" stroke-width="3" />

      <!-- Ceramic Pot with Green Succulent on Left -->
      <polygon points="170,580 230,580 220,640 180,640" fill="#ea580c" />
      <!-- Succulent leaves -->
      <path d="M 200 580 Q 170 540 180 520 Q 200 535 200 580" fill="#15803d" />
      <path d="M 200 580 Q 230 540 220 520 Q 200 535 200 580" fill="#16a34a" />
      <path d="M 200 580 Q 200 525 200 500 Q 205 525 200 580" fill="#22c55e" />

      <!-- Notebook with Pen in Center -->
      <polygon points="260,540 400,520 440,650 300,670" fill="#f8fafc" />
      <polygon points="255,542 265,540 305,670 295,672" fill="#0284c7" />
      <!-- Metallic Pen -->
      <rect x="360" y="580" width="8" height="90" fill="#94a3b8" rx="3" transform="rotate(25 360 580)" />
      <polygon points="340,685 348,682 344,695" fill="#f59e0b" />
    </svg>`
  },
  {
    id: 'garden-patio',
    title: 'Stone Veranda & Garden Wall',
    description: 'Rustic stone brick wall, terracotta flower pots, wooden bird feeder, and wrought iron garden chair.',
    tags: ['Nature', 'Outdoor', 'Garden'],
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 750" width="1000" height="750">
      <defs>
        <linearGradient id="gardenSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#bae6fd" />
        </linearGradient>
      </defs>
      <!-- Daylight Sky -->
      <rect width="1000" height="750" fill="url(#gardenSky)" />

      <!-- Stone Wall with brick texture -->
      <rect x="0" y="200" width="600" height="380" fill="#78716c" />
      <!-- Irregular stone pattern -->
      <rect x="20" y="220" width="120" height="40" fill="#57534e" rx="4" />
      <rect x="160" y="220" width="160" height="40" fill="#a8a29e" rx="4" />
      <rect x="340" y="220" width="140" height="40" fill="#57534e" rx="4" />
      <rect x="500" y="220" width="80" height="40" fill="#44403c" rx="4" />

      <rect x="10" y="280" width="160" height="45" fill="#a8a29e" rx="4" />
      <rect x="190" y="280" width="140" height="45" fill="#44403c" rx="4" />
      <rect x="350" y="280" width="180" height="45" fill="#57534e" rx="4" />

      <rect x="30" y="345" width="130" height="45" fill="#57534e" rx="4" />
      <rect x="180" y="345" width="170" height="45" fill="#a8a29e" rx="4" />
      <rect x="370" y="345" width="140" height="45" fill="#44403c" rx="4" />

      <!-- Wooden Bird Feeder Hanging on Left -->
      <line x1="120" y1="200" x2="120" y2="280" stroke="#451a03" stroke-width="3" />
      <!-- Roof of bird feeder -->
      <polygon points="70,300 120,260 170,300" fill="#78350f" />
      <!-- House body and perch -->
      <rect x="85" y="300" width="70" height="60" fill="#b45309" />
      <circle cx="120" cy="325" r="14" fill="#451a03" />
      <rect x="117" y="343" width="6" height="20" fill="#d97706" rx="2" />

      <!-- Green Lawn and Patio Tiles -->
      <polygon points="0,550 1000,550 1000,750 0,750" fill="#15803d" />
      <polygon points="300,570 1000,570 1000,750 150,750" fill="#d6d3d1" />
      <!-- Tile lines -->
      <line x1="300" y1="630" x2="1000" y2="630" stroke="#a8a29e" stroke-width="3" />
      <line x1="200" y1="690" x2="1000" y2="690" stroke="#a8a29e" stroke-width="3" />

      <!-- Wrought Iron Patio Chair -->
      <ellipse cx="780" cy="560" rx="55" ry="35" fill="none" stroke="#0f172a" stroke-width="6" />
      <path d="M 730 560 Q 730 460 780 430 Q 830 460 830 560" stroke="#0f172a" stroke-width="6" fill="none" />
      <!-- Chair legs -->
      <line x1="735" y1="570" x2="720" y2="680" stroke="#0f172a" stroke-width="5" />
      <line x1="825" y1="570" x2="840" y2="680" stroke="#0f172a" stroke-width="5" />
      <!-- Decorative heart scrollwork on chair back -->
      <path d="M 760 480 Q 780 460 800 480 Q 780 510 760 480" stroke="#0f172a" stroke-width="3" fill="none" />

      <!-- Terracotta Pots with Colorful Flowers -->
      <polygon points="400,560 460,560 450,630 410,630" fill="#c2410c" />
      <!-- Yellow Marigolds -->
      <circle cx="420" cy="540" r="14" fill="#eab308" />
      <circle cx="445" cy="535" r="16" fill="#f97316" />
      <circle cx="430" cy="515" r="15" fill="#facc15" />

      <!-- Large Watering Can on Left Patio -->
      <rect x="230" y="620" width="70" height="60" fill="#0284c7" rx="6" />
      <path d="M 230 635 Q 190 635 190 665 Q 190 690 240 680" stroke="#0284c7" stroke-width="7" fill="none" />
      <line x1="295" y1="650" x2="350" y2="610" stroke="#0284c7" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="355" cy="605" rx="8" ry="14" fill="#38bdf8" />
    </svg>`
  },
  {
    id: 'artisan-kitchen',
    title: 'Artisan Kitchen & Teapot Pantry',
    description: 'Tiled backsplash, hanging copper pots, ceramic kettle, wooden cutting board with sliced lemons.',
    tags: ['Kitchen', 'Culinary', 'Reflections'],
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 750" width="1000" height="750">
      <!-- Subway Tile Wall -->
      <rect width="1000" height="750" fill="#0f172a" />
      <rect x="0" y="80" width="1000" height="380" fill="#1e293b" />
      <!-- Horizontal grout lines -->
      <line x1="0" y1="140" x2="1000" y2="140" stroke="#334155" stroke-width="2" />
      <line x1="0" y1="200" x2="1000" y2="200" stroke="#334155" stroke-width="2" />
      <line x1="0" y1="260" x2="1000" y2="260" stroke="#334155" stroke-width="2" />
      <line x1="0" y1="320" x2="1000" y2="320" stroke="#334155" stroke-width="2" />
      <line x1="0" y1="380" x2="1000" y2="380" stroke="#334155" stroke-width="2" />
      <line x1="0" y1="440" x2="1000" y2="440" stroke="#334155" stroke-width="2" />

      <!-- Steel Utensil Hanging Rail -->
      <rect x="120" y="120" width="760" height="10" fill="#94a3b8" rx="4" />
      <!-- Hooks -->
      <path d="M 220 130 L 220 150 Q 220 160 210 160" stroke="#cbd5e1" stroke-width="4" fill="none" />
      <path d="M 380 130 L 380 150 Q 380 160 370 160" stroke="#cbd5e1" stroke-width="4" fill="none" />
      <path d="M 540 130 L 540 150 Q 540 160 530 160" stroke="#cbd5e1" stroke-width="4" fill="none" />
      <path d="M 700 130 L 700 150 Q 700 160 690 160" stroke="#cbd5e1" stroke-width="4" fill="none" />

      <!-- Hanging Copper Skillet -->
      <circle cx="210" cy="220" r="50" fill="#b45309" stroke="#d97706" stroke-width="4" />
      <circle cx="210" cy="220" r="42" fill="#78350f" />
      <line x1="210" y1="160" x2="210" y2="170" stroke="#94a3b8" stroke-width="6" />

      <!-- Hanging Stainless Steel Whisk -->
      <line x1="370" y1="160" x2="370" y2="210" stroke="#94a3b8" stroke-width="6" />
      <ellipse cx="370" cy="245" rx="18" ry="35" fill="none" stroke="#cbd5e1" stroke-width="3" />
      <line x1="370" y1="210" x2="370" y2="280" stroke="#cbd5e1" stroke-width="3" />

      <!-- Hanging Wooden Ladle -->
      <rect x="526" y="160" width="8" height="90" fill="#b45309" rx="3" />
      <ellipse cx="530" cy="265" rx="20" ry="16" fill="#92400e" />

      <!-- Countertop Surface (Marble) -->
      <rect x="0" y="460" width="1000" height="290" fill="#e2e8f0" />
      <line x1="0" y1="460" x2="1000" y2="460" stroke="#cbd5e1" stroke-width="12" />

      <!-- Classic Ceramic Red Teapot on Counter -->
      <ellipse cx="720" cy="580" rx="75" ry="55" fill="#dc2626" />
      <!-- Teapot Lid & Knob -->
      <ellipse cx="720" cy="525" rx="35" ry="12" fill="#b91c1c" />
      <circle cx="720" cy="510" r="10" fill="#facc15" />
      <!-- Teapot Spout -->
      <path d="M 645 570 Q 600 550 590 520 Q 610 525 650 550" fill="#dc2626" />
      <!-- Teapot Handle -->
      <path d="M 795 540 Q 860 560 840 610 Q 820 630 785 620" stroke="#dc2626" stroke-width="14" fill="none" stroke-linecap="round" />

      <!-- Wooden Bread Cutting Board -->
      <polygon points="180,550 440,530 460,670 200,690" fill="#b45309" />
      <!-- Freshly sliced lemon rounds -->
      <circle cx="280" cy="610" r="26" fill="#facc15" stroke="#fef08a" stroke-width="3" />
      <circle cx="280" cy="610" r="18" fill="#eab308" stroke="#ffffff" stroke-width="2" />
      <circle cx="345" cy="595" r="26" fill="#facc15" stroke="#fef08a" stroke-width="3" />
      <circle cx="345" cy="595" r="18" fill="#eab308" stroke="#ffffff" stroke-width="2" />

      <!-- Chef's Knife on Cutting Board -->
      <polygon points="260,650 430,640 432,652 260,658" fill="#94a3b8" />
      <rect x="430" y="638" width="45" height="15" fill="#1e293b" rx="2" />
    </svg>`
  }
];

/**
 * Converts an SVG string into a JPEG base64 Data URL using a temporary canvas.
 */
export async function svgToJpegBase64(svgString: string, width = 1000, height = 750): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to get 2D canvas context'));
        return;
      }

      ctx.fillStyle = '#080B12';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      resolve(dataUrl);
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to render SVG onto canvas'));
    };

    img.src = url;
  });
}
