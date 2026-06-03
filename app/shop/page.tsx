import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "제품 1",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B71-JJaow7rRQzwOJKssFJeubpXW0V5fQP.jpg",
  },
  {
    id: 2,
    name: "제품 2",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B72-2LiuBizTPvyHnkZJlPPWNaeTBB0qHM.jpg",
  },
  {
    id: 3,
    name: "제품 3",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B73-DhxuGLrnyth8jqURExK7fwCujewz8U.jpg",
  },
  {
    id: 4,
    name: "제품 4",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B74-nhoSXU7cPQ93Hg96wLr6qoNN15KpoD.png",
  },
  {
    id: 5,
    name: "제품 5",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B75-2l6SXg8XE4hb3kVhHFPEitMDHVxXqO.jpg",
  },
  {
    id: 6,
    name: "제품 6",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B76-6H3oQ8bn4dZ3e0o5mQGB0DiR9Uadlb.jpg",
  },
]

export default function ShoppingPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden max-w-full">
      {/* Back Button - Pedestrian Walking Icon */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 hover:opacity-70 transition-opacity"
        aria-label="Back to home"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shopbackgraphic-gsp6xSREHWIHMaQItX32IY1G50QPxP.png"
          alt="Back"
          width={24}
          height={32}
          className="w-6 h-auto"
        />
      </Link>

      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background1.JPG-YRmBYD04REGKFKURyQ7pc1Zake9H33.jpeg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <main className="relative z-10 min-h-screen flex flex-col justify-end p-8">
        {/* Product Grid */}
        <section className="flex items-end overflow-x-auto">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="h-24 lg:h-32 w-auto cursor-pointer transition-opacity duration-1500 ease-in-out hover:opacity-0"
              />
            </Link>
          ))}
        </section>

      </main>
    </div>
  )
}
