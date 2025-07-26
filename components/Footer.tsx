export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Modern Blog Platform</h3>
            <p className="text-gray-300 mb-4">
              Discover insights on technology, productivity, and business strategy from our expert writers.
            </p>
            <p className="text-sm text-gray-400">
              Built with Next.js and powered by Cosmic CMS.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="/categories/technology" className="text-gray-300 hover:text-white transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="/categories/productivity" className="text-gray-300 hover:text-white transition-colors">
                  Productivity
                </a>
              </li>
              <li>
                <a href="/categories/business" className="text-gray-300 hover:text-white transition-colors">
                  Business
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Cosmic CMS
                </a>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Next.js
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Modern Blog Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}