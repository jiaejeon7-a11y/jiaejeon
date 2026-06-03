import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24">
      <Link 
        href="/shop" 
        className="font-serif text-sm text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
      >
        shop
      </Link>
      <Link 
        href="/free-images" 
        className="font-serif text-sm text-gray-700 hover:text-gray-900 transition-colors cursor-pointer mt-4"
      >
        free images
      </Link>
    </div>
  )
}
