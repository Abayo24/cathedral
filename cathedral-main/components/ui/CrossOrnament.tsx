interface CrossOrnamentProps {
  color?: string
  size?: number
  className?: string
}

export function CrossOrnament({ color = '#B91C2E', size = 14, className }: CrossOrnamentProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <rect x="5.5" y="0" width="3" height="14" fill={color} />
      <rect x="0" y="5.5" width="14" height="3" fill={color} />
    </svg>
  )
}
