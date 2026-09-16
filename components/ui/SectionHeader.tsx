import { HeraldRule } from './HeraldRule'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
  /** id for aria-labelledby on the parent section */
  id?: string
  as?: 'h1' | 'h2'
}

export function SectionHeader({ label, title, subtitle, centered, light, className = '', id, as: Heading = 'h2' }: SectionHeaderProps) {
  return (
    <div className={`mb-12 sm:mb-14 ${centered ? 'text-center' : ''} ${className}`}>
      <p className={`font-ui text-[11px] tracking-[3px] uppercase font-semibold mb-3 ${light ? 'text-gold-mid' : 'text-crimson'}`}>
        {label}
      </p>
      <Heading id={id} className={`font-display text-4xl md:text-5xl font-normal leading-tight -tracking-[0.01em] mb-5 ${light ? 'text-white' : 'text-navy-mid'}`}>
        {title}
      </Heading>
      <HeraldRule className={`mb-6 ${centered ? 'max-w-[160px] mx-auto' : 'max-w-[160px]'}`} />
      {subtitle && (
        <p className={`font-body text-base leading-8 ${light ? 'text-white/80' : 'text-muted'} ${centered ? 'max-w-xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
