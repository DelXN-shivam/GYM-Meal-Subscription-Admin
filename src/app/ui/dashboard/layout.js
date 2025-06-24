"use client";

import Link from 'next/link';
import { useState } from 'react';
import { User, Package, Wrench } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed h-full ${isHovered ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r shadow-lg p-4`}
      >
        <Link href="/ui/dashboard/home">
          <h1 className={`text-lg font-bold text-green-700 mb-6 ${isHovered ? 'block' : 'hidden'}`}>
            Admin Panel
          </h1>
        </Link>

        <nav className="space-y-4">
          {/* Users */}
          <div>
            <Link href="/ui/dashboard/users" className="flex items-center space-x-2 hover:text-green-700">
              <User className="w-5 h-5" />
              {isHovered && <span>Get Users</span>}
            </Link>
          </div>

          {/* Products */}
          <div>
            <Link href="/ui/dashboard/products/get" className="flex items-center space-x-2 hover:text-green-700">
              <Package className="w-5 h-5" />
              {isHovered && <span>View Products</span>}
            </Link>
            <Link href="/ui/dashboard/products/add" className="flex items-center space-x-2 hover:text-green-700 mt-2 ml-6">
              {isHovered && <span>Add Product</span>}
            </Link>
          </div>
          <div>
            <Link href="/ui/dashboard/subscription/get" className="flex items-center space-x-2 hover:text-green-700">
              <Package className="w-5 h-5" />
              {isHovered && <span>View Subscription</span>}
            </Link>
            <Link href="/ui/dashboard/subscription/add" className="flex items-center space-x-2 hover:text-green-700 mt-2 ml-6">
              {isHovered && <span>Add Subscription</span>}
            </Link>
          </div>

        </nav>
      </aside>

      {/* Page Content */}
      <main className={`flex-1 transition-all duration-300 ${isHovered ? 'ml-64' : 'ml-16'}`}>
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
