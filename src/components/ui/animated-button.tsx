import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
}

export function AnimatedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  icon,
}: AnimatedButtonProps) {
  const baseClasses = 'relative overflow-hidden font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] hover:shadow-2xl hover:shadow-[#d4af37]/40',
    secondary: 'bg-[#2a2a2a] text-white border border-[#3a3a3a] hover:bg-[#3a3a3a] hover:border-[#d4af37]/50',
    outline: 'bg-transparent text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37]/10',
    ghost: 'bg-transparent text-gray-300 hover:bg-[#2a2a2a] hover:text-white',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-2xl hover:shadow-red-500/40',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      type={type}
      onClick={!disabled ? onClick : undefined}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
}

// Icon Button variant
export function AnimatedIconButton({
  children,
  onClick,
  className = '',
  variant = 'ghost',
  disabled = false,
}: Omit<AnimatedButtonProps, 'size'>) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f]',
    secondary: 'bg-[#2a2a2a] text-white border border-[#3a3a3a]',
    outline: 'bg-transparent text-[#d4af37] border border-[#d4af37]',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-[#2a2a2a]',
    danger: 'bg-red-600 text-white',
  };

  return (
    <motion.button
      onClick={!disabled ? onClick : undefined}
      className={`p-2 rounded-lg transition-all ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.1, rotate: 5 } : {}}
      whileTap={!disabled ? { scale: 0.9, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// Floating Action Button
export function FloatingActionButton({
  children,
  onClick,
  className = '',
}: Omit<AnimatedButtonProps, 'variant' | 'size'>) {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-full shadow-2xl shadow-[#d4af37]/40 flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}

// Pulse Button (for notifications, etc.)
export function PulseButton({
  children,
  onClick,
  className = '',
  pulseCount = 0,
}: AnimatedButtonProps & { pulseCount?: number }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative p-2 rounded-lg bg-transparent text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-all ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
      
      {/* Pulse indicator */}
      {pulseCount > 0 && (
        <motion.span
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          {pulseCount > 9 ? '9+' : pulseCount}
        </motion.span>
      )}
    </motion.button>
  );
}

// Toggle Button
export function AnimatedToggle({
  isActive,
  onToggle,
  activeLabel,
  inactiveLabel,
  className = '',
}: {
  isActive: boolean;
  onToggle: () => void;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative px-6 py-3 rounded-xl font-medium transition-all ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          background: isActive
            ? 'linear-gradient(to right, #d4af37, #b8860b)'
            : 'rgba(42, 42, 42, 1)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.span
        className="relative z-10"
        animate={{
          color: isActive ? '#0f0f0f' : '#9ca3af',
        }}
        transition={{ duration: 0.3 }}
      >
        {isActive ? activeLabel : inactiveLabel}
      </motion.span>
    </motion.button>
  );
}
