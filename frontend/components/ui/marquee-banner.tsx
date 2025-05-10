export function MarqueeBanner() {
  return (
    <div className="bg-[#6a3de8] text-white py-2 marquee-container">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee marquee-content">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="mx-4">
                Крупнейшая IT Академия в Ташкенте
              </span>
            ))}
        </div>
        <div className="animate-marquee marquee-content" aria-hidden="true">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span key={i + 10} className="mx-4">
                Крупнейшая IT Академия в Ташкенте
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}
