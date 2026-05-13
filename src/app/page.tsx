"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  BadgeCheck,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Facebook,
  Filter,
  Gift,
  Headphones,
  Home,
  Instagram,
  Laptop,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  Percent,
  Phone,
  Plus,
  Refrigerator,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sofa,
  Sparkles,
  Star,
  Sun,
  Truck,
  Tv,
  WashingMachine,
  X,
  Youtube,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type CategorySlug =
  | "smartphones"
  | "tvs"
  | "refrigerators"
  | "washing-machines"
  | "sofas"
  | "beds"
  | "air-conditioners"
  | "laptops"
  | "kitchen-appliances";

type Product = {
  id: string;
  title: string;
  brand: string;
  category: CategorySlug;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  badge: string;
  inStock: boolean;
};

type Category = {
  title: string;
  slug: CategorySlug;
  image: string;
  icon: LucideIcon;
  gradient: string;
  itemCount: string;
};

type Offer = {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  icon: LucideIcon;
};

type Testimonial = {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const DISPLAY_PHONE = "+91 93477 28438";
const WHATSAPP_NUMBER = "919347728438";
const EMAIL = "rajamartdarsi@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/rajaelectronicsfurnitures/";
const FACEBOOK_URL = "https://www.facebook.com/rajamartdarsi";
const YOUTUBE_URL = "https://www.youtube.com/@rajamartdarsi";

const navLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Products", href: "#products" },
  { label: "Offers", href: "#offers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

const categories: Category[] = [
  {
    title: "Smartphones",
    slug: "smartphones",
    image: "/assets/generated/categories/smartphones.png",
    icon: Smartphone,
    gradient: "from-royal-600/85 via-navy-900/70 to-saffron-500/70",
    itemCount: "120+ models"
  },
  {
    title: "TVs",
    slug: "tvs",
    image: "/assets/generated/categories/tvs.png",
    icon: Tv,
    gradient: "from-navy-950/90 via-royal-700/70 to-saffron-500/70",
    itemCount: "4K, OLED, QLED"
  },
  {
    title: "Refrigerators",
    slug: "refrigerators",
    image: "/assets/generated/categories/refrigerators.png",
    icon: Refrigerator,
    gradient: "from-sky-600/80 via-royal-700/70 to-navy-950/80",
    itemCount: "Single & double door"
  },
  {
    title: "Washing Machines",
    slug: "washing-machines",
    image: "/assets/generated/categories/washing-machines.png",
    icon: WashingMachine,
    gradient: "from-cyan-600/80 via-royal-700/70 to-navy-950/80",
    itemCount: "Top & front load"
  },
  {
    title: "Sofas",
    slug: "sofas",
    image: "/assets/generated/categories/sofas.png",
    icon: Sofa,
    gradient: "from-saffron-600/78 via-rose-900/40 to-navy-950/88",
    itemCount: "Premium comfort"
  },
  {
    title: "Beds",
    slug: "beds",
    image: "/assets/generated/categories/beds.png",
    icon: BedDouble,
    gradient: "from-amber-700/80 via-navy-900/68 to-royal-700/68",
    itemCount: "Storage & luxury"
  },
  {
    title: "Air Conditioners",
    slug: "air-conditioners",
    image: "/assets/generated/categories/air-conditioners.png",
    icon: AirVent,
    gradient: "from-blue-500/78 via-royal-700/70 to-navy-950/86",
    itemCount: "Inverter ACs"
  },
  {
    title: "Laptops",
    slug: "laptops",
    image: "/assets/generated/categories/laptops.png",
    icon: Laptop,
    gradient: "from-slate-900/86 via-royal-700/70 to-saffron-500/64",
    itemCount: "Work & study"
  },
  {
    title: "Kitchen Appliances",
    slug: "kitchen-appliances",
    image: "/assets/generated/categories/kitchen-appliances.png",
    icon: Home,
    gradient: "from-saffron-600/78 via-royal-700/70 to-navy-950/86",
    itemCount: "Daily essentials"
  }
];

const products: Product[] = [
  {
    id: "samsung-galaxy-a55",
    title: "Samsung Galaxy A55 5G",
    brand: "Samsung",
    category: "smartphones",
    image: "/assets/generated/products/smartphone-flagship.png",
    rating: 4.7,
    reviewCount: 186,
    price: 32999,
    originalPrice: 42999,
    badge: "Festival ₹10,000 off",
    inStock: true
  },
  {
    id: "vivo-v40-pro",
    title: "Vivo V40 Pro 5G",
    brand: "Vivo",
    category: "smartphones",
    image: "/assets/generated/products/smartphone-accessories.png",
    rating: 4.6,
    reviewCount: 142,
    price: 39999,
    originalPrice: 49999,
    badge: "0% EMI",
    inStock: true
  },
  {
    id: "oppo-reno-12",
    title: "Oppo Reno 12 5G",
    brand: "Oppo",
    category: "smartphones",
    image: "/assets/generated/products/smartphone-accessories.png",
    rating: 4.5,
    reviewCount: 118,
    price: 29999,
    originalPrice: 36999,
    badge: "Exchange bonus",
    inStock: true
  },
  {
    id: "samsung-s24",
    title: "Samsung Galaxy S24 AI Edition",
    brand: "Samsung",
    category: "smartphones",
    image: "/assets/generated/products/smartphone-flagship.png",
    rating: 4.9,
    reviewCount: 91,
    price: 64999,
    originalPrice: 79999,
    badge: "Premium pick",
    inStock: true
  },
  {
    id: "hp-pavilion-15",
    title: "HP Pavilion 15 Performance Laptop",
    brand: "HP",
    category: "laptops",
    image: "/assets/generated/products/laptop-work.png",
    rating: 4.5,
    reviewCount: 73,
    price: 57999,
    originalPrice: 69999,
    badge: "Student offer",
    inStock: true
  },
  {
    id: "lenovo-ideapad",
    title: "Lenovo IdeaPad Slim Work Bundle",
    brand: "Lenovo",
    category: "laptops",
    image: "/assets/generated/products/laptop-tablet-bundle.png",
    rating: 4.4,
    reviewCount: 62,
    price: 48999,
    originalPrice: 60999,
    badge: "Bag included",
    inStock: true
  },
  {
    id: "dell-inspiron",
    title: "Dell Inspiron Everyday Laptop",
    brand: "Dell",
    category: "laptops",
    image: "/assets/generated/products/laptop-work.png",
    rating: 4.5,
    reviewCount: 84,
    price: 52999,
    originalPrice: 64999,
    badge: "Easy EMI",
    inStock: true
  },
  {
    id: "gaming-laptop",
    title: "Performance Gaming Laptop",
    brand: "RajaMart",
    category: "laptops",
    image: "/assets/generated/products/gaming-laptop.png",
    rating: 4.6,
    reviewCount: 46,
    price: 74999,
    originalPrice: 92999,
    badge: "Gaming deal",
    inStock: true
  },
  {
    id: "sony-bravia-55",
    title: "Sony Bravia 55 inch 4K TV",
    brand: "Sony",
    category: "tvs",
    image: "/assets/generated/products/tv-4k.png",
    rating: 4.8,
    reviewCount: 94,
    price: 64999,
    originalPrice: 84999,
    badge: "Free installation",
    inStock: true
  },
  {
    id: "lg-oled-evo",
    title: "LG 48 inch OLED Evo Smart TV",
    brand: "LG",
    category: "tvs",
    image: "/assets/generated/products/tv-oled.png",
    rating: 4.8,
    reviewCount: 76,
    price: 78999,
    originalPrice: 104999,
    badge: "Premium deal",
    inStock: true
  },
  {
    id: "samsung-crystal-uhd",
    title: "Samsung Crystal 50 inch UHD TV",
    brand: "Samsung",
    category: "tvs",
    image: "/assets/generated/products/tv-4k.png",
    rating: 4.6,
    reviewCount: 109,
    price: 45999,
    originalPrice: 61999,
    badge: "Big screen sale",
    inStock: true
  },
  {
    id: "sony-soundbar",
    title: "Sony Dolby Soundbar With Subwoofer",
    brand: "Sony",
    category: "tvs",
    image: "/assets/generated/products/soundbar-subwoofer.png",
    rating: 4.7,
    reviewCount: 58,
    price: 21999,
    originalPrice: 29999,
    badge: "Cinema sound",
    inStock: true
  },
  {
    id: "home-theatre-bundle",
    title: "Home Theatre Speaker Bundle",
    brand: "RajaMart",
    category: "tvs",
    image: "/assets/generated/products/home-theatre.png",
    rating: 4.4,
    reviewCount: 39,
    price: 18999,
    originalPrice: 24999,
    badge: "Living room combo",
    inStock: true
  },
  {
    id: "lg-instaview-fridge",
    title: "LG InstaView Double Door Refrigerator",
    brand: "LG",
    category: "refrigerators",
    image: "/assets/generated/products/fridge-double-door.png",
    rating: 4.7,
    reviewCount: 88,
    price: 73999,
    originalPrice: 92999,
    badge: "Easy finance",
    inStock: true
  },
  {
    id: "samsung-convertible-fridge",
    title: "Samsung Convertible Refrigerator",
    brand: "Samsung",
    category: "refrigerators",
    image: "/assets/generated/products/fridge-convertible.png",
    rating: 4.6,
    reviewCount: 82,
    price: 46999,
    originalPrice: 59999,
    badge: "10 year warranty",
    inStock: true
  },
  {
    id: "whirlpool-265l-fridge",
    title: "Whirlpool 265L Frost Free Refrigerator",
    brand: "Whirlpool",
    category: "refrigerators",
    image: "/assets/generated/products/fridge-double-door.png",
    rating: 4.5,
    reviewCount: 77,
    price: 31999,
    originalPrice: 41999,
    badge: "Family value",
    inStock: true
  },
  {
    id: "whirlpool-front-load",
    title: "Whirlpool 7.5 kg Front Load Washer",
    brand: "Whirlpool",
    category: "washing-machines",
    image: "/assets/generated/products/washer-front-load.png",
    rating: 4.5,
    reviewCount: 131,
    price: 32990,
    originalPrice: 42990,
    badge: "Free delivery",
    inStock: true
  },
  {
    id: "lg-top-load",
    title: "LG 8 kg Smart Top Load Washer",
    brand: "LG",
    category: "washing-machines",
    image: "/assets/generated/products/washer-top-load.png",
    rating: 4.4,
    reviewCount: 96,
    price: 24999,
    originalPrice: 32999,
    badge: "Smart wash",
    inStock: true
  },
  {
    id: "samsung-eco-washer",
    title: "Samsung EcoBubble Front Load Washer",
    brand: "Samsung",
    category: "washing-machines",
    image: "/assets/generated/products/washer-front-load.png",
    rating: 4.7,
    reviewCount: 69,
    price: 38999,
    originalPrice: 50999,
    badge: "Low noise",
    inStock: true
  },
  {
    id: "lg-inverter-ac",
    title: "LG 1.5 Ton Dual Inverter AC",
    brand: "LG",
    category: "air-conditioners",
    image: "/assets/generated/products/split-ac.png",
    rating: 4.6,
    reviewCount: 103,
    price: 41999,
    originalPrice: 52999,
    badge: "Summer offer",
    inStock: true
  },
  {
    id: "voltas-inverter-ac",
    title: "Voltas 1.5 Ton Inverter Split AC",
    brand: "Voltas",
    category: "air-conditioners",
    image: "/assets/generated/products/split-ac.png",
    rating: 4.4,
    reviewCount: 82,
    price: 36999,
    originalPrice: 46999,
    badge: "Cooling deal",
    inStock: true
  },
  {
    id: "kitchen-combo",
    title: "Microwave + Mixer Kitchen Combo",
    brand: "RajaMart",
    category: "kitchen-appliances",
    image: "/assets/generated/products/microwave-mixer.png",
    rating: 4.5,
    reviewCount: 64,
    price: 17999,
    originalPrice: 23999,
    badge: "Combo savings",
    inStock: true
  },
  {
    id: "induction-cooktop",
    title: "Premium Induction Cooktop Set",
    brand: "RajaMart",
    category: "kitchen-appliances",
    image: "/assets/generated/products/induction-cooktop.png",
    rating: 4.3,
    reviewCount: 49,
    price: 5999,
    originalPrice: 8999,
    badge: "Kitchen essential",
    inStock: true
  },
  {
    id: "water-purifier",
    title: "RO Water Purifier With Service Kit",
    brand: "RajaMart",
    category: "kitchen-appliances",
    image: "/assets/generated/products/water-purifier.png",
    rating: 4.4,
    reviewCount: 53,
    price: 14999,
    originalPrice: 19999,
    badge: "Healthy home",
    inStock: true
  },
  {
    id: "rajamart-luxe-sofa",
    title: "RajaMart Luxe 3 Seater Sofa",
    brand: "RajaMart",
    category: "sofas",
    image: "/assets/generated/products/sofa-3-seater.png",
    rating: 4.8,
    reviewCount: 64,
    price: 38999,
    originalPrice: 52999,
    badge: "Custom fabric",
    inStock: true
  },
  {
    id: "sectional-sofa",
    title: "Premium L-Shaped Sectional Sofa",
    brand: "RajaMart",
    category: "sofas",
    image: "/assets/generated/products/sofa-sectional.png",
    rating: 4.7,
    reviewCount: 52,
    price: 58999,
    originalPrice: 78999,
    badge: "Living room hero",
    inStock: true
  },
  {
    id: "recliner-chair",
    title: "Luxury Recliner Chair",
    brand: "RajaMart",
    category: "sofas",
    image: "/assets/generated/products/recliner-chair.png",
    rating: 4.6,
    reviewCount: 41,
    price: 24999,
    originalPrice: 34999,
    badge: "Comfort pick",
    inStock: true
  },
  {
    id: "tv-unit-coffee-table",
    title: "TV Unit + Coffee Table Combo",
    brand: "RajaMart",
    category: "sofas",
    image: "/assets/generated/products/tv-unit-coffee-table.png",
    rating: 4.5,
    reviewCount: 38,
    price: 32999,
    originalPrice: 45999,
    badge: "Room combo",
    inStock: true
  },
  {
    id: "rajamart-storage-bed",
    title: "Premium Hydraulic Storage Bed",
    brand: "RajaMart",
    category: "beds",
    image: "/assets/generated/products/queen-storage-bed.png",
    rating: 4.7,
    reviewCount: 57,
    price: 45999,
    originalPrice: 64999,
    badge: "Free assembly",
    inStock: true
  },
  {
    id: "king-bedroom-set",
    title: "King Bed With Side Table Set",
    brand: "RajaMart",
    category: "beds",
    image: "/assets/generated/products/king-bed-side-tables.png",
    rating: 4.8,
    reviewCount: 44,
    price: 69999,
    originalPrice: 94999,
    badge: "Luxury bedroom",
    inStock: true
  },
  {
    id: "dining-table-six",
    title: "Six Seater Dining Table Set",
    brand: "RajaMart",
    category: "beds",
    image: "/assets/generated/products/dining-six-seater.png",
    rating: 4.6,
    reviewCount: 36,
    price: 42999,
    originalPrice: 57999,
    badge: "Family dining",
    inStock: true
  },
  {
    id: "wardrobe-dressing-unit",
    title: "Wardrobe + Dressing Unit",
    brand: "RajaMart",
    category: "beds",
    image: "/assets/generated/products/wardrobe-dressing.png",
    rating: 4.5,
    reviewCount: 31,
    price: 54999,
    originalPrice: 71999,
    badge: "Bedroom upgrade",
    inStock: true
  }
];

const offers: Offer[] = [
  {
    title: "Mega Festival Sale",
    subtitle: "Big savings on mobiles, TVs, appliances and furniture.",
    cta: "Explore offers",
    image: "/assets/generated/banners/festival-sale.png",
    icon: Gift
  },
  {
    title: "0% EMI Available",
    subtitle: "Bring home premium products with convenient finance options.",
    cta: "Ask for EMI",
    image: "/assets/generated/banners/emi-finance.png",
    icon: CreditCard
  },
  {
    title: "Exchange Offers",
    subtitle: "Upgrade your old electronics with better value at RajaMart.",
    cta: "Check value",
    image: "/assets/generated/banners/exchange-offer.png",
    icon: Percent
  },
  {
    title: "Free Home Delivery",
    subtitle: "Fast local delivery and setup support across Darsi.",
    cta: "Book delivery",
    image: "/assets/generated/banners/free-delivery.png",
    icon: Truck
  }
];

const whyChooseUs = [
  {
    title: "Genuine Products",
    icon: ShieldCheck,
    image: "/assets/generated/illustrations/genuine.png",
    text: "Trusted brands, verified stock and clear billing."
  },
  {
    title: "Best Prices",
    icon: Percent,
    image: "/assets/generated/banners/mobile-flash-deal.png",
    text: "Local deals, festival prices and smart bundles."
  },
  {
    title: "Trusted Local Store",
    icon: BadgeCheck,
    image: "/assets/generated/gallery/help-desk.png",
    text: "Serving families around Darsi with care."
  },
  {
    title: "Fast Delivery",
    icon: Truck,
    image: "/assets/generated/illustrations/delivery.png",
    text: "Quick delivery for electronics and furniture."
  },
  {
    title: "EMI Available",
    icon: CreditCard,
    image: "/assets/generated/illustrations/emi.png",
    text: "Flexible finance support on premium purchases."
  },
  {
    title: "Customer Support",
    icon: Headphones,
    image: "/assets/generated/illustrations/support.png",
    text: "Friendly help before and after your purchase."
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Anusha Reddy",
    location: "Darsi",
    avatar: "AR",
    rating: 5,
    review:
      "RajaMart helped us choose a TV and sofa together. The pricing was transparent and delivery was quick."
  },
  {
    name: "Kiran Kumar",
    location: "Podili Road",
    avatar: "KK",
    rating: 5,
    review:
      "Good local store for mobiles and appliances. The WhatsApp support made the whole order simple."
  },
  {
    name: "Sravani Priya",
    location: "Prakasam District",
    avatar: "SP",
    rating: 5,
    review:
      "We bought a refrigerator and bed. Staff explained EMI clearly and the installation was smooth."
  }
];

const gallery = [
  {
    title: "Premium showroom floor",
    image: "/assets/generated/gallery/mobile-counter.png",
    span: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Mobile counters",
    image: "/assets/generated/gallery/mobile-counter.png",
    span: ""
  },
  {
    title: "Appliance displays",
    image: "/assets/generated/gallery/appliance-aisle.png",
    span: ""
  },
  {
    title: "Furniture studio",
    image: "/assets/generated/gallery/furniture-zone.png",
    span: "md:col-span-2"
  },
  {
    title: "Entertainment zone",
    image: "/assets/generated/gallery/tv-wall.png",
    span: ""
  },
  {
    title: "Festival display",
    image: "/assets/generated/gallery/festival-zone.png",
    span: ""
  },
  {
    title: "Home delivery prep",
    image: "/assets/generated/gallery/delivery-zone.png",
    span: "md:col-span-2"
  },
  {
    title: "Living room set",
    image: "/assets/generated/gallery/living-room-set.png",
    span: ""
  },
  {
    title: "Bedroom collection",
    image: "/assets/generated/gallery/bedroom-set.png",
    span: ""
  },
  {
    title: "Dining display",
    image: "/assets/generated/gallery/dining-room-set.png",
    span: ""
  },
  {
    title: "Support desk",
    image: "/assets/generated/gallery/help-desk.png",
    span: ""
  },
  {
    title: "Bundle showcase",
    image: "/assets/generated/gallery/mixed-bundle-display.png",
    span: "md:col-span-2"
  }
];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function discountPercent(product: Product) {
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.58, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={classNames(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      <div
        className={classNames(
          "mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em]",
          dark
            ? "border-white/15 bg-white/10 text-saffron-400"
            : "border-royal-100 bg-royal-50 text-royal-700 dark:border-white/10 dark:bg-white/10 dark:text-saffron-400"
        )}
      >
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2
        className={classNames(
          "text-3xl font-black leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-navy-950 dark:text-white"
        )}
      >
        {title}
      </h2>
      <p
        className={classNames(
          "mt-4 text-base leading-7 sm:text-lg",
          dark ? "text-white/68" : "text-slate-600 dark:text-white/68"
        )}
      >
        {subtitle}
      </p>
    </Reveal>
  );
}

function Counter({
  value,
  suffix,
  label
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(value * progress));
      if (frame >= totalFrames) {
        window.clearInterval(timer);
        setCount(value);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 text-center shadow-premium backdrop-blur-xl">
      <span ref={ref} className="text-3xl font-black text-white sm:text-4xl">
        {count.toLocaleString("en-IN")}
        {suffix}
      </span>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/58">
        {label}
      </p>
    </div>
  );
}

function Rating({ value, count }: { value: number; count: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex text-saffron-500">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={classNames(
              "h-4 w-4",
              index + 1 <= Math.round(value) ? "fill-current" : "fill-none"
            )}
          />
        ))}
      </div>
      <span className="font-bold text-slate-700 dark:text-white/76">{value.toFixed(1)}</span>
      <span className="text-slate-400">({count})</span>
    </div>
  );
}

function Navbar({
  search,
  setSearch,
  cartCount,
  openCart,
  isDark,
  setIsDark
}: {
  search: string;
  setSearch: (value: string) => void;
  cartCount: number;
  openCart: () => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 px-3 pt-3 sm:px-5">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[1.6rem] px-3 py-3 shadow-premium sm:px-5">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="RajaMart home">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-royal-600 to-saffron-500 text-lg font-black text-white shadow-glow">
              R
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-black text-navy-950 dark:text-white">
                RajaMart
              </span>
              <span className="hidden text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-white/50 sm:block">
                Electronics & Furniture
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-royal-50 hover:text-royal-700 dark:text-white/72 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden min-w-[260px] max-w-sm flex-1 items-center rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-white/10 dark:bg-white/10 md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search mobiles, sofas, TVs"
              className="ml-3 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              aria-label="Search products"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-navy-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-navy-950 text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-royal-700 dark:bg-white dark:text-navy-950"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-saffron-500 px-1 text-xs font-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href={whatsappUrl("Hi RajaMart, I want to know today's best offers.")}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#16a34a] px-4 py-3 text-sm font-black text-white shadow-lg shadow-green-500/25 transition hover:-translate-y-0.5 sm:flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-navy-950 shadow-sm lg:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-navy-950/70 p-3 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ml-auto flex h-full max-w-sm flex-col rounded-[2rem] bg-white p-5 shadow-premium dark:bg-navy-900"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-black text-navy-950 dark:text-white">RajaMart</p>
                  <p className="text-sm text-slate-500 dark:text-white/56">Darsi showroom</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-navy-950 dark:bg-white/10 dark:text-white"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products"
                  className="ml-3 w-full bg-transparent text-sm font-semibold outline-none dark:text-white"
                  aria-label="Search products"
                />
              </div>
              <div className="mt-6 grid gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base font-black text-navy-950 transition hover:bg-royal-50 hover:text-royal-700 dark:text-white dark:hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto grid gap-3">
                <a
                  href={whatsappUrl("Hi RajaMart, I want to order on WhatsApp.")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#16a34a] px-5 py-4 text-sm font-black text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Order
                </a>
                <a
                  href={`tel:${DISPLAY_PHONE.replaceAll(" ", "")}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-navy-950 px-5 py-4 text-sm font-black text-white dark:bg-white dark:text-navy-950"
                >
                  <Phone className="h-5 w-5" />
                  Call Store
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const offerChips = [
    { label: "0% EMI", icon: CreditCard },
    { label: "Festival Sale", icon: Gift },
    { label: "Free Delivery", icon: Truck }
  ];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-premium-dark pt-28 text-white"
    >
      <Image
        src="/assets/generated/hero-showroom.png"
        alt="Premium RajaMart electronics and furniture showroom"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,8,23,0.96)_0%,rgba(2,8,23,0.82)_38%,rgba(2,8,23,0.30)_100%)]" />
      <div className="absolute left-[-12rem] top-20 -z-10 h-96 w-96 rounded-full bg-royal-500/40 blur-3xl" />
      <div className="absolute bottom-20 right-[-8rem] -z-10 h-80 w-80 rounded-full bg-saffron-500/30 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-saffron-400 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Premium showroom in Darsi
          </div>
          <h1 className="text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
            Your Trusted Electronics & Furniture Store in Darsi
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/74 sm:text-xl">
            Mobiles, TVs, Refrigerators, Sofas, Washing Machines & More
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-navy-950 shadow-glow transition hover:-translate-y-1 hover:bg-saffron-400"
            >
              <ShoppingBag className="h-5 w-5 transition group-hover:rotate-[-8deg]" />
              Shop Now
            </a>
            <a
              href={whatsappUrl("Hi RajaMart, I want to place an order. Please share the latest offers.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-7 py-4 text-sm font-black text-white shadow-lg shadow-green-500/25 transition hover:-translate-y-1"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Order
            </a>
            <a
              href="#offers"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/18"
            >
              <Zap className="h-5 w-5 text-saffron-400" />
              Explore Offers
            </a>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            {offerChips.map((chip, index) => {
              const Icon = chip.icon;
              return (
                <motion.div
                  key={chip.label}
                  className="shimmer relative overflow-hidden rounded-2xl border border-white/14 bg-white/10 px-4 py-3 shadow-premium backdrop-blur-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.35 }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm font-black">
                    <Icon className="h-5 w-5 text-saffron-400" />
                    {chip.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {[
              "/assets/generated/products/smartphone-flagship.png",
              "/assets/generated/products/tv-oled.png",
              "/assets/generated/products/fridge-double-door.png",
              "/assets/generated/products/sofa-sectional.png",
              "/assets/generated/products/queen-storage-bed.png"
            ].map((image, index) => (
              <motion.div
                key={image}
                className="relative aspect-square overflow-hidden rounded-2xl border border-white/12 bg-white/10 shadow-premium backdrop-blur-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5 + index * 0.08 }}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.86, ease: "easeOut", delay: 0.14 }}
          className="relative hidden min-h-[560px] lg:block"
          aria-hidden="true"
        >
          <div className="absolute right-0 top-6 w-[82%] rounded-[2.5rem] border border-white/14 bg-white/10 p-5 shadow-glow backdrop-blur-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/assets/generated/gallery-showroom.png"
                alt=""
                fill
                sizes="42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/16 bg-white/12 p-4 backdrop-blur-xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron-400">
                  RajaMart picks
                </p>
                <p className="mt-2 text-2xl font-black">Mobiles + TVs + Sofas</p>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute left-4 top-24 rounded-[1.5rem] border border-white/14 bg-white/12 p-4 shadow-premium backdrop-blur-xl"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 4.3, repeat: Infinity }}
          >
            <p className="text-3xl font-black text-saffron-400">10,000+</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-white/64">
              Happy customers
            </p>
          </motion.div>
          <motion.div
            className="absolute bottom-16 left-0 rounded-[1.5rem] border border-white/14 bg-white/12 p-4 shadow-premium backdrop-blur-xl"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.8, repeat: Infinity }}
          >
            <p className="flex items-center gap-2 text-lg font-black">
              <Check className="h-5 w-5 text-green-400" />
              Same-day local support
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const picks = [
    {
      title: "Smartphone Deals",
      subtitle: "5G mobiles, accessories and finance support",
      image: "/assets/generated/banners/mobile-flash-deal.png",
      href: "#products"
    },
    {
      title: "Furniture Makeover",
      subtitle: "Sofas, beds, dining and room combos",
      image: "/assets/generated/banners/furniture-makeover.png",
      href: "#gallery"
    },
    {
      title: "Appliance Upgrade",
      subtitle: "Refrigerators, washers, ACs and kitchen care",
      image: "/assets/generated/gallery/appliance-aisle.png",
      href: "#products"
    }
  ];

  const miniProducts = products.slice(0, 12);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 dark:bg-navy-900">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-950/10 to-transparent dark:from-black/30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {picks.map((pick, index) => (
            <Reveal key={pick.title} delay={index * 0.05}>
              <a
                href={pick.href}
                className="group relative block min-h-72 overflow-hidden rounded-[2rem] bg-navy-950 p-6 text-white shadow-premium transition hover:-translate-y-2"
              >
                <Image
                  src={pick.image}
                  alt={pick.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-72 transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/42 to-transparent" />
                <div className="relative z-10 flex h-full min-h-60 flex-col justify-end">
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white text-royal-700 shadow-glow">
                    <Sparkles className="h-6 w-6" />
                  </span>
                  <h2 className="text-2xl font-black">{pick.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                    {pick.subtitle}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-premium dark:border-white/10 dark:bg-white/[0.06]">
          <div className="flex gap-4 overflow-x-auto pb-1 hide-scrollbar">
            {miniProducts.map((product) => (
              <a
                key={product.id}
                href="#products"
                className="group w-40 shrink-0"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-navy-950">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="160px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="mt-3 line-clamp-2 min-h-10 text-sm font-black text-navy-950 dark:text-white">
                  {product.title}
                </p>
                <p className="text-sm font-black text-royal-700 dark:text-saffron-400">
                  {currency.format(product.price)}
                </p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryGrid({
  selectedCategory,
  setSelectedCategory
}: {
  selectedCategory: "All" | CategorySlug;
  setSelectedCategory: (value: "All" | CategorySlug) => void;
}) {
  return (
    <section id="categories" className="bg-white py-20 dark:bg-navy-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Shop by room and need"
          title="Premium Categories for Every Home"
          subtitle="Browse electronics and furniture the way customers actually shop: by upgrade, by room, by budget, and by trusted local support."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const active = selectedCategory === category.slug;
            return (
              <Reveal key={category.slug} delay={index * 0.04}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(active ? "All" : category.slug)}
                  className={classNames(
                    "group relative h-72 w-full overflow-hidden rounded-[2rem] text-left shadow-premium transition duration-500 hover:-translate-y-2",
                    active && "ring-4 ring-saffron-400"
                  )}
                >
                  <Image
                    src={category.image}
                    alt={`${category.title} at RajaMart`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
                  <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/18 bg-white/16 p-4 text-white backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black">{category.title}</h3>
                        <p className="mt-1 text-sm font-bold text-white/70">{category.itemCount}</p>
                      </div>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-royal-700 shadow-lg">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  addToCart
}: {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: "All" | CategorySlug;
  setSelectedCategory: (value: "All" | CategorySlug) => void;
  addToCart: (product: Product) => void;
}) {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const brands = useMemo(() => ["All", ...Array.from(new Set(products.map((product) => product.brand)))], []);
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        term.length === 0 ||
        product.title.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.replace("-", " ").includes(term);
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [search, selectedBrand, selectedCategory]);

  return (
    <section id="products" className="relative overflow-hidden bg-premium-dark py-20 text-white sm:py-24">
      <div className="absolute left-[-8rem] top-8 h-72 w-72 rounded-full bg-royal-500/25 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-8rem] h-80 w-80 rounded-full bg-saffron-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured products"
          title="Real Ecommerce Cards With Smart Local Ordering"
          subtitle="Search, filter, add to cart, or send a WhatsApp enquiry from any product card."
          dark
        />

        <Reveal className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-premium backdrop-blur-xl">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <Search className="h-5 w-5 text-white/50" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by product, brand, category"
                className="ml-3 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/40"
                aria-label="Search featured products"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white/60">
                <Filter className="h-4 w-4" />
                Filters
              </span>
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={classNames(
                    "shrink-0 rounded-full px-4 py-3 text-sm font-black transition",
                    selectedBrand === brand
                      ? "bg-saffron-500 text-white shadow-orangeGlow"
                      : "bg-white/10 text-white/72 hover:bg-white/18"
                  )}
                >
                  {brand}
                </button>
              ))}
              {(search || selectedBrand !== "All" || selectedCategory !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedBrand("All");
                    setSelectedCategory("All");
                  }}
                  className="shrink-0 rounded-full bg-white px-4 py-3 text-sm font-black text-navy-950"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} index={index} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center">
            <p className="text-xl font-black">No matching products found</p>
            <p className="mt-2 text-white/60">Try another search or clear the filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  addToCart,
  index
}: {
  product: Product;
  addToCart: (product: Product) => void;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.035}>
      <article className="group h-full overflow-hidden rounded-[2rem] bg-white text-navy-950 shadow-premium transition duration-500 hover:-translate-y-2 dark:bg-white/[0.08] dark:text-white">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-navy-900">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute left-3 top-3 rounded-full bg-saffron-500 px-3 py-2 text-xs font-black text-white shadow-orangeGlow">
            {product.badge}
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-navy-950/86 px-3 py-2 text-xs font-black text-white backdrop-blur-xl">
            {discountPercent(product)}% off
          </div>
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full bg-royal-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-royal-700 dark:bg-white/10 dark:text-saffron-400">
              {product.brand}
            </span>
            <span className="text-xs font-black text-green-600 dark:text-green-400">
              {product.inStock ? "In stock" : "Ask store"}
            </span>
          </div>
          <h3 className="min-h-[3.5rem] text-lg font-black leading-snug">{product.title}</h3>
          <div className="mt-3">
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-2xl font-black">{currency.format(product.price)}</span>
            <span className="pb-1 text-sm font-bold text-slate-400 line-through">
              {currency.format(product.originalPrice)}
            </span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-950 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-royal-700 dark:bg-white dark:text-navy-950"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </button>
            <a
              href={whatsappUrl(`Hi RajaMart, I want to buy ${product.title} listed at ${currency.format(product.price)}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#16a34a] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Buy
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function OffersSection() {
  return (
    <section id="offers" className="bg-white py-20 dark:bg-navy-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Mega offers"
          title="Festival Offers Built for Big Home Upgrades"
          subtitle="Premium electronics, essential appliances and furniture bundles with EMI, exchange and local delivery support."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Reveal key={offer.title} delay={index * 0.05}>
                <a
                  href={whatsappUrl(`Hi RajaMart, please share details about ${offer.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block h-full min-h-[360px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-royal-700 via-navy-900 to-navy-950 p-6 text-white shadow-premium transition hover:-translate-y-2"
                >
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-72 transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/68 to-transparent" />
                  <div className="relative z-10 flex h-full min-h-[312px] flex-col justify-end">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-royal-700 shadow-glow transition group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-8 text-2xl font-black">{offer.title}</h3>
                    <p className="mt-3 min-h-[4.5rem] text-sm font-medium leading-6 text-white/72">
                      {offer.subtitle}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-saffron-400">
                      {offer.cta}
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 overflow-hidden rounded-[2rem] bg-premium-dark p-5 shadow-premium sm:p-8">
          <div className="grid gap-5 lg:grid-cols-3">
            <Counter value={10000} suffix="+" label="Customers" />
            <Counter value={15} suffix="+" label="Years Experience" />
            <Counter value={5000} suffix="+" label="Products" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinanceSection() {
  const [amount, setAmount] = useState(45000);
  const [tenure, setTenure] = useState(9);
  const monthly = Math.round(amount / tenure);

  const plans = [
    {
      title: "0% EMI",
      text: "Ask the store team for eligible cards and finance partners.",
      icon: CreditCard,
      image: "/assets/generated/illustrations/emi.png"
    },
    {
      title: "Exchange Value",
      text: "Upgrade old electronics and reduce your new purchase amount.",
      icon: Percent,
      image: "/assets/generated/banners/exchange-offer.png"
    },
    {
      title: "Delivery + Setup",
      text: "Coordinate delivery, installation and assembly directly on WhatsApp.",
      icon: Truck,
      image: "/assets/generated/illustrations/delivery.png"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-premium-dark py-20 text-white sm:py-24">
      <Image
        src="/assets/generated/banners/emi-finance.png"
        alt="EMI finance offer at RajaMart"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover opacity-24"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-950/94 to-royal-900/82" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <Reveal>
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-saffron-400">
              <CreditCard className="h-4 w-4" />
              EMI desk
            </div>
            <h2 className="text-3xl font-black leading-tight sm:text-5xl">
              Easy Finance for Big Home Purchases
            </h2>
            <p className="mt-4 text-lg font-medium leading-8 text-white/68">
              Plan your mobile, TV, refrigerator, sofa or full-room upgrade with clear monthly estimates before you visit the showroom.
            </p>
          </div>
          <div className="mt-8 rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-premium backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-black uppercase tracking-[0.14em] text-white/50">
                Purchase amount
              </span>
              <span className="text-2xl font-black text-saffron-400">{currency.format(amount)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-5 w-full accent-saffron-500"
              aria-label="Purchase amount"
            />
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-sm font-black uppercase tracking-[0.14em] text-white/50">
                Tenure
              </span>
              <div className="flex gap-2">
                {[6, 9, 12].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTenure(months)}
                    className={classNames(
                      "rounded-full px-4 py-2 text-sm font-black transition",
                      tenure === months ? "bg-saffron-500 text-white" : "bg-white/10 text-white/70"
                    )}
                  >
                    {months} mo
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-white p-5 text-navy-950">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                Estimated monthly payment
              </p>
              <p className="mt-2 text-4xl font-black">{currency.format(monthly)}</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Indicative calculation only. Final finance terms are confirmed in store.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Reveal key={plan.title} delay={index * 0.05}>
                <article className="group grid h-full grid-cols-[112px_1fr] gap-4 overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-3 shadow-premium backdrop-blur-xl transition hover:-translate-y-2 sm:grid-cols-1 lg:grid-cols-[150px_1fr]">
                  <div className="relative min-h-28 overflow-hidden rounded-[1.4rem]">
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      fill
                      sizes="180px"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-2">
                    <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-white text-royal-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-black">{plan.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-white/62">{plan.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-navy-900 sm:py-24">
      <div className="absolute right-[-10rem] top-12 h-80 w-80 rounded-full bg-royal-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why RajaMart"
          title="A Local Store With Premium Retail Confidence"
          subtitle="The purchase still feels personal, but the shopping experience feels modern, organized and trustworthy."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="group h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-premium transition hover:-translate-y-2 dark:border-white/10 dark:bg-white/[0.06]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-navy-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  </div>
                  <div className="p-6">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-royal-600 to-saffron-500 text-white shadow-glow">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-black text-navy-950 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600 dark:text-white/62">
                    {item.text}
                  </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const previous = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((current) => (current + 1) % testimonials.length);

  return (
    <section className="bg-white py-20 dark:bg-navy-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Customer love"
          title="Trusted by Families Across Darsi"
          subtitle="Professional service, clear guidance and local support make the showroom experience memorable."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative overflow-hidden rounded-[2.2rem] bg-premium-dark p-6 shadow-premium sm:p-10">
            <AnimatePresence mode="wait">
              <motion.article
                key={testimonials[active].name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="text-white"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-royal-600 text-xl font-black shadow-orangeGlow">
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">{testimonials[active].name}</h3>
                      <p className="mt-1 text-sm font-bold text-white/56">{testimonials[active].location}</p>
                    </div>
                  </div>
                  <div className="flex text-saffron-400">
                    {Array.from({ length: testimonials[active].rating }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-8 text-xl font-semibold leading-9 text-white/78">
                  “{testimonials[active].review}”
                </p>
              </motion.article>
            </AnimatePresence>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActive(index)}
                    className={classNames(
                      "h-2.5 rounded-full transition-all",
                      active === index ? "w-9 bg-saffron-400" : "w-2.5 bg-white/24"
                    )}
                    aria-label={`Show testimonial from ${testimonial.name}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppCTA() {
  return (
    <section className="relative overflow-hidden bg-premium-dark py-20 text-white sm:py-24">
      <Image
        src="/assets/generated/gallery-showroom.png"
        alt="RajaMart showroom background"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover opacity-28"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/92 to-royal-900/70" />
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-[#16a34a] shadow-lg shadow-green-500/30">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">Order Directly on WhatsApp</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-8 text-white/70">
            Ask for live prices, confirm stock, request delivery and get festival offers from RajaMart without waiting.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappUrl("Hi RajaMart, I want to order directly on WhatsApp.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-8 py-4 text-sm font-black text-white shadow-lg shadow-green-500/25 transition hover:-translate-y-1"
            >
              <MessageCircle className="h-5 w-5" />
              Start WhatsApp Order
            </a>
            <a
              href={`tel:${DISPLAY_PHONE.replaceAll(" ", "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1"
            >
              <Phone className="h-5 w-5" />
              Call {DISPLAY_PHONE}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="bg-slate-50 py-20 dark:bg-navy-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Showroom gallery"
          title="Electronics and Furniture in One Premium Destination"
          subtitle="A polished visual tour for mobile counters, appliance displays, furniture studio setups and entertainment zones."
        />
        <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-4">
          {gallery.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className={classNames("group", item.span)}>
              <figure className="relative h-full overflow-hidden rounded-[2rem] shadow-premium">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/78 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/14 bg-white/12 px-4 py-3 text-sm font-black text-white backdrop-blur-xl">
                  {item.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20 dark:bg-navy-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Visit RajaMart"
          title="Darsi’s Premium Electronics & Furniture Showroom"
          subtitle="Walk in, call, or send a WhatsApp message for the latest products, offers, EMI and delivery support."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-premium dark:border-white/10 dark:bg-white/5">
              <iframe
                title="RajaMart Darsi map placeholder"
                src="https://www.google.com/maps?q=Darsi%2C%20Andhra%20Pradesh%2C%20India&output=embed"
                loading="lazy"
                className="h-[420px] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium dark:border-white/10 dark:bg-white/[0.06]">
              <div className="grid gap-4">
                <ContactItem icon={MapPin} title="Address" text="Darsi, Prakasam District, Andhra Pradesh, India" />
                <ContactItem icon={Phone} title="Phone" text={DISPLAY_PHONE} href={`tel:${DISPLAY_PHONE.replaceAll(" ", "")}`} />
                <ContactItem icon={MessageCircle} title="WhatsApp" text={DISPLAY_PHONE} href={whatsappUrl("Hi RajaMart, I need store assistance.")} />
                <ContactItem icon={Mail} title="Email" text={EMAIL} href={`mailto:${EMAIL}`} />
                <ContactItem icon={Clock3} title="Business Timings" text="Monday - Sunday, 9:00 AM - 9:00 PM" />
              </div>

              <form className="mt-6 grid gap-3" onSubmit={(event) => event.preventDefault()}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold outline-none transition focus:border-royal-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
                    placeholder="Your name"
                    aria-label="Your name"
                  />
                  <input
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold outline-none transition focus:border-royal-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
                    placeholder="Mobile number"
                    aria-label="Mobile number"
                  />
                </div>
                <textarea
                  className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold outline-none transition focus:border-royal-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  placeholder="Tell us what you are looking for"
                  aria-label="Message"
                />
                <a
                  href={whatsappUrl("Hi RajaMart, I submitted an enquiry from the website. Please contact me.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-950 px-5 py-4 text-sm font-black text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-royal-700 dark:bg-white dark:text-navy-950"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Enquiry on WhatsApp
                </a>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  title,
  text,
  href
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-white/10">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-royal-50 text-royal-700 dark:bg-white/10 dark:text-saffron-400">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-black text-navy-950 dark:text-white">{title}</span>
        <span className="mt-1 block text-sm font-semibold leading-6 text-slate-600 dark:text-white/62">{text}</span>
      </span>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {content}
    </a>
  );
}

function Footer() {
  const footerCategories = categories.slice(0, 6);

  return (
    <footer className="bg-navy-950 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-royal-600 to-saffron-500 text-xl font-black shadow-glow">
                R
              </span>
              <div>
                <p className="text-2xl font-black">RajaMart</p>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/44">
                  Electronics & Furniture
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-white/58">
              Premium local showroom in Darsi for mobiles, TVs, appliances, sofas, beds and home essentials.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-saffron-500"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-saffron-500"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-saffron-500"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-saffron-400">Quick links</h3>
            <div className="mt-5 grid gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-semibold text-white/62 hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-saffron-400">Categories</h3>
            <div className="mt-5 grid gap-3">
              {footerCategories.map((category) => (
                <a
                  key={category.slug}
                  href="#categories"
                  className="text-sm font-semibold text-white/62 hover:text-white"
                >
                  {category.title}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-saffron-400">Newsletter</h3>
            <p className="mt-5 text-sm font-medium leading-6 text-white/58">
              Get festival sale alerts, EMI offers and showroom updates.
            </p>
            <div className="mt-4 flex rounded-2xl border border-white/10 bg-white/10 p-1">
              <input
                placeholder="Email address"
                aria-label="Newsletter email"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold text-white outline-none placeholder:text-white/40"
              />
              <button
                type="button"
                className="rounded-xl bg-saffron-500 px-4 py-3 text-sm font-black text-white"
              >
                Join
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["UPI", "Cards", "RuPay", "EMI", "Cash"].map((payment) => (
                <span key={payment} className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white/70">
                  {payment}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 py-6 text-sm font-semibold text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RajaMart Electronics & Furniture. All rights reserved.</p>
          <p>Darsi, Prakasam District, Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
}

function CartDrawer({
  open,
  close,
  items,
  updateQuantity,
  removeItem,
  subtotal
}: {
  open: boolean;
  close: () => void;
  items: CartItem[];
  updateQuantity: (productId: string, nextQuantity: number) => void;
  removeItem: (productId: string) => void;
  subtotal: number;
}) {
  const checkoutMessage =
    items.length > 0
      ? `Hi RajaMart, I want to place this order:\n${items
          .map(
            (item) =>
              `${item.quantity} x ${item.product.title} - ${currency.format(item.product.price * item.quantity)}`
          )
          .join("\n")}\nSubtotal: ${currency.format(subtotal)}`
      : "Hi RajaMart, I want to know today's best offers.";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-navy-950/70 p-3 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            className="ml-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium dark:bg-navy-900"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-white/10">
              <div>
                <h2 className="text-2xl font-black text-navy-950 dark:text-white">Your Cart</h2>
                <p className="text-sm font-semibold text-slate-500 dark:text-white/54">
                  {items.length} selected item{items.length === 1 ? "" : "s"}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-navy-950 dark:bg-white/10 dark:text-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingCart className="mx-auto h-14 w-14 text-slate-300" />
                    <p className="mt-4 text-xl font-black text-navy-950 dark:text-white">Cart is empty</p>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-white/54">
                      Add products or ask RajaMart for the latest showroom deals.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-[88px_1fr] gap-4 rounded-[1.4rem] border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/10"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-navy-950">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={120}
                          height={120}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-black leading-5 text-navy-950 dark:text-white">
                            {item.product.title}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-slate-500 dark:bg-white/10 dark:text-white/60"
                            aria-label={`Remove ${item.product.title}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-sm font-black text-royal-700 dark:text-saffron-400">
                          {currency.format(item.product.price)}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center rounded-full bg-white p-1 dark:bg-navy-950">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="grid h-8 w-8 place-items-center rounded-full text-navy-950 dark:text-white"
                              aria-label={`Decrease quantity for ${item.product.title}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="grid h-8 min-w-8 place-items-center text-sm font-black text-navy-950 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="grid h-8 w-8 place-items-center rounded-full text-navy-950 dark:text-white"
                              aria-label={`Increase quantity for ${item.product.title}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm font-black text-navy-950 dark:text-white">
                            {currency.format(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-slate-200 p-5 dark:border-white/10">
              <div className="mb-4 flex items-center justify-between text-navy-950 dark:text-white">
                <span className="text-sm font-black uppercase tracking-[0.16em] text-slate-500 dark:text-white/48">
                  Subtotal
                </span>
                <span className="text-2xl font-black">{currency.format(subtotal)}</span>
              </div>
              <a
                href={whatsappUrl(checkoutMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#16a34a] px-5 py-4 text-sm font-black text-white shadow-lg shadow-green-500/25 transition hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Checkout on WhatsApp
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-30 grid gap-3 sm:right-6">
      <a
        href={whatsappUrl("Hi RajaMart, I need help with products and offers.")}
        target="_blank"
        rel="noreferrer"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#16a34a] text-white shadow-lg shadow-green-500/35 transition hover:-translate-y-1"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <a
        href={`tel:${DISPLAY_PHONE.replaceAll(" ", "")}`}
        className="grid h-14 w-14 place-items-center rounded-full bg-saffron-500 text-white shadow-orangeGlow transition hover:-translate-y-1"
        aria-label="Call RajaMart"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-premium-dark text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="text-center">
        <motion.div
          className="mx-auto grid h-20 w-20 place-items-center rounded-[1.8rem] bg-gradient-to-br from-royal-600 to-saffron-500 text-3xl font-black shadow-glow"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          R
        </motion.div>
        <p className="mt-5 text-xl font-black">RajaMart</p>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.24em] text-white/48">
          Loading showroom
        </p>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | CategorySlug>("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("rajamart-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme ? savedTheme === "dark" : prefersDark);

    const savedCart = window.localStorage.getItem("rajamart-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart) as CartItem[]);
      } catch {
        window.localStorage.removeItem("rajamart-cart");
      }
    }
    setCartReady(true);

    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("rajamart-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (cartReady) {
      window.localStorage.setItem("rajamart-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, cartReady]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (productId: string, nextQuantity: number) => {
    setCartItems((current) =>
      current
        .map((item) => (item.product.id === productId ? { ...item, quantity: nextQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((current) => current.filter((item) => item.product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-white text-navy-950 dark:bg-navy-950 dark:text-white">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <Navbar
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <main>
        <Hero />
        <FeaturedCollections />
        <CategoryGrid selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <ProductShowcase
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={addToCart}
        />
        <OffersSection />
        <FinanceSection />
        <WhyChooseUs />
        <Testimonials />
        <WhatsAppCTA />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
        items={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        subtotal={subtotal}
      />
    </div>
  );
}
