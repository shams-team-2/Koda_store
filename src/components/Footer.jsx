import { Link } from "react-router-dom";
import { Zap, Globe, MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/orders", label: "My Orders" },
    { to: "/wishlist", label: "Wishlist" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-indigo-600 dark:text-white fill-indigo-600 dark:fill-white" size={22} />
            <span className="text-xl font-bold text-indigo-600 dark:text-white">Koda Store</span>
          </div>
          <p className="text-gray-500 dark:text-white text-sm leading-relaxed max-w-xs">
            Shop the future, delivered today. Premium products at the best prices with fast delivery across Egypt.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 text-sm transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <Globe size={16} className="text-gray-600 dark:text-white" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <MessageCircle size={16} className="text-gray-600 dark:text-white" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <Heart size={16} className="text-gray-600 dark:text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 py-5">
        <p className="text-center text-gray-400 dark:text-white text-sm">
          © {new Date().getFullYear()} Koda Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}