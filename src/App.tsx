/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Send, 
  ShieldCheck, 
  Zap, 
  Users, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Star,
  ShoppingBag
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Custom TikTok icon in Lucide style (since it's deprecated/missing in certain lucide-react builds)
const Tiktok = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Pricing Data
const PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    color: 'from-purple-600 to-pink-500',
    services: {
      followers: [
        { amount: '1.000', price: 'Rp 45.000', popular: false },
        { amount: '2.000', price: 'Rp 80.000', popular: true },
        { amount: '3.000', price: 'Rp 120.000', popular: false },
        { amount: '5.000', price: 'Rp 200.000', popular: true },
        { amount: '8.000', price: 'Rp 270.000', popular: true },
        { amount: '10.000', price: 'Rp 370.000', popular: false },
      ],
      likes: [
        { amount: '1.000', price: 'Rp 25.000', popular: false },
        { amount: '2.000', price: 'Rp 45.000', popular: true },
        { amount: '5.000', price: 'Rp 90.000', popular: false },
        { amount: '8.000', price: 'Rp 170.000', popular: true },
        { amount: '10.000', price: 'Rp 225.000', popular: false },
      ],
      views: [
        { amount: '1.000', price: 'Rp 8.000', popular: false },
        { amount: '2.000', price: 'Rp 15.000', popular: true },
        { amount: '5.000', price: 'Rp 35.000', popular: false },
        { amount: '8.000', price: 'Rp 50.000', popular: true },
        { amount: '10.000', price: 'Rp 60.000', popular: false },
      ]
    }
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <Tiktok className="w-6 h-6" />, 
    color: 'from-black to-slate-800',
    services: {
      followers: [
        { amount: '500', price: 'Rp 45.000', popular: false },
        { amount: '1.000', price: 'Rp 85.000', popular: false },
        { amount: '2.000', price: 'Rp 150.000', popular: true },
        { amount: '3.000', price: 'Rp 250.000', popular: true },
        { amount: '5.000', price: 'Rp 450.000', popular: false },
      ],
      likes: [
        { amount: '1.000', price: 'Rp 35.000', popular: false },
        { amount: '2.000', price: 'Rp 50.000', popular: false },
        { amount: '4.000', price: 'Rp 100.000', popular: true },
        { amount: '6.000', price: 'Rp 200.000', popular: false },
        { amount: '8.000', price: 'Rp 250.000', popular: true },
        { amount: '10.000', price: 'Rp 280.000', popular: false },
      ],
      views: [
        { amount: '1.000', price: 'Rp 5.000', popular: false },
        { amount: '2.000', price: 'Rp 8.000', popular: false },
        { amount: '4.000', price: 'Rp 10.000', popular: false },
        { amount: '6.000', price: 'Rp 15.000', popular: true },
        { amount: '8.000', price: 'Rp 20.000', popular: false },
        { amount: '10.000', price: 'Rp 25.000', popular: false },
      ]
    }
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook className="w-6 h-6" />,
    color: 'from-brand to-brand-dark',
    services: {
      followers: [
        { amount: '1.000', price: 'Rp 35.000', popular: false },
        { amount: '2.000', price: 'Rp 65.000', popular: true },
        { amount: '5.000', price: 'Rp 160.000', popular: false },
        { amount: '8.000', price: 'Rp 200.000', popular: true },
        { amount: '10.000', price: 'Rp 250.000', popular: false },
      ],
      likes: [
        { amount: '1.000', price: 'Rp 25.000', popular: false },
        { amount: '2.000', price: 'Rp 45.000', popular: false },
        { amount: '4.000', price: 'Rp 90.000', popular: true },
        { amount: '6.000', price: 'Rp 135.000', popular: false },
        { amount: '8.000', price: 'Rp 170.000', popular: true },
        { amount: '10.000', price: 'Rp 200.000', popular: false },
      ],
      views: [
        { amount: '1.000', price: 'Rp 10.000', popular: false },
        { amount: '2.000', price: 'Rp 18.000', popular: true },
        { amount: '5.000', price: 'Rp 40.000', popular: false },
        { amount: '8.000', price: 'Rp 60.000', popular: true },
        { amount: '10.000', price: 'Rp 75.000', popular: false },
      ]
    }
  },
  {
    id: 'shopee',
    name: 'Shopee',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    services: {
      followers: [
        { amount: '200', price: 'Rp 25.000', popular: false },
        { amount: '500', price: 'Rp 35.000', popular: false },
        { amount: '1.000', price: 'Rp 50.000', popular: true },
        { amount: '2.000', price: 'Rp 100.000', popular: false },
        { amount: '5.000', price: 'Rp 150.000', popular: false },
      ],
      likes: [],
      views: []
    }
  }
];

const FEATURES = [
  {
    title: 'Layanan Cepat',
    desc: 'Proses instan setelah pembayaran dikonfirmasi. Tidak perlu menunggu lama.',
    icon: <Zap className="text-yellow-400" />
  },
  {
    title: 'Akun Berkualitas',
    desc: 'Kami menyediakan followers berkualitas tinggi untuk menjaga kredibilitas akun Anda.',
    icon: <Users className="text-brand" />
  },
  {
    title: 'Keamanan Terjamin',
    desc: 'Hanya membutuhkan username tanpa password. 100% aman bagi akun Anda.',
    icon: <ShieldCheck className="text-green-500" />
  }
];

const TESTIMONIALS = [
  {
    name: 'Andi Pratama',
    role: 'Influencer',
    text: 'Sejak pakai layanan Media Store ID, engagement rate saya naik drastis. Recommended!',
    stars: 5
  },
  {
    name: 'Siska Amelia',
    role: 'Online Shop Owner',
    text: 'Toko saya jadi lebih dipercaya pembeli karena followers yang terlihat organik.',
    stars: 5
  },
  {
    name: 'Rendy Wijaya',
    role: 'Content Creator',
    text: 'Prosesnya super cepat, adminnya ramah banget. Suka sama kualitasnya!',
    stars: 4
  }
];


const FAQ_ITEMS = [
  { q: 'Apakah aman bagi akun saya?', a: 'Sangat aman. Kami tidak meminta password, hanya username. Layanan kami mematuhi pedoman keamanan media sosial terkini.' },
  { q: 'Berapa lama proses pengerjaannya?', a: 'Biasanya mulai diproses dalam hitungan menit hingga beberapa jam tergantung jumlah paket yang Anda ambil.' },
  { q: 'Apakah followers permanen?', a: 'Kami mengupayakan followers berkualitas tinggi agar tetap permanen. Tersedia garansi refill (isi ulang) jika terjadi penurunan jumlah yang signifikan.' },
  { q: 'Apakah paket Likes bisa dibagi ke beberapa postingan?', a: 'Ya, tentu saja! Jumlah Likes yang Anda pesan bisa dibagi-bagi ke beberapa postingan atau foto yang berbeda sesuka Anda.' },
  { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima Dana, OVO, QRIS, dan transfer bank lokal.' }
];

function FaqItem({ item, isOpen, onClick }: { item: typeof FAQ_ITEMS[0], isOpen: boolean, onClick: () => void, key?: any }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all shadow-sm">
      <button 
        onClick={onClick}
        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
      >
        <span className="text-lg font-bold">{item.q}</span>
        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90 text-brand' : 'text-slate-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-6 text-slate-600 leading-relaxed"
          >
            {item.a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`${className} bg-brand rounded-lg flex flex-col items-center justify-center text-white p-1 shadow-lg shadow-brand/20`}>
      <div className="text-xl font-black leading-none mb-0.5 tracking-tighter">MS</div>
      <div className="text-[5px] font-bold uppercase tracking-[0.2em] -mb-0.5 whitespace-nowrap">Media Trust</div>
      <div className="text-[4px] font-medium uppercase tracking-[0.3em]">ID</div>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState('instagram');
  const [activeService, setActiveService] = useState<'followers' | 'likes' | 'views'>('followers');
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrder = (platform: string, service: string, amount?: string) => {
    let serviceText = service;
    if (service === 'followers') serviceText = 'Followers';
    else if (service === 'likes') serviceText = 'Likes';
    else if (service === 'views') serviceText = 'Views';

    const actualAmount = amount ? ` paket ${amount}` : '';
    const message = `Halo Media Trust ID, saya ingin order ${serviceText} ${platform}${actualAmount}`;
    window.open(`https://wa.me/6285157882956?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-light selection:text-brand">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-1' : 'bg-transparent py-2'}`}>
        <div className="max-w-6xl mx-auto px-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/trustmedia.png" alt="Media Trust ID" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" referrerPolicy="no-referrer" />
            <span className="font-bold text-sm sm:text-xl tracking-tighter uppercase whitespace-nowrap">MEDIA TRUST <span className="text-brand">ID</span></span>
          </div>

          <div className="hidden md:flex items-center gap-4 font-medium text-slate-600">
            <a href="#services" className="hover:text-brand transition-colors">Layanan</a>
            <a href="#pricing" className="hover:text-brand transition-colors">Harga</a>
            <a href="#testimonials" className="hover:text-brand transition-colors">Testimoni</a>
            <a href="#faq" className="hover:text-brand transition-colors">FAQ</a>
            <button 
              onClick={() => handleOrder('Umum', 'Custom')}
              className="px-6 py-2 bg-brand text-white rounded-full hover:bg-brand-dark transition-all shadow-md hover:shadow-brand/20"
            >
              Order Now
            </button>
          </div>

          <button className="md:hidden p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-5 text-center text-xl font-medium">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Layanan</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Harga</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimoni</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              <button 
                className="w-full py-4 bg-blue-600 text-white rounded-xl"
                onClick={() => handleOrder('Umum', 'Custom')}
              >
                Hubungi Kami
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-10 blur-3xl">
          <div className="w-[500px] h-[500px] bg-brand rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-sm font-semibold mb-3">
                <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
                Premium Digital Solution ID
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-slate-900 mb-4 uppercase tracking-tighter">
                Tingkatkan <span className="text-brand">Kredibilitas</span> Sosial Media
              </h1>
              <p className="text-lg text-slate-600 mb-6 max-w-lg leading-relaxed">
                Media Trust ID menyediakan layanan lunas cepat Followers, Likes, dan Views premium untuk Instagram, TikTok, Facebook, &amp; Shopee dengan pengerjaan instan dan aman.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-brand text-white rounded-2xl font-bold text-lg hover:bg-brand-dark transition-all flex items-center gap-2 shadow-xl shadow-brand/20 group"
                >
                  Lihat Paket
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-6 border border-slate-100 rounded-2xl">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">5.000+</div>
                    <div className="text-slate-500">Pelanggan Puas</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-tr from-brand to-brand-dark p-1 rounded-[2.5rem] shadow-2xl">
                <div className="bg-white rounded-[2rem] p-8 md:p-10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center"><Instagram /></div>
                        <div>
                          <div className="font-bold">Instagram Followers</div>
                          <div className="text-xs text-slate-500">Premium Quality</div>
                        </div>
                      </div>
                      <div className="text-brand font-bold uppercase tracking-tight">+10k</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center"><Tiktok /></div>
                        <div>
                          <div className="font-bold">TikTok Followers</div>
                          <div className="text-xs text-slate-500">Flash Delivery</div>
                        </div>
                      </div>
                      <div className="text-brand font-bold uppercase tracking-tight">+5k</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-light text-brand rounded-xl flex items-center justify-center"><Facebook /></div>
                        <div>
                          <div className="font-bold">Facebook Page Likes</div>
                          <div className="text-xs text-slate-500">Steady Growth</div>
                        </div>
                      </div>
                      <div className="text-brand font-bold uppercase tracking-tight">+2k</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa Harus Media Trust ID?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Kami berfokus pada kualitas dan keamanan akun Anda. Partner terpercaya dalam pertumbuhan media sosial.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 italic uppercase tracking-tight text-brand">Pilih Paket Sesuai Kebutuhan</h2>
            <div className="flex gap-2 justify-center p-1 bg-slate-100 rounded-2xl w-fit mx-auto">
              {PLATFORMS.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => {
                    setActivePlatform(platform.id);
                  }}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    activePlatform === platform.id 
                    ? 'bg-white text-brand shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {platform.icon}
                  <span className="hidden sm:inline uppercase text-sm tracking-widest">{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Service Category Selector */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-lg mx-auto px-4">
              {[
                { id: 'followers', label: 'Followers' },
                { id: 'likes', label: 'Likes' },
                { id: 'views', label: 'Views Video' }
              ].map(service => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveService(service.id as any);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase transition-all ${
                    activeService === service.id
                      ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-105'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {((PLATFORMS.find(p => p.id === activePlatform)?.services as any)[activeService] || []).length > 0 ? (
              (PLATFORMS.find(p => p.id === activePlatform)?.services as any)[activeService]?.map((pkg: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-white rounded-3xl p-8 border-2 transition-all hover:scale-105 ${
                    pkg.popular ? 'border-brand shadow-xl shadow-brand/10' : 'border-slate-100 shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      Best Value
                    </div>
                  )}
                  <div className="text-slate-500 mb-2 font-medium tracking-tight uppercase text-xs">
                    Paket {activeService === 'followers' ? 'Followers' : activeService === 'likes' ? 'Likes' : 'Views'}
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black italic tracking-tighter">{pkg.amount}</span>
                    <span className="text-slate-500 uppercase text-xs font-bold">
                      {activeService === 'followers' ? 'Followers' : activeService === 'likes' ? 'Likes' : 'Views'}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-brand mb-8 uppercase tracking-tight">{pkg.price}</div>
                  
                  <ul className="space-y-4 mb-8 text-slate-600">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-brand" /> Proses Instan</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-brand" /> Akun High Quality</li>
                    {activeService === 'likes' ? (
                      <li className="flex items-center gap-3 text-brand font-semibold"><CheckCircle2 className="w-5 h-5 text-brand animate-pulse" /> Bisa Dibagi ke Beberapa Post!</li>
                    ) : (
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-brand" /> Bonus Tambahan</li>
                    )}
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-brand" /> Garansi Refill</li>
                  </ul>

                  <button 
                    onClick={() => handleOrder(activePlatform, activeService, pkg.amount)}
                    className={`w-full py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-sm ${
                      pkg.popular 
                      ? 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/20' 
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    Beli Sekarang
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full border-2 border-dashed border-slate-200 bg-slate-50 rounded-3xl p-12 text-center max-w-xl mx-auto w-full">
                <p className="text-slate-500 font-bold mb-4 uppercase text-xs tracking-wider">Layanan Belum Tersedia Otomatis</p>
                <p className="text-slate-600 font-medium mb-6">Layanan {activeService === 'likes' ? 'Likes' : 'Views Video'} belum tersedia secara otomatis untuk {PLATFORMS.find(p => p.id === activePlatform)?.name}. Silakan hubungi kami untuk memesan secara kustom!</p>
                <button 
                  onClick={() => handleOrder(PLATFORMS.find(p => p.id === activePlatform)?.name || '', activeService)}
                  className="px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-colors inline-flex items-center gap-2 text-sm uppercase tracking-wider"
                >
                  <MessageCircle className="w-5 h-5" />
                  Hubungi Admin via WhatsApp
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center p-8 bg-brand rounded-3xl text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 italic uppercase tracking-tighter">Butuh paket custom atau layanan lainnya?</h3>
            <p className="mb-6 opacity-90">Kami juga melayani Likes, Views, Retweet, dan layanan lainnya dengan harga kompetitif.</p>
            <button 
               onClick={() => handleOrder('Custom', 'Layanan Lain')}
               className="px-8 py-4 bg-white text-brand rounded-2xl font-bold hover:bg-slate-100 transition-colors inline-flex items-center gap-2 uppercase tracking-widest text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Chat Admin ID
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tighter">Dipercaya Ribuan Klien</h2>
            <p className="text-slate-400">Apa kata mereka tentang layanan Media Trust ID?</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, star) => (
                    <Star key={star} className={`w-4 h-4 ${star < t.stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
                  ))}
                </div>
                <p className="text-lg italic mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <div className="font-bold text-lg uppercase tracking-tight">{t.name}</div>
                  <div className="text-brand text-sm font-bold uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan Populer</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem 
              key={i} 
              item={item} 
              isOpen={openFaq === i} 
              onClick={() => { setOpenFaq(openFaq === i ? null : i); }} 
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="/trustmedia.png" alt="Media Trust ID" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
              <span className="font-bold text-xl tracking-tight uppercase">MEDIA TRUST<span className="text-brand">ID</span></span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              Partner terpercaya untuk pertumbuhan digital Anda. Kami membantu akun sosial media Anda terlihat lebih profesional dan kredibel.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all cursor-pointer">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 italic uppercase tracking-tighter">Quick Links</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#services" className="hover:text-brand transition-colors uppercase text-xs font-bold tracking-widest">Layanan</a></li>
              <li><a href="#pricing" className="hover:text-brand transition-colors uppercase text-xs font-bold tracking-widest">Harga Paket</a></li>
              <li><a href="#testimonials" className="hover:text-brand transition-colors uppercase text-xs font-bold tracking-widest">Testimoni</a></li>
              <li><a href="#faq" className="hover:text-brand transition-colors uppercase text-xs font-bold tracking-widest">Bantuan/FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 italic uppercase tracking-tighter">Hubungi Kami</h4>
            <ul className="space-y-4 text-slate-500">
              <li className="flex items-center gap-2 uppercase text-xs font-bold tracking-widest"><Send className="w-4 h-4" /> Jakarta, Indonesia</li>
              <li className="flex items-center gap-2 uppercase text-xs font-bold tracking-widest"><MessageCircle className="w-4 h-4" /> @mediatrust_id</li>
              <li className="uppercase text-xs font-bold tracking-widest">Buka: 09:00 - 22:00 WIB</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p className="uppercase tracking-widest text-[10px] font-bold">© 2024 Media Trust ID. All rights reserved. Crafted for Digital Growth.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleOrder('Umum', 'Chat')}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200 animate-bounce"
      >
        <MessageCircle className="w-8 h-8 fill-white text-green-500" />
      </motion.button>
    </div>
  );
}
