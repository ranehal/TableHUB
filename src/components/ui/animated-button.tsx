import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';

type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>;

interface AnimatedButtonProps extends Omit<MotionButtonProps, 'children' | 'className'> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(function AnimatedButton(
  {
    children,
    onClick,
    className = '',
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    icon,
    ...props
  },
  ref,
) {
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

  const handleClick: MouseEventHandler<HTMLButtonElement> | undefined =
    disabled ? undefined : onClick;

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled}
      {...props}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
});

// Icon Button variant
export const AnimatedIconButton = forwardRef<
  HTMLButtonElement,
  Omit<AnimatedButtonProps, 'size'>
>(function AnimatedIconButton(
  {
    children,
    onClick,
    className = '',
    variant = 'ghost',
    disabled = false,
    type = 'button',
    ...props
  },
  ref,
) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f]',
    secondary: 'bg-[#2a2a2a] text-white border border-[#3a3a3a]',
    outline: 'bg-transparent text-[#d4af37] border border-[#d4af37]',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-[#2a2a2a]',
    danger: 'bg-red-600 text-white',
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> | undefined =
    disabled ? undefined : onClick;

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={handleClick}
      className={`p-2 rounded-lg transition-all ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.1, rotate: 5 } : {}}
      whileTap={!disabled ? { scale: 0.9, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

// Floating Action Button
export const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  Omit<AnimatedButtonProps, 'variant' | 'size'>
>(function FloatingActionButton(
  { children, onClick, className = '', type = 'button', disabled, ...props },
  ref,
) {
  const handleClick: MouseEventHandler<HTMLButtonElement> | undefined =
    disabled ? undefined : onClick;

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={handleClick}
      className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-full shadow-2xl shadow-[#d4af37]/40 flex items-center justify-center ${className}`}
      whileHover={!disabled ? { scale: 1.1, rotate: 90 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

// Pulse Button (for notifications, etc.)
export function PulseButton({
  children,
  onClick,
  className = '',
  pulseCount = 0,
  type = 'button',
  disabled,
  ...props
}: AnimatedButtonProps & { pulseCount?: number }) {
  const handleClick: MouseEventHandler<HTMLButtonElement> | undefined =
    disabled ? undefined : onClick;

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={`relative p-2 rounded-lg bg-transparent text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      disabled={disabled}
      {...props}
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
