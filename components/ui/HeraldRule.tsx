import { CrossOrnament } from './CrossOrnament'

interface HeraldRuleProps {
  className?: string
}

export function HeraldRule({ className = '' }: HeraldRuleProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-parchment" />
      <CrossOrnament color="#B91C2E" size={12} />
      <div className="flex-1 h-px bg-parchment" />
    </div>
  )
}
