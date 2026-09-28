import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-mint text-[#1b3620] hover:bg-white',
  amber: 'bg-amber-deep text-amber hover:bg-amber-ochre hover:text-white',
  ghost: 'bg-surface-high/80 text-ink hover:bg-surface-highest border border-linen/10'
};
export default function CTAButton({ variant = 'primary', to, href, onClick, children, className = '', ...rest }) {
  const cls = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-colors ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" onClick={onClick} className={cls} {...rest}>{children}</button>;
}
