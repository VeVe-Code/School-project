import React from "react";
import { Facebook, Youtube, Mail } from "lucide-react"; // icons only
import { Link } from "react-router-dom"; // router link
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Bright English Academy</h2>
          <p className="text-sm leading-6">
            Empowering students to achieve their English learning goals through engaging lessons and modern tools.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/courses" className="hover:text-blue-400 transition">Courses</Link></li>
            <li><Link to="/aboutus" className="hover:text-blue-400 transition">About Us</Link></li>
               <li><Link to="/knowledge" className="hover:text-blue-400 transition">Knowledge</Link></li>
            <li><Link to="/Contact-us" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Connect with Us</h3>
          <div className="flex space-x-4 mb-3">
            {/* Facebook */}
            <a href="https://www.facebook.com/share/1D7r52fczE/?mibextid=wwXIfr" className="hover:text-blue-400 transition" target="_blank">
              <Facebook />
            </a>
            {/* Telegram */}
            <a href="https://t.me/+yRM5KGdFlYgyNTc1" className="hover:text-blue-400 transition" target="_blank" aria-label="Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.036 14.568l-.395 5.566c.563 0 .807-.241 1.1-.532l2.64-2.526 5.472 4.006c1.004.553 1.716.263 1.993-.92l3.61-16.877.001-.002c.321-1.496-.538-2.08-1.52-1.719L1.43 9.38c-1.455.566-1.433 1.377-.247 1.747l5.553 1.73L19.04 6.59c.567-.34 1.08-.153.655.188"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/@brightenglishacademy?si=hWDDHPs_xjA4x16E" className="hover:text-blue-400 transition" target="_blank">
              <Youtube />
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@bright.english.ac7?_t=ZS-8zOMdZnM8TR&_r=1" className="hover:text-blue-400 transition" target="_blank" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8.04c1.33.94 2.91 1.49 4.63 1.5V6.08a4.6 4.6 0 0 1-4.63-4.57h-3.09v13.2a2.3 2.3 0 1 1-2.3-2.3 2.35 2.35 0 0 1 1.23.34V9.5a5.36 5.36 0 1 0 4.16 5.2V8.04z"/>
              </svg>
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} BEA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
