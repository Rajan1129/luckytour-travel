import MountainScene from './MountainScene.jsx';

// Uses a real photo when `src` is provided (place files in /public/images); else the SVG scene.
export default function Media({ src, alt, hue, width = 800, height = 520, className = '', priority = false }) {
  if (src) return <img src={src} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" className={className} />;
  return <MountainScene hue={hue} label={alt} className={className} />;
}
