export default function SectionHeading({ title, text, as: Tag = 'h2', center = false }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <Tag className="text-3xl font-medium md:text-5xl">{title}</Tag>
      {text && <p className="mt-3 text-lg text-ink-dim">{text}</p>}
    </div>
  );
}
