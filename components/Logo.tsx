type Props = { size?: number; className?: string; tile?: string; piece?: string };

/** The Widget mark: three tiles and the orange piece sliding into place. */
export default function Logo({ size = 30, className, tile = 'var(--tile)', piece = 'var(--orange)' }: Props) {
  return (
    <svg className={className} viewBox="-2 4 96 100" width={size} height={Math.round(size * 1.04)} aria-hidden="true">
      <rect x="4" y="24" width="36" height="36" rx="8" fill={tile} />
      <rect x="4" y="64" width="36" height="36" rx="8" fill={tile} />
      <rect x="44" y="64" width="36" height="36" rx="8" fill={tile} />
      <rect x="52" y="8" width="36" height="36" rx="8" fill={piece} />
    </svg>
  );
}
