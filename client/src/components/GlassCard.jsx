export default function GlassCard({ as: Tag = 'div', className = '', children, ...rest }) {
  return <Tag className={`glass rounded-2xl ${className}`} {...rest}>{children}</Tag>;
}
