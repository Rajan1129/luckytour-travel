import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Check } from 'lucide-react';

export const PRESET_LIBRARY = [
  {
    group: 'Vehicles / Fleet',
    options: [
      { label: 'Force Urbania (Luxury Van)', value: '/images/force-urbania.jpg' },
      { label: 'Toyota Innova Crysta (Premium MPV)', value: '/images/toyota-innova-crysta.jpg' },
      { label: 'Toyota Innova Hycross (Hybrid MPV)', value: '/images/toyota-innova-hycross.jpg' },
      { label: 'Maruti Suzuki Ertiga (Family Cab)', value: '/images/maruti-suzuki-ertiga.jpg' },
      { label: 'Maruti Suzuki Dzire (Budget Sedan)', value: '/images/maruti-suzuki-dzire.jpg' },
      { label: 'Toyota Fortuner (VIP 4x4 SUV)', value: '/images/toyota-fortuner.jpg' },
      { label: 'Mahindra Scorpio-N (Hill Tough SUV)', value: '/images/mahindra-scorpio.jpg' },
      { label: 'Force Tempo Traveller (Group Mini Bus)', value: '/images/tempo-traveller.jpg' },
      { label: 'Himachal Taxi Hero (Landscape)', value: '/images/himachal-taxi-service.jpg' }
    ]
  },
  {
    group: 'Tour Destinations & Packages',
    options: [
      { label: 'Shimla Queen of Hills', value: '/images/shimla.jpg' },
      { label: 'Manali Snow & Solang Valley', value: '/images/manali.jpg' },
      { label: 'Dharamshala & Kangra Valley', value: '/images/dharamshala.jpg' },
      { label: 'Mata Chintpurni & Baglamukhi Temple', value: '/images/chintpurni.jpg' },
      { label: 'Chandigarh City & Airport', value: '/images/chandigarh.jpg' },
      { label: 'Himachal Grand Circuit Tour', value: '/images/service-tour-package.jpg' }
    ]
  },
  {
    group: 'Taxi Service Routes',
    options: [
      { label: 'Local Taxi Service (Una / Amb)', value: '/images/service-local-taxi.jpg' },
      { label: 'Amb Andaura Railway Station Cabs', value: '/images/service-railway-station.jpg' },
      { label: 'Airport Taxi Transfer', value: '/images/service-airport.jpg' },
      { label: 'Outstation Cab Service', value: '/images/service-outstation.jpg' },
      { label: 'Nangal Dam & Anandpur Sahib', value: '/images/service-nangal.jpg' }
    ]
  }
];

export default function ImagePickerField({
  label = 'Select Picture',
  value = '',
  onChange,
  required = false
}) {
  const fileInputRef = useRef(null);
  const [mode, setMode] = useState('dropdown'); // 'dropdown' | 'upload' | 'url'
  const [customUrl, setCustomUrl] = useState('');

  // Check if current value matches any preset
  const allPresets = PRESET_LIBRARY.flatMap((g) => g.options);
  const isPreset = allPresets.some((p) => p.value === value);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result;
      if (!rawDataUrl) return;

      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onChange(optimizedDataUrl);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-ink-dim">
          {label} {required && <span className="text-amber">*</span>}
        </label>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('dropdown')}
            className={
              mode === 'dropdown'
                ? 'rounded px-2 py-0.5 font-bold bg-amber text-surface transition'
                : 'rounded px-2 py-0.5 font-medium text-ink-dim hover:text-ink transition'
            }
          >
            Dropdown
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('upload');
              fileInputRef.current?.click();
            }}
            className={
              mode === 'upload'
                ? 'inline-flex items-center gap-1 rounded px-2 py-0.5 font-bold bg-amber text-surface transition'
                : 'inline-flex items-center gap-1 rounded px-2 py-0.5 font-medium text-ink-dim hover:text-ink transition'
            }
          >
            <Upload size={11} />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={
              mode === 'url'
                ? 'inline-flex items-center gap-1 rounded px-2 py-0.5 font-bold bg-amber text-surface transition'
                : 'inline-flex items-center gap-1 rounded px-2 py-0.5 font-medium text-ink-dim hover:text-ink transition'
            }
          >
            <LinkIcon size={11} />
            <span>Custom URL</span>
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Mode 1: Dropdown Selector */}
      {mode === 'dropdown' && (
        <select
          value={isPreset ? value : ''}
          onChange={(e) => {
            if (e.target.value) {
              onChange(e.target.value);
            }
          }}
          className="w-full rounded-xl border border-linen/20 bg-surface-high px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
        >
          <option value="">-- Select Picture from Dropdown List --</option>
          {PRESET_LIBRARY.map((grp) => (
            <optgroup key={grp.group} label={grp.group}>
              {grp.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      )}

      {/* Mode 2: Upload File Trigger Box */}
      {mode === 'upload' && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-linen/25 bg-surface-high/40 p-4 text-center transition hover:border-amber hover:bg-surface-high/60"
        >
          <Upload className="h-6 w-6 text-amber mb-1" />
          <p className="text-xs font-semibold text-ink">Click to Browse & Select Picture from Computer / Phone</p>
          <p className="text-[11px] text-ink-dim mt-0.5">Supports JPG, PNG, WEBP (auto-optimized for fast web load)</p>
        </div>
      )}

      {/* Mode 3: Custom URL Input */}
      {mode === 'url' && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value || customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value);
              onChange(e.target.value);
            }}
            placeholder="https://example.com/image.jpg or /images/..."
            className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
          />
        </div>
      )}

      {/* Live Preview Box */}
      {value ? (
        <div className="flex items-center justify-between rounded-xl border border-linen/15 bg-surface-high/50 p-2.5">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={value}
              alt="Selected Preview"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/himachal-taxi-service.jpg';
              }}
              className="h-12 w-20 shrink-0 rounded-lg object-cover border border-linen/10 bg-surface-mid"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-ink truncate">
                  {value.startsWith('data:')
                    ? 'Uploaded Local Image'
                    : value.split('/').pop() || 'Selected Image'}
                </span>
              </div>
              <p className="text-[10px] text-ink-dim truncate mt-0.5">
                {value.startsWith('data:') ? 'Optimized Web Image' : value}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange('');
              setCustomUrl('');
            }}
            className="shrink-0 ml-2 rounded-lg p-1.5 text-ink-dim hover:bg-surface-mid hover:text-red-400"
            title="Remove picture"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <p className="text-[11px] text-ink-dim/80 italic">
          No picture selected yet. Choose from dropdown or click upload.
        </p>
      )}
    </div>
  );
}
