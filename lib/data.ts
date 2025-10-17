// ====== TYPES ======
type Currency = number;

type CategoryMetaChild = {
  name: string;
  description: string;
};

type CategoryMeta = {
  name: string;
  description: string;
  children?: Record<string, CategoryMetaChild>;
};

type CategorySlug = "electronics" | "fashion" | "home" | "collectibles";
type SortKey = "popular" | "new" | "price-asc" | "price-desc";
type SearchSortKey = "relevance" | "new" | "price-asc" | "price-desc";

type BaseProduct = {
  id: string;
  title: string;
  price: Currency;
  compareAt?: Currency;
  image: string;
  store: string;
};

type Product = BaseProduct & {
  category: CategorySlug;
  sub?: string;
};

type FeaturedProduct = BaseProduct & {
  featured?: boolean;
};

type StoreMeta = {
  slug: string;
  name: string;
  banner: string;
  avatar: string;
  rating: number;
  reviews: number;
  followers: number;
  since: string;
  description: string;
};

type StoreProduct = BaseProduct & {
  storeSlug: keyof typeof STORE_META;
  featured?: boolean;
  sales?: number;
};

type Query = {
  category: CategorySlug;
  subcategory?: string;
  page?: number;
  sort?: SortKey | string;
};

type StoreQuery = {
  store: keyof typeof STORE_META; // slug
  tab?: "all" | "featured" | "best";
  sort?: SortKey | string;
  page?: number;
};

type SearchQuery = {
  q: string;
  cat?: "all" | CategorySlug | string;
  sort?: SearchSortKey | string;
  page?: number;
};

type AuctionsQuery = {
  q?: string;
  cat?: "all" | "collectibles" | "electronics" | "fashion" | string;
  status?: "live" | "upcoming" | "ended" | "all";
  sort?: "ending-soon" | "newest" | "price-asc" | "price-desc" | "highest";
  page?: number;
  min?: number;
  max?: number;
};

type AuctionLite = {
  id: string;
  title: string;
  current: Currency;
  image: string;
  endsAt: string; // ISO
  bids: number;
  category: CategorySlug | "collectibles";
};

type AuctionDetail = {
  id: string;
  title: string;
  images: string[];
  cond: "new" | "used";
  sku?: string;
  startPrice: Currency;
  current: Currency;
  increment: Currency;
  buyNow?: Currency;
  endsAt: string; // ISO
  ship: { free: boolean; fast: boolean };
  returnDays: number;
  description: string;
  specs: Record<string, string>;
  store: string;
  storeSlug: keyof typeof STORE_META;
  sellerRating: number;
  sellerFollowers: number;
  sellerSince: string;
};

type Bid = { user: string; amount: number; time: string };

// ====== DATA ======
export const categories = [
  { slug: "electronics", name: "Điện tử", cover: "/images/cat-electronics.png" },
  { slug: "fashion", name: "Thời trang", cover: "/images/cat-fashion.png" },
  { slug: "home", name: "Gia dụng", cover: "/images/cat-home.png" },
  { slug: "collectibles", name: "Sưu tầm", cover: "/images/cat-collect.png" },
] as const;

export const featuredProducts: FeaturedProduct[] = [
  { id: "p1", title: "Tai nghe Bluetooth ANC Pro", price: 1_590_000, image: "/images/tainghe.png", store: "SoundX", featured: true, compareAt: 1_990_000 },
  { id: "p2", title: "Nồi chiên không dầu 5L", price: 990_000, image: "/images/noichien.png", store: "HomePlus" },
  { id: "p3", title: "Máy pha Cafe 3 chức năng", price: 1_290_000, image: "/images/mayphacaphe.png", store: "Máy pha cà phê" },
  { id: "p4", title: "Áo khoác gió nam", price: 490_000, image: "/images/cat-fashion.png", store: "Fashion" },
  { id: "p5", title: "Hoodie Active Sportswear", price: 9_990_000, image: "/images/hoodie.png", store: "Áo khoác" },
  { id: "p6", title: "Máy ảnh Mirrorless X10", price: 9_990_000, image: "/images/may-anh.webp", store: "CamZone" },

];

export const hotAuctions = [
  { id: "a1", title: "Lego Starship Limited 2020", current: 3_200_000, image: "/images/lego.jpg", endsIn: "02:14:51" },
  { id: "a2", title: "Card Pokémon 1st Edition", current: 7_800_000, image: "/images/card-pokemon.jpg", endsIn: "00:49:10" },
  { id: "a3", title: "Đồng hồ vintage 1970s", current: 12_500_000, image: "/images/dong-ho.jpg", endsIn: "05:07:33" },
  { id: "a4", title: "Máy game NES classic", current: 2_100_000, image: "/images/may-game.jpg", endsIn: "01:22:09" },
  { id: "a5", title: "Giày Jordan 1 Retro", current: 5_600_000, image: "/images/giay-jordan.webp", endsIn: "03:51:27" },
  { id: "a6", title: "Giày Jordan 2 Retro", current: 5_600_000, image: "/images/giay-jordan-2.jpg", endsIn: "03:51:27" },

] as const;

export const featuredStores = [
  { slug: "apple", name: "Apple", banner: "/images/apple.png" },
  { slug: "android", name: "Android", banner: "/images/android.png" },
  { slug: "samsung", name: "SAMSUNG", banner: "/images/samsung.png" },
  { slug: "jbl", name: "JBL", banner: "/images/jbl.png" },
  { slug: "playstation", name: "PlayStation", banner: "/images/playstation.png" },
  { slug: "lego", name: "Lego", banner: "/images/lego.png" },
] as const;

// ---- CATEGORY META ----
const CATEGORY_META: Record<CategorySlug, CategoryMeta> = {
  electronics: {
    name: "Điện tử",
    description: "Thiết bị số, âm thanh, phụ kiện công nghệ.",
    children: {
      phone: { name: "Điện thoại", description: "Smartphone & phụ kiện." },
      audio: { name: "Âm thanh", description: "Tai nghe, loa, DAC/AMP." },
      camera: { name: "Máy ảnh", description: "Máy ảnh & ống kính." },
    },
  },
  fashion: {
    name: "Thời trang",
    description: "Trang phục, giày dép, phụ kiện.",
    children: {
      men: { name: "Nam", description: "Áo quần, giày dép, phụ kiện nam." },
      women: { name: "Nữ", description: "Áo quần, giày dép, phụ kiện nữ." },
    },
  },
  home: {
    name: "Gia dụng",
    description: "Đồ gia dụng thông minh cho mọi nhà.",
  },
  collectibles: {
    name: "Sưu tầm",
    description: "Đồ cổ & vật phẩm hiếm cho người đam mê.",
  },
} as const;

function hasKey<O extends object>(obj: O, k: PropertyKey): k is keyof O {
  return k in obj;
}

export function getCategoryMeta(category?: string, subcategory?: string) {
  if (!category) return null;
  if (!hasKey(CATEGORY_META, category)) return null;

  const c = CATEGORY_META[category];
  if (!subcategory) return { ...c, parent: null as { name: string; key: string } | null };

  const children = c.children ?? {};
  if (!hasKey(children, subcategory)) return { ...c, parent: null as { name: string; key: string } | null };

  const s = children[subcategory];
  return { ...s, parent: { name: c.name, key: category } };
}

// ---- PRODUCTS by CATEGORY (mock) ----
const ALL_PRODUCTS: Product[] = [
  // electronics/phone
  { id: "e-p-1", title: "Điện thoại Onyx S1 128GB", price: 5_990_000, image: "/images/p1.jpg", store: "SoundX", category: "electronics", sub: "phone" },
  { id: "e-p-2", title: "Điện thoại Onyx S1 256GB", price: 6_990_000, image: "/images/p2.jpg", store: "SoundX", category: "electronics", sub: "phone" },
  // electronics/audio
  { id: "e-a-1", title: "Tai nghe Bluetooth ANC Pro", price: 1_590_000, image: "/images/tainghe.png", store: "KeyLab", category: "electronics", sub: "audio" },
  { id: "e-a-2", title: "Loa di động Bass+ 30W", price: 1_290_000, image: "/images/p4.jpg", store: "KeyLab", category: "electronics", sub: "audio" },
  // electronics/camera
  { id: "e-c-1", title: "Máy ảnh Mirrorless X10", price: 9_990_000, image: "/images/mayanh.png", store: "CamZone", category: "electronics", sub: "camera" },
  { id: "e-c-2", title: "Ống kính 35mm F1.8", price: 4_590_000, image: "/images/p1.jpg", store: "CamZone", category: "electronics", sub: "camera" },
  // fashion/men
  { id: "f-m-1", title: "Áo khoác gió nam", price: 490_000, image: "/images/p4.jpg", store: "Fashio", category: "fashion", sub: "men" },
  { id: "f-m-2", title: "Giày sneaker nam", price: 890_000, image: "/images/p2.jpg", store: "Fashio", category: "fashion", sub: "men" },
  // fashion/women
  { id: "f-w-1", title: "Đầm midi nữ", price: 750_000, image: "/images/p3.jpg", store: "Fashio", category: "fashion", sub: "women" },
  { id: "f-w-2", title: "Túi xách mini", price: 990_000, image: "/images/p5.jpg", store: "Fashio", category: "fashion", sub: "women" },
  // extra
  { id: "e-x-1", title: "Hub USB-C 7-in-1", price: 690_000, image: "/images/p3.jpg", store: "HomePlus", category: "electronics" },
  { id: "e-x-2", title: "Cáp sạc nhanh 100W", price: 190_000, image: "/images/p1.jpg", store: "HomePlus", category: "electronics" },
  { id: "f-x-1", title: "Áo thun basic", price: 190_000, image: "/images/p2.jpg", store: "Fashio", category: "fashion" },
];

export function getProductsByCategory(q: Query) {
  const pageSize = 12;
  let arr = ALL_PRODUCTS.filter((p) => p.category === q.category);
  if (q.subcategory) arr = arr.filter((p) => p.sub === q.subcategory);

  switch (q.sort) {
    case "price-asc":
      arr = [...arr].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      arr = [...arr].sort((a, b) => b.price - a.price);
      break;
    case "new":
      arr = [...arr].reverse();
      break;
    default:
      // popular: giữ nguyên thứ tự mock
      break;
  }

  const page = Math.max(1, q.page || 1);
  const start = (page - 1) * pageSize;
  const items = arr.slice(start, start + pageSize);
  return { items, total: arr.length, pageSize };
}

// ===== STORE META =====
const STORE_META = {
  soundx: {
    slug: "soundx",
    name: "SoundX – Âm thanh cao cấp",
    banner: "/images/banner.jpg",
    avatar: "/images/sound.png",
    rating: 4.8,
    reviews: 1280,
    followers: 15200,
    since: "2021",
    description: "Thiết bị âm thanh, tai nghe, DAC/AMP dành cho người yêu nhạc.",
  },
  keylab: {
    slug: "keylab",
    name: "KeyLab – Bàn phím & Keycap",
    banner: "/images/store2.jpg",
    avatar: "/images/store2.jpg",
    rating: 4.7,
    reviews: 980,
    followers: 10300,
    since: "2020",
    description: "Bàn phím cơ, switch, keycap độc quyền & custom kit.",
  },
  retrohub: {
    slug: "retrohub",
    name: "RetroHub – Đồ sưu tầm",
    banner: "/images/store3.jpg",
    avatar: "/images/store3.jpg",
    rating: 4.9,
    reviews: 640,
    followers: 8700,
    since: "2019",
    description: "Đồ cổ & sưu tầm hiếm, đấu giá mỗi tuần.",
  },
  camzone: {
    slug: "camzone",
    name: "CamZone – Máy ảnh & Lens",
    banner: "/images/p5.jpg",
    avatar: "/images/p5.jpg",
    rating: 4.6,
    reviews: 740,
    followers: 6900,
    since: "2022",
    description: "Máy ảnh mirrorless, ống kính chính hãng & phụ kiện studio.",
  },
  homeplus: {
    slug: "homeplus",
    name: "HomePlus – Gia dụng",
    banner: "/images/p3.jpg",
    avatar: "/images/p3.jpg",
    rating: 4.5,
    reviews: 1120,
    followers: 5400,
    since: "2018",
    description: "Gia dụng thông minh cho mọi nhà.",
  },
  fashio: {
    slug: "fashio",
    name: "Fashio – Thời trang",
    banner: "/images/p4.jpg",
    avatar: "/images/p4.jpg",
    rating: 4.4,
    reviews: 2100,
    followers: 12000,
    since: "2017",
    description: "Trang phục tối giản, bền dáng, giá hợp lý.",
  },
} as const;

type StoreSlug = keyof typeof STORE_META;
type StoreMetaUnion = (typeof STORE_META)[StoreSlug];

export function getStoreMeta(slug: string): StoreMetaUnion | null {
  if (hasKey(STORE_META, slug)) {
    return STORE_META[slug];
  }
  return null;
}

// ===== PRODUCTS BY STORE =====
const EXT_PRODUCTS: StoreProduct[] = [
  { id: "p1", title: "Tai nghe Bluetooth ANC Pro", price: 1_590_000, image: "/images/tainghe.png", store: "SoundX", storeSlug: "soundx", featured: true, sales: 320 },
  { id: "p2", title: "Bàn phím cơ 75% RGB", price: 1_290_000, image: "/images/p2.jpg", store: "KeyLab", storeSlug: "keylab", featured: true, sales: 280 },
  { id: "p3", title: "Nồi chiên không dầu 5L", price: 990_000, image: "/images/p3.jpg", store: "HomePlus", storeSlug: "homeplus", sales: 410 },
  { id: "p4", title: "Áo khoác gió nam", price: 490_000, image: "/images/p4.jpg", store: "Fashio", storeSlug: "fashio", featured: false, sales: 520 },
  { id: "p5", title: "Máy ảnh Mirrorless X10", price: 9_990_000, image: "/images/p5.jpg", store: "CamZone", storeSlug: "camzone", featured: true, sales: 95 },
  { id: "p6", title: "DAC/AMP USB Hi-Res", price: 1_890_000, image: "/images/p3.jpg", store: "SoundX", storeSlug: "soundx", sales: 140 },
  { id: "p7", title: "Keycap PBT Doubleshot", price: 390_000, image: "/images/p2.jpg", store: "KeyLab", storeSlug: "keylab", sales: 430 },
  { id: "p8", title: "Máy xay sinh tố 800W", price: 690_000, image: "/images/p3.jpg", store: "HomePlus", storeSlug: "homeplus", featured: true, sales: 260 },
  { id: "p9", title: "Đầm midi nữ", price: 750_000, image: "/images/p3.jpg", store: "Fashio", storeSlug: "fashio", sales: 370 },
  { id: "p10", title: "Ống kính 35mm F1.8", price: 4_590_000, image: "/images/p1.jpg", store: "CamZone", storeSlug: "camzone", sales: 60 },
];

export function getProductsByStore(q: StoreQuery) {
  const pageSize = 12;
  let arr = EXT_PRODUCTS.filter((p) => p.storeSlug === q.store);

  if (q.tab === "featured") arr = arr.filter((p) => p.featured);
  if (q.tab === "best") arr = [...arr].sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0));

  switch (q.sort) {
    case "price-asc":
      arr = [...arr].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      arr = [...arr].sort((a, b) => b.price - a.price);
      break;
    case "new":
      arr = [...arr].reverse();
      break;
    default:
      // popular: giữ thứ tự hiện tại
      break;
  }

  const page = Math.max(1, q.page || 1);
  const start = (page - 1) * pageSize;
  const items = arr.slice(start, start + pageSize);
  return { items, total: arr.length, pageSize };
}

export const allStores: Array<Pick<StoreMeta, "slug" | "name" | "banner">> = [
  { slug: "soundx", name: "SoundX – Âm thanh cao cấp", banner: "/images/sound.png" },
  { slug: "keylab", name: "KeyLab – Bàn phím & Keycap", banner: "/images/store2.jpg" },
  { slug: "retrohub", name: "RetroHub – Đồ sưu tầm", banner: "/images/store3.jpg" },
  { slug: "camzone", name: "CamZone – Máy ảnh & Lens", banner: "/images/p5.png" },
  { slug: "homeplus", name: "HomePlus – Gia dụng", banner: "/images/p3.jpg" },
  { slug: "1", name: "Fashio – Thời trang", banner: "/images/p4.jpg" },
  { slug: "2", name: "Fashio – Thời trang", banner: "/images/p4.jpg" },
  { slug: "3", name: "Fashio – Thời trang", banner: "/images/p4.jpg" },
  { slug: "4", name: "Fashio – Thời trang", banner: "/images/p4.jpg" },
  { slug: "5", name: "Fashio – Thời trang", banner: "/images/p4.jpg" },

];

export function getAllStores() {
  return allStores;
}

// ---- SUGGESTIONS ----
export function getSuggestions(q: string) {
  const base = [
    "tai nghe", "bàn phím", "camera", "điện thoại",
    "jordan", "retro", "máy game", "máy xay", "đầm nữ", "áo khoác",
  ];
  const qs = q.trim().toLowerCase();
  return base
    .filter((x) => x.includes(qs) || qs.includes(x))
    .map((x) => `${x} ${q}`.trim());
}

// ---- SEARCH ----
// NOTE: Nếu file này tự chứa featuredProducts, hãy bỏ import dưới đây.
// import { featuredProducts as FEAT } from "@/lib/data";

const SEARCH_POOL: Array<FeaturedProduct & { category?: CategorySlug }> = [
  ...featuredProducts, // FEAT
  { id: "x1", title: "Hub USB-C 7-in-1", price: 690_000, image: "/images/p3.jpg", store: "HomePlus", category: "electronics" },
  { id: "x2", title: "Cáp sạc nhanh 100W", price: 190_000, image: "/images/p1.jpg", store: "HomePlus", category: "electronics" },
  { id: "x3", title: "Áo thun basic", price: 190_000, image: "/images/p2.jpg", store: "Fashio", category: "fashion" },
];

export function searchProducts(q: SearchQuery) {
  const pageSize = 12;
  const key = (q.q || "").trim().toLowerCase();

  let arr = SEARCH_POOL.filter((p) => {
    const inCat = q.cat && q.cat !== "all" ? p.category === q.cat : true;
    const inText =
      !key ||
      p.title.toLowerCase().includes(key) ||
      (p.store || "").toLowerCase().includes(key);
    return inCat && inText;
  });

  switch (q.sort) {
    case "price-asc":
      arr = [...arr].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      arr = [...arr].sort((a, b) => b.price - a.price);
      break;
    case "new":
      arr = [...arr].reverse();
      break;
    default:
      // relevance: ưu tiên item chứa từ khóa ở tiêu đề
      if (key) {
        arr = [...arr].sort((a, b) => {
          const aScore = a.title.toLowerCase().includes(key) ? 1 : 0;
          const bScore = b.title.toLowerCase().includes(key) ? 1 : 0;
          return bScore - aScore;
        });
      }
      break;
  }

  const page = Math.max(1, q.page || 1);
  const start = (page - 1) * pageSize;
  const items = arr.slice(start, start + pageSize);

  return { items, total: arr.length, pageSize };
}
export type MediaItem =
  | string
  | {
    src: string;
    type?: "image" | "video";   // nếu không ghi, tự đoán theo đuôi
    thumb?: string;             // thumbnail cho video
    poster?: string;            // poster cho video
    alt?: string;               // alt text (tuỳ chọn)
  };

// ----- PRODUCT DETAIL MOCK -----
const PRODUCT_DETAIL_BASE = {
  p1: {
    id: "p1",
    title: "Tai nghe Bluetooth ANC Pro",
    price: 1_590_000,
    compareAt: 1_990_000,
    images: ["/images/p1.webp", "/images/p2.webp", "/images/p3.webp", "https://youtu.be/o1eoCYG7c0c"],
    brand: "Onyx",
    cond: "new" as const,
    sku: "ONX-ANC-PRO-128",
    stock: 24,
    category: "electronics" as const,
    categoryName: "Điện tử",
    sub: "audio",
    subName: "Âm thanh",
    store: "SoundX – Âm thanh cao cấp",
    storeSlug: "soundx" as const,
    sellerRating: 4.8,
    sellerFollowers: 15200,
    sellerSince: "2021",
    ship: { free: true, fast: true },
    returnDays: 7,
    description:
      "Tai nghe chống ồn chủ động (ANC) thế hệ mới, driver 40mm, hỗ trợ Bluetooth 5.3, codec AAC/aptX, pin 40 giờ. Sạc nhanh USB-C.",
    specs: {
      "Kết nối": "Bluetooth 5.3, AAC/aptX",
      "Pin": "40 giờ (ANC off), 28 giờ (ANC on)",
      "Sạc": "USB-C, 10 phút = 5 giờ nghe",
      "Trọng lượng": "260g",
    } as Record<string, string>,
    reviews: [
      { user: "Minh", rating: 5, comment: "Đeo êm, chống ồn tốt, pin trâu.", date: "2025-03-01" },
      { user: "Lan", rating: 4, comment: "Âm ấm áp, mid nổi.", date: "2025-03-05" },
    ],
  },
  p2: {
    id: "p2",
    title: "Bàn phím cơ 75% RGB",
    price: 1_290_000,
    images: ["/images/p2.webp", "/images/p1.webp", "/images/p3.webp"],
    brand: "KeyLab",
    cond: "new" as const,
    sku: "KLB-75-RGB",
    stock: 12,
    category: "electronics" as const,
    categoryName: "Điện tử",
    sub: "keyboard",
    subName: "Bàn phím",
    store: "KeyLab – Bàn phím & Keycap",
    storeSlug: "keylab" as const,
    sellerRating: 4.7,
    sellerFollowers: 10300,
    sellerSince: "2020",
    ship: { free: false, fast: true },
    returnDays: 7,
    description: "Layout 75%, hot-swap, plate PC, foam, RGB south-facing.",
    specs: { "Layout": "75%", "Hot-swap": "Yes", "Switch": "MX-compatible" } as Record<string, string>,
    reviews: [] as Array<{ user: string; rating: number; comment: string; date: string }>,
  },
  p3: {
    id: "p2",
    title: "Bàn phím cơ 75% RGB",
    price: 1_290_000,
    images: ["/images/p2.webp", "/images/p1.webp", "/images/p3.webp"],
    brand: "KeyLab",
    cond: "new" as const,
    sku: "KLB-75-RGB",
    stock: 12,
    category: "electronics" as const,
    categoryName: "Điện tử",
    sub: "keyboard",
    subName: "Bàn phím",
    store: "KeyLab – Bàn phím & Keycap",
    storeSlug: "keylab" as const,
    sellerRating: 4.7,
    sellerFollowers: 10300,
    sellerSince: "2020",
    ship: { free: false, fast: true },
    returnDays: 7,
    description: "Layout 75%, hot-swap, plate PC, foam, RGB south-facing.",
    specs: { "Layout": "75%", "Hot-swap": "Yes", "Switch": "MX-compatible" } as Record<string, string>,
    reviews: [] as Array<{ user: string; rating: number; comment: string; date: string }>,
  },
  p4: {
    id: "p2",
    title: "Bàn phím cơ 75% RGB",
    price: 1_290_000,
    images: ["/images/p2.webp", "/images/p1.webp", "/images/p3.webp"],
    brand: "KeyLab",
    cond: "new" as const,
    sku: "KLB-75-RGB",
    stock: 12,
    category: "electronics" as const,
    categoryName: "Điện tử",
    sub: "keyboard",
    subName: "Bàn phím",
    store: "KeyLab – Bàn phím & Keycap",
    storeSlug: "keylab" as const,
    sellerRating: 4.7,
    sellerFollowers: 10300,
    sellerSince: "2020",
    ship: { free: false, fast: true },
    returnDays: 7,
    description: "Layout 75%, hot-swap, plate PC, foam, RGB south-facing.",
    specs: { "Layout": "75%", "Hot-swap": "Yes", "Switch": "MX-compatible" } as Record<string, string>,
    reviews: [] as Array<{ user: string; rating: number; comment: string; date: string }>,
  },
  p5: {
    id: "p2",
    title: "Bàn phím cơ 75% RGB",
    price: 1_290_000,
    images: ["/images/p2.webp", "/images/p1.webp", "/images/p3.webp"],
    brand: "KeyLab",
    cond: "new" as const,
    sku: "KLB-75-RGB",
    stock: 12,
    category: "electronics" as const,
    categoryName: "Điện tử",
    sub: "keyboard",
    subName: "Bàn phím",
    store: "KeyLab – Bàn phím & Keycap",
    storeSlug: "keylab" as const,
    sellerRating: 4.7,
    sellerFollowers: 10300,
    sellerSince: "2020",
    ship: { free: false, fast: true },
    returnDays: 7,
    description: "Layout 75%, hot-swap, plate PC, foam, RGB south-facing.",
    specs: { "Layout": "75%", "Hot-swap": "Yes", "Switch": "MX-compatible" } as Record<string, string>,
    reviews: [] as Array<{ user: string; rating: number; comment: string; date: string }>,
  },
  p6: {
    id: "p2",
    title: "Bàn phím cơ 75% RGB",
    price: 1_290_000,
    images: ["/images/p2.webp", "/images/p1.webp", "/images/p3.webp"],
    brand: "KeyLab",
    cond: "new" as const,
    sku: "KLB-75-RGB",
    stock: 12,
    category: "electronics" as const,
    categoryName: "Điện tử",
    sub: "keyboard",
    subName: "Bàn phím",
    store: "KeyLab – Bàn phím & Keycap",
    storeSlug: "keylab" as const,
    sellerRating: 4.7,
    sellerFollowers: 10300,
    sellerSince: "2020",
    ship: { free: false, fast: true },
    returnDays: 7,
    description: "Layout 75%, hot-swap, plate PC, foam, RGB south-facing.",
    specs: { "Layout": "75%", "Hot-swap": "Yes", "Switch": "MX-compatible" } as Record<string, string>,
    reviews: [] as Array<{ user: string; rating: number; comment: string; date: string }>,
  },
} as const;

type ProductDetail = typeof PRODUCT_DETAIL_BASE[keyof typeof PRODUCT_DETAIL_BASE];

export function getProductById(id: string): ProductDetail | null {
  if (hasKey(PRODUCT_DETAIL_BASE, id)) {
    return PRODUCT_DETAIL_BASE[id];
  }
  return null;
}

// ===== AUCTION MOCK =====
const AUCTION_DETAIL_BASE: Record<string, AuctionDetail> = {
  a1: {
    id: "a1",
    title: "Lego Starship Limited 2020",
    images: ["/images/a1.webp", "/images/a2.webp", "/images/a3.webp", "https://youtu.be/o1eoCYG7c0c"],
    cond: "used",
    sku: "LEGO-STAR-2020",
    startPrice: 1_500_000,
    current: 3_200_000,
    increment: 50_000,
    buyNow: 4_500_000,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 14).toISOString(), // +2h14m
    ship: { free: true, fast: false },
    returnDays: 3,
    description: "Bộ Lego phiên bản giới hạn 2020, full box, còn tem. Phù hợp sưu tầm.",
    specs: { "Năm": "2020", "Tình trạng": "Like New", "Số mảnh": "1,560" },
    store: "RetroHub – Đồ sưu tầm",
    storeSlug: "retrohub",
    sellerRating: 4.9,
    sellerFollowers: 8700,
    sellerSince: "2019",
  },
  a2: {
    id: "a2",
    title: "Card Pokémon 1st Edition",
    images: ["/images/a2.webp", "/images/a1.webp", "/images/a3.webp", "https://youtu.be/o1eoCYG7c0c"],
    cond: "used",
    startPrice: 2_000_000,
    current: 7_800_000,
    increment: 100_000,
    buyNow: 9_500_000,
    endsAt: new Date(Date.now() + 1000 * 60 * 49).toISOString(), // +49m
    ship: { free: false, fast: true },
    returnDays: 0,
    description: "Thẻ Pokémon 1st Edition, giữ gìn kỹ, có sleeve.",
    specs: { "Series": "Base Set", "Tình trạng": "Near Mint" },
    store: "RetroHub – Đồ sưu tầm",
    storeSlug: "retrohub",
    sellerRating: 4.9,
    sellerFollowers: 8700,
    sellerSince: "2019",
  },
  a3: {
    id: "a2",
    title: "Card Pokémon 1st Edition",
    images: ["/images/a2.webp", "/images/a1.webp", "/images/a3.webp", "https://youtu.be/o1eoCYG7c0c"],
    cond: "used",
    startPrice: 2_000_000,
    current: 7_800_000,
    increment: 100_000,
    buyNow: 9_500_000,
    endsAt: new Date(Date.now() + 1000 * 60 * 49).toISOString(), // +49m
    ship: { free: false, fast: true },
    returnDays: 0,
    description: "Thẻ Pokémon 1st Edition, giữ gìn kỹ, có sleeve.",
    specs: { "Series": "Base Set", "Tình trạng": "Near Mint" },
    store: "RetroHub – Đồ sưu tầm",
    storeSlug: "retrohub",
    sellerRating: 4.9,
    sellerFollowers: 8700,
    sellerSince: "2019",
  },
  a4: {
    id: "a2",
    title: "Card Pokémon 1st Edition",
    images: ["/images/a2.webp", "/images/a1.webp", "/images/a3.webp", "https://youtu.be/o1eoCYG7c0c"],
    cond: "used",
    startPrice: 2_000_000,
    current: 7_800_000,
    increment: 100_000,
    buyNow: 9_500_000,
    endsAt: new Date(Date.now() + 1000 * 60 * 49).toISOString(), // +49m
    ship: { free: false, fast: true },
    returnDays: 0,
    description: "Thẻ Pokémon 1st Edition, giữ gìn kỹ, có sleeve.",
    specs: { "Series": "Base Set", "Tình trạng": "Near Mint" },
    store: "RetroHub – Đồ sưu tầm",
    storeSlug: "retrohub",
    sellerRating: 4.9,
    sellerFollowers: 8700,
    sellerSince: "2019",
  },
  a5: {
    id: "a2",
    title: "Card Pokémon 1st Edition",
    images: ["/images/a2.webp", "/images/a1.webp", "/images/a3.webp", "https://youtu.be/o1eoCYG7c0c"],
    cond: "used",
    startPrice: 2_000_000,
    current: 7_800_000,
    increment: 100_000,
    buyNow: 9_500_000,
    endsAt: new Date(Date.now() + 1000 * 60 * 49).toISOString(), // +49m
    ship: { free: false, fast: true },
    returnDays: 0,
    description: "Thẻ Pokémon 1st Edition, giữ gìn kỹ, có sleeve.",
    specs: { "Series": "Base Set", "Tình trạng": "Near Mint" },
    store: "RetroHub – Đồ sưu tầm",
    storeSlug: "retrohub",
    sellerRating: 4.9,
    sellerFollowers: 8700,
    sellerSince: "2019",
  },
  a6: {
    id: "a2",
    title: "Card Pokémon 1st Edition",
    images: ["/images/a2.webp", "/images/a1.webp", "/images/a3.webp", "https://youtu.be/o1eoCYG7c0c"],
    cond: "used",
    startPrice: 2_000_000,
    current: 7_800_000,
    increment: 100_000,
    buyNow: 9_500_000,
    endsAt: new Date(Date.now() + 1000 * 60 * 49).toISOString(), // +49m
    ship: { free: false, fast: true },
    returnDays: 0,
    description: "Thẻ Pokémon 1st Edition, giữ gìn kỹ, có sleeve.",
    specs: { "Series": "Base Set", "Tình trạng": "Near Mint" },
    store: "RetroHub – Đồ sưu tầm",
    storeSlug: "retrohub",
    sellerRating: 4.9,
    sellerFollowers: 8700,
    sellerSince: "2019",
  },
};

export function getAuctionById(id: string): AuctionDetail | null {
  return AUCTION_DETAIL_BASE[id] ?? null;
}

const AUCTION_BIDS: Record<string, Bid[]> = {
  a1: [
    { user: "linh***", amount: 3_000_000, time: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
    { user: "minh***", amount: 3_100_000, time: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { user: "anh***", amount: 3_200_000, time: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
  ],
  a2: [
    { user: "bao***", amount: 7_600_000, time: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    { user: "thao***", amount: 7_700_000, time: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    { user: "lam***", amount: 7_800_000, time: new Date().toISOString() },
  ],
};

export function getAuctionBids(id: string): Bid[] {
  return (AUCTION_BIDS[id] ?? []).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
}

// ===== AUCTIONS LIST (SEARCH) =====
const AUCTIONS_POOL: AuctionLite[] = [
  { id: "a1", title: "Lego Starship Limited 2020", current: 3_200_000, image: "/images/a1.jpg", endsAt: new Date(Date.now() + 2 * 3600e3).toISOString(), bids: 23, category: "collectibles" },
  { id: "a2", title: "Card Pokémon 1st Edition", current: 7_800_000, image: "/images/a2.jpg", endsAt: new Date(Date.now() + 49 * 60e3).toISOString(), bids: 17, category: "collectibles" },
  { id: "a3", title: "Đồng hồ vintage 1970s", current: 12_500_000, image: "/images/a3.jpg", endsAt: new Date(Date.now() + 5 * 3600e3).toISOString(), bids: 8, category: "fashion" },
  { id: "a4", title: "Máy game NES classic", current: 2_100_000, image: "/images/a4.jpg", endsAt: new Date(Date.now() + 82 * 60e3).toISOString(), bids: 12, category: "electronics" },
  { id: "a5", title: "Giày Jordan 1 Retro", current: 5_600_000, image: "/images/a5.jpg", endsAt: new Date(Date.now() - 30 * 60e3).toISOString(), bids: 31, category: "fashion" }, // ended
];

export function searchAuctions(q: AuctionsQuery) {
  const pageSize = 12;
  const key = (q.q || "").trim().toLowerCase();

  const now = Date.now();
  let arr = AUCTIONS_POOL.filter((a) => {
    const inCat = q.cat && q.cat !== "all" ? a.category === q.cat : true;
    const inText = !key || a.title.toLowerCase().includes(key);
    const inPriceMin = q.min ? a.current >= q.min : true;
    const inPriceMax = q.max ? a.current <= q.max : true;

    const end = new Date(a.endsAt).getTime();
    const st = end - now;
    let inStatus = true;
    switch (q.status) {
      case "live":
        inStatus = st > 0;
        break;
      case "upcoming":
        // (mock) không có startAt, coi những phiên còn >4h là "upcoming"
        inStatus = st > 4 * 3600e3;
        break;
      case "ended":
        inStatus = st <= 0;
        break;
      default:
        inStatus = true;
    }

    return inCat && inText && inPriceMin && inPriceMax && inStatus;
  });

  switch (q.sort) {
    case "price-asc":
      arr = [...arr].sort((a, b) => a.current - b.current);
      break;
    case "price-desc":
    case "highest":
      arr = [...arr].sort((a, b) => b.current - a.current);
      break;
    case "newest":
      arr = [...arr].reverse();
      break;
    default:
      // ending-soon
      arr = [...arr].sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime());
  }

  const page = Math.max(1, q.page || 1);
  const start = (page - 1) * pageSize;
  const items = arr.slice(start, start + pageSize);
  return { items, total: arr.length, pageSize };
}

export type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  live?: boolean;
  highlighted?: boolean;
};

export const VIDEOS: VideoItem[] = [
  { id: "v1", title: "SoundX - Âm thanh", thumbnail: "/img/ipad.png", views: 12700, live: true },
  { id: "v2", title: "Máy pha cà phê", thumbnail: "/img/coffee.png", views: 12700 },
  { id: "v3", title: "Loa để bàn", thumbnail: "/img/speaker.png", views: 12700 },
  { id: "v4", title: "Áo hoodie", thumbnail: "/img/hoodie.png", views: 12700, live: true },
  { id: "v5", title: "SoundX - Âm thanh", thumbnail: "/img/ipad.png", views: 12700 },
];

export type Conv = { id: string; name: string; avatar: string; last: string; dateLabel: string };

export type TextMsg = { id: string; from: "me" | "shop"; type: "text"; text: string; ts: number };
export type CardMsg = { id: string; from: "shop"; type: "card"; ts: number; title: string; image: string; subtitle: string; price: string; cta: string };
export type Msg = TextMsg | CardMsg;