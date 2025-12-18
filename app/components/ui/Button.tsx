// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', size = 'md' }: ButtonProps) {
  return (
    <button className={`
      rounded-full font-semibold transition-all duration-300
      ${variant === 'primary' ? 'bg-gradient-purple text-white hover:scale-105' : 'bg-white text-gray-900'}
      ${size === 'md' ? 'px-8 py-4 text-lg' : ''}
      hover:shadow-xl
    `}>
      {children}
    </button>
  );
}
