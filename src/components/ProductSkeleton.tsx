export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return <div className="product-grid">{Array.from({ length: count }, (_, i) => <div className="skeleton card-skeleton" key={i}><span /><span /><span /></div>)}</div>;
}
