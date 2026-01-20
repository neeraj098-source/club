import { Users, Calendar, Sparkles, Music, X, ChevronRight, Check, Star, Zap, Crown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';

interface Offering {
  id: string;
  icon: any;
  title: string;
  description: string;
  image: string;
  whatsIncluded: string[];
}

const offerings: Offering[] = [
  {
    id: 'vip-tables',
    icon: Users,
    title: 'VIP Tables',
    description: 'Exclusive seating with bottle service',
    image: 'https://images.unsplash.com/photo-1571037548793-b03daac178fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbmlnaHRjbHViJTIwbG91bmdlfGVufDF8fHx8MTc2NzE5MTk2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    whatsIncluded: [
      'Dedicated Server',
      'Premium Bottle Service',
      'Reserved Seating for 8-10 guests',
      'Complimentary Mixers & Ice',
      'Priority Entry',
      'VIP Parking'
    ]
  },
  {
    id: 'private-events',
    icon: Calendar,
    title: 'Private Events',
    description: 'Customized experiences for special occasions',
    image: 'https://images.unsplash.com/photo-1578760427294-9871d8667bf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXAlMjBjbHViJTIwc2VydmljZXxlbnwxfHx8fDE3NjcxOTE5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    whatsIncluded: [
      'Full Venue Buyout Available',
      'Custom Menu & Bar Selection',
      'Professional Event Planning',
      'Premium Sound & Lighting',
      'Dedicated Staff',
      'Personalized Decor'
    ]
  },
  {
    id: 'live-entertainment',
    icon: Music,
    title: 'Live Entertainment',
    description: 'World-renowned DJs and performers',
    image: 'https://images.unsplash.com/photo-1636928837218-f2b56d5a7861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbHViJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY3MTYwMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    whatsIncluded: [
      'International DJ Lineup',
      'Live Performances Every Weekend',
      'State-of-the-Art Sound System',
      'LED Visual Displays',
      'Special Guest Artists',
      'Themed Music Nights'
    ]
  },
  {
    id: 'premium-experience',
    icon: Sparkles,
    title: 'Premium Experience',
    description: 'Luxury amenities and service',
    image: 'https://images.unsplash.com/photo-1674654659741-6246f1db40d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY29ja3RhaWwlMjBiYXJ8ZW58MXx8fHwxNzY3MTkxOTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    whatsIncluded: [
      'Ultra-Premium Spirits Collection',
      'Expert Mixologists',
      'Champagne Selection',
      'Bottle Sparkler Service',
      'VIP Lounge Access',
      'Complimentary Coat Check'
    ]
  },
];

export function OfferingsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const expandedOffering = offerings.find(o => o.id === expandedId);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative">
      {/* Section Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#9D50BB]/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#C39738]/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            <motion.div 
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div 
                className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#9D50BB] to-[#C39738]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
              <span className="text-[#C39738] font-body tracking-wider uppercase text-sm">Premium Collections</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl text-white font-heading tracking-tight">
              Our <span className="bg-gradient-to-r from-[#9D50BB] to-[#C39738] bg-clip-text text-transparent">Exclusive</span> Offerings
            </h2>
            <motion.p 
              className="text-white/60 font-body mt-4 text-lg max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Experience unparalleled luxury with our curated selection of premium services
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            className="absolute -right-8 top-0 opacity-20"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Crown className="w-24 h-24 text-[#C39738]" />
          </motion.div>
        </div>

        {/* Enhanced Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;
            const isHovered = hoveredId === offering.id;
            
            return (
              <motion.div
                key={offering.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
                }}
                onMouseEnter={() => setHoveredId(offering.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setExpandedId(offering.id)}
                data-cursor="card"
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Animated Border Gradient */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#9D50BB] via-[#C39738] to-[#9D50BB] blur-xl opacity-50" 
                    style={{
                      animation: 'spin 8s linear infinite'
                    }}
                  />
                </motion.div>

                {/* Main Card */}
                <motion.div
                  className="relative backdrop-blur-[60px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl overflow-hidden"
                  animate={isHovered ? { 
                    scale: 1.02,
                    y: -8,
                  } : {
                    scale: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }} // easeOutBack
                  style={{
                    boxShadow: isHovered
                      ? '0 20px 60px rgba(157, 80, 187, 0.25), 0 0 40px rgba(195, 151, 56, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.08)'
                      : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)',
                    transition: 'box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Shimmer Effect */}
                  <motion.div 
                    className="absolute inset-0 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"
                      animate={isHovered ? {
                        x: ['-100%', '200%']
                      } : {}}
                      transition={{ 
                        duration: 2,
                        ease: "easeInOut",
                        repeat: isHovered ? Infinity : 0,
                        repeatDelay: 1
                      }}
                    />
                  </motion.div>

                  {/* Particle Effects */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#C39738] rounded-full"
                        initial={{ 
                          x: `${20 + i * 25}%`, 
                          y: '100%',
                          opacity: 0,
                          scale: 0
                        }}
                        animate={isHovered ? {
                          y: '-20%',
                          opacity: [0, 0.8, 0],
                          scale: [0, 1.5, 0]
                        } : {
                          y: '100%',
                          opacity: 0,
                          scale: 0
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: isHovered ? Infinity : 0,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* Enhanced Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <ImageWithFallback
                        src={offering.image}
                        alt={offering.title}
                        className="w-full h-full object-cover opacity-25"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9D50BB]/30 via-transparent to-[#C39738]/30 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#9D50BB]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#C39738]/20 to-transparent" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative p-8 min-h-[320px] flex flex-col justify-between z-10">
                    <div>
                      {/* Enhanced Icon Badge */}
                      <motion.div 
                        className="inline-flex p-5 rounded-2xl backdrop-blur-[60px] bg-gradient-to-br from-[#9D50BB]/30 to-[#C39738]/30 border border-white/20 mb-6 relative overflow-hidden"
                        animate={isHovered ? { 
                          scale: 1.05,
                        } : {
                          scale: 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {/* Icon Badge Glow */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-[#9D50BB]/40 to-[#C39738]/40 blur-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        <Icon className="w-10 h-10 text-[#C39738] relative z-10" />
                        
                        {/* Sparkle Effect */}
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isHovered ? {
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            rotate: [0, 180, 360]
                          } : {
                            scale: 0,
                            opacity: 0
                          }}
                          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
                        >
                          <Sparkles className="w-4 h-4 text-[#C39738]" />
                        </motion.div>
                      </motion.div>

                      {/* Text Content with Enhanced Typography */}
                      <h3 className="text-3xl md:text-4xl mb-3 text-white font-heading relative inline-block">
                        {offering.title}
                        {/* Underline effect */}
                        <motion.div 
                          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#9D50BB] to-[#C39738]"
                          initial={{ width: 0 }}
                          animate={{ width: isHovered ? '100%' : 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </h3>
                      
                      <p className="text-white/80 font-body text-lg leading-relaxed">{offering.description}</p>

                      {/* Feature Pills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {offering.whatsIncluded.slice(0, 2).map((item, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0, y: 10 }}
                            animate={isHovered ? { 
                              opacity: 1, 
                              scale: 1,
                              y: 0
                            } : { 
                              opacity: 0, 
                              scale: 0,
                              y: 10
                            }}
                            transition={{ 
                              duration: 0.3, 
                              delay: idx * 0.1,
                              ease: [0.34, 1.56, 0.64, 1] // easeOutBack
                            }}
                            className="px-3 py-1.5 rounded-full text-xs backdrop-blur-[60px] bg-white/10 border border-[#C39738]/30 text-[#C39738] font-body"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced CTA */}
                    <motion.div 
                      className="flex items-center justify-between mt-6 p-4 rounded-2xl backdrop-blur-[60px] bg-white/5 border border-white/10 transition-all duration-300"
                      animate={isHovered ? {
                        borderColor: 'rgba(157, 80, 187, 0.5)'
                      } : {
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={isHovered ? { 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          } : { 
                            rotate: 0,
                            scale: 1
                          }}
                          transition={{ 
                            rotate: { duration: 0.6, ease: "easeInOut" },
                            scale: { duration: 0.3 }
                          }}
                        >
                          <Zap className="w-5 h-5 text-[#C39738]" />
                        </motion.div>
                        <span className="text-white font-body font-medium">Explore Experience</span>
                      </div>
                      <motion.div
                        animate={isHovered ? { 
                          x: [0, 4, 0]
                        } : { 
                          x: 0 
                        }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: isHovered ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <ChevronRight className="w-6 h-6 text-[#9D50BB]" />
                      </motion.div>
                    </motion.div>

                    {/* Corner Accent */}
                    <motion.div 
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <motion.div
                        animate={isHovered ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        } : {}}
                        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
                      >
                        <Star className="w-6 h-6 text-[#C39738]" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Full-Screen Overlay */}
      <AnimatePresence>
        {expandedOffering && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]"
            />

            {/* Expanded Card */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-full max-w-5xl my-8"
              >
                {/* Glow Effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#9D50BB]/20 via-[#C39738]/20 to-[#9D50BB]/20 blur-3xl animate-pulse" />
                
                <div className="relative backdrop-blur-[60px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl overflow-hidden">
                  {/* Close Button */}
                  <motion.button
                    onClick={() => setExpandedId(null)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 right-6 z-10 p-3 rounded-2xl backdrop-blur-[60px] bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:border-[#9D50BB]/50 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  {/* Enhanced Hero Image */}
                  <div className="relative h-72 md:h-96 overflow-hidden">
                    <motion.div
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={expandedOffering.image}
                        alt={expandedOffering.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-[#C39738]/50 rounded-full"
                          initial={{ 
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight,
                            opacity: 0
                          }}
                          animate={{
                            y: -100,
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>

                    <div className="absolute bottom-8 left-8 right-8">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="inline-flex p-5 rounded-2xl backdrop-blur-[60px] bg-gradient-to-br from-[#9D50BB]/40 to-[#C39738]/40 border border-white/30 mb-4 shadow-lg shadow-[#9D50BB]/20">
                          <expandedOffering.icon className="w-12 h-12 text-[#C39738]" />
                        </div>
                        <h2 className="text-5xl md:text-6xl text-white font-heading mb-3 drop-shadow-2xl">
                          {expandedOffering.title}
                        </h2>
                        <p className="text-white/90 font-body text-xl drop-shadow-lg">{expandedOffering.description}</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* What's Included */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Star className="w-6 h-6 text-[#C39738]" />
                        <h3 className="text-3xl text-white font-heading">What's Included</h3>
                      </div>
                      <div className="space-y-3">
                        {expandedOffering.whatsIncluded.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.03, x: 10 }}
                            className="flex items-center gap-4 p-5 rounded-2xl backdrop-blur-[60px] bg-white/5 border border-white/10 hover:border-[#9D50BB]/50 hover:bg-white/10 transition-all cursor-pointer group/item"
                          >
                            <div className="p-2.5 rounded-full bg-gradient-to-br from-[#9D50BB]/40 to-[#C39738]/40 group-hover/item:scale-110 transition-transform">
                              <Check className="w-5 h-5 text-[#C39738]" />
                            </div>
                            <span className="text-white/90 font-body text-lg">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Check Availability */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-6 h-6 text-[#C39738]" />
                        <h3 className="text-3xl text-white font-heading">Check Availability</h3>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-5"
                      >
                        <div>
                          <label className="block text-white/70 mb-2 font-body font-medium">Select Date</label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl backdrop-blur-[60px] bg-white/10 border border-white/10 text-white font-body focus:outline-none focus:ring-2 focus:ring-[#9D50BB]/50 focus:border-[#9D50BB]/50 hover:border-[#9D50BB]/30 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-white/70 mb-2 font-body font-medium">Number of Guests</label>
                          <input
                            type="number"
                            placeholder="8"
                            min="1"
                            className="w-full px-5 py-4 rounded-2xl backdrop-blur-[60px] bg-white/10 border border-white/10 text-white font-body placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#9D50BB]/50 focus:border-[#9D50BB]/50 hover:border-[#9D50BB]/30 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-white/70 mb-2 font-body font-medium">Special Requests</label>
                          <textarea
                            placeholder="Any special requirements..."
                            rows={4}
                            className="w-full px-5 py-4 rounded-2xl backdrop-blur-[60px] bg-white/10 border border-white/10 text-white font-body placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#9D50BB]/50 focus:border-[#9D50BB]/50 hover:border-[#9D50BB]/30 transition-all resize-none"
                          />
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-5 rounded-3xl bg-gradient-to-r from-[#9D50BB] to-[#C39738] text-white font-body text-lg font-semibold hover:shadow-2xl hover:shadow-[#9D50BB]/50 transition-all relative overflow-hidden group/btn"
                        >
                          <span className="relative z-10">Request Booking</span>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-[#C39738] to-[#9D50BB]"
                            initial={{ x: '100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Add shimmer animation styles */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}