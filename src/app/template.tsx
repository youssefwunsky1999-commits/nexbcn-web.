/** Transición suave entre páginas (se re-monta en cada navegación). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
