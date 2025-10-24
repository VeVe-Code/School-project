
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center text-center px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Welcome to <span className="text-blue-600">BEA</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Discover fashion that defines your style. Shop the latest collections
          designed for comfort and confidence.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all mx-auto"
        >
      
          
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>

      {/* Image / Illustration Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16"
      >
        <img
          src="https://images.unsplash.com/photo-1520975922203-17449fc9c2d7?auto=format&fit=crop&w=1200&q=80"
          alt="Fashion Banner"
          className="rounded-3xl shadow-lg w-full max-w-3xl object-cover"
        />
      </motion.div>
    </div>
  );
}
