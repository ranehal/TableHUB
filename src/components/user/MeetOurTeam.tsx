import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Aisha Rahman',
    role: 'Founder & CEO',
    bio: 'Passionate about connecting food lovers with amazing dining experiences across Bangladesh.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    linkedin: '#',
    twitter: '#',
    email: 'aisha@tablehub.bd',
  },
  {
    id: 2,
    name: 'Rafiq Ahmed',
    role: 'Chief Technology Officer',
    bio: 'Building cutting-edge solutions to revolutionize restaurant booking in Bangladesh.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    linkedin: '#',
    twitter: '#',
    email: 'rafiq@tablehub.bd',
  },
  {
    id: 3,
    name: 'Nadia Hossain',
    role: 'Head of Operations',
    bio: 'Ensuring smooth operations and exceptional service for all our restaurant partners.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    linkedin: '#',
    twitter: '#',
    email: 'nadia@tablehub.bd',
  },
  {
    id: 4,
    name: 'Karim Uddin',
    role: 'Lead Developer',
    bio: 'Crafting elegant code to deliver seamless booking experiences.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    linkedin: '#',
    twitter: '#',
    email: 'karim@tablehub.bd',
  },
  {
    id: 5,
    name: 'Farhana Islam',
    role: 'Marketing Director',
    bio: 'Connecting restaurants and diners through strategic marketing initiatives.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
    linkedin: '#',
    twitter: '#',
    email: 'farhana@tablehub.bd',
  },
  {
    id: 6,
    name: 'Tanvir Chowdhury',
    role: 'Customer Success Manager',
    bio: 'Dedicated to ensuring every customer has an outstanding experience.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    linkedin: '#',
    twitter: '#',
    email: 'tanvir@tablehub.bd',
  },
];

export function MeetOurTeam() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.section 
      ref={scrollRef}
      style={{ opacity, scale }}
      className="py-32 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animated lines */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div 
              className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af37]"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            <span className="text-[#d4af37] tracking-widest uppercase text-sm font-medium">The Dream Team</span>
            <motion.div 
              className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af37]"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-white mb-6 text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Meet Our{' '}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient">
              Exceptional Team
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            The passionate individuals dedicated to revolutionizing your dining experience
          </motion.p>
        </motion.div>

        {/* Horizontal scrolling cards container */}
        <div className="relative">
          {/* Gradient overlays for scroll hint */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
          
          {/* Scrollable container */}
          <div className="overflow-x-auto pb-8 hide-scrollbar">
            <motion.div 
              className="flex gap-8 px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {teamMembers.map((member, index) => (
                <TeamCard key={member.name} member={member} index={index} />
              ))}
            </motion.div>
          </div>
          
          {/* Scroll hint */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ←
              </motion.span>
              Scroll to explore our team
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ y: -15, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-80 glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#d4af37]/20 transition-all duration-500"
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/90 via-[#2a2a2a]/80 to-[#1a1a1a]/90 backdrop-blur-xl" />
      
      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? '0 0 30px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.1)' 
            : '0 0 0px rgba(212, 175, 55, 0)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Image Container with Blur Effect */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.15 : 1,
            filter: isHovered ? 'blur(0px) brightness(1.2)' : 'blur(0px) brightness(0.85)',
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />
        
        {/* Animated particles effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, #d4af37 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        )}
        
        {/* Hover Info Overlay */}
        <motion.div
          className="absolute inset-0 glass-dark flex flex-col items-center justify-center p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <p className="text-center mb-6 text-gray-200 leading-relaxed">{member.bio}</p>
            <div className="flex gap-3 justify-center">
              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass rounded-full hover:bg-[#d4af37]/20 transition-colors border border-[#d4af37]/30"
                >
                  <Linkedin className="w-5 h-5 text-[#d4af37]" />
                </motion.a>
              )}
              {member.twitter && (
                <motion.a
                  href={member.twitter}
                  whileHover={{ scale: 1.3, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass rounded-full hover:bg-[#d4af37]/20 transition-colors border border-[#d4af37]/30"
                >
                  <Twitter className="w-5 h-5 text-[#d4af37]" />
                </motion.a>
              )}
              {member.email && (
                <motion.a
                  href={`mailto:${member.email}`}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass rounded-full hover:bg-[#d4af37]/20 transition-colors border border-[#d4af37]/30"
                >
                  <Mail className="w-5 h-5 text-[#d4af37]" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Content with glass effect */}
      <div className="relative p-6 glass-dark border-t border-[#d4af37]/20">
        <motion.h4 
          className="text-white mb-1"
          animate={{ 
            color: isHovered ? '#d4af37' : '#ffffff'
          }}
          transition={{ duration: 0.3 }}
        >
          {member.name}
        </motion.h4>
        <p className="text-[#d4af37] mb-3">{member.role}</p>
        
        {/* Animated Underline */}
        <motion.div
          className="h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] rounded-full"
          initial={{ width: '40%', opacity: 0.5 }}
          animate={{ 
            width: isHovered ? '100%' : '40%',
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Corner Accent with glow */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#d4af37]/30 to-transparent blur-2xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}