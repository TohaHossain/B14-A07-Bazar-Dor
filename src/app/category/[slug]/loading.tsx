export default function CategoryLoading() {
  return <main className="container category-page" aria-label="পণ্য লোড হচ্ছে" aria-busy="true">
    <div className="skeleton skeleton-heading" />
    <div className="skeleton-toolbar">
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-select" />
    </div>
    <div className="product-grid">
      {Array.from({ length: 8 }, (_, index) => <div className="skeleton card-skeleton" key={index} />)}
    </div>
  </main>;
}
