import { HeraldRule } from './HeraldRule'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export function SectionHeader({ label, title, subtitle, centered, light, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <p className={`font-ui text-[10px] tracking-[4px] uppercase font-semibold mb-3 ${light ? 'text-gold-mid' : 'text-crimson'}`}>
        {label}
      </p>
      <h2 className={`font-display text-4xl md:text-5xl font-normal leading-tight -tracking-[0.01em] mb-5 ${light ? 'text-white' : 'text-navy-mid'}`}>
        {title}
      </h2>
      <HeraldRule className={`mb-6 ${centered ? 'max-w-[160px] mx-auto' : 'max-w-[160px]'}`} />
      {subtitle && (
        <p className={`font-body text-base leading-8 ${light ? 'text-white/60' : 'text-muted'} ${centered ? 'max-w-xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
