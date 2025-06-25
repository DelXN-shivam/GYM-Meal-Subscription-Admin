"use client";

import Link from "next/link";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { User, Package, Crown , ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openItems, setOpenItems] = useState([]);

  const toggleSidebar = () => setIsExpanded(prev => !prev);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed h-full ${isExpanded ? "w-64" : "w-16"} transition-all duration-300 bg-white border-r shadow-lg p-4 z-10 overflow-hidden`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between mb-6 mr-3">
            {isExpanded ? (
              <Link href="/ui/dashboard/home">
                <h1 className="text-lg font-bold text-green-700">Admin Panel</h1>
              </Link>
            ) : (
              <div className="w-5 h-5" /> // placeholder to prevent layout shift
            )}
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-green-700 transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
        </div>



        {/* Accordion Menu */}
        <Accordion
          type="multiple"
          className="w-full space-y-4"
          value={openItems}
          onValueChange={setOpenItems}
        >
          {/* Users */}
          <AccordionItem value="users">
            <AccordionTrigger className="flex items-center space-x-2 hover:text-green-700">
              <User className="w-5 h-5" />
              <span className={`${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
                Users
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col items-center space-y-2 pl-0 text-center">
              <Link href="/ui/dashboard/users" className="hover:text-green-500">
                Get Users
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Products */}
          <AccordionItem value="products">
            <AccordionTrigger className="flex items-center space-x-2 hover:text-green-700">
              <Package className="w-5 h-5" />
              <span className={`${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
                Products
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col items-center space-y-2 pl-0 text-center">
              <Link href="/ui/dashboard/products/get" className="hover:text-green-500">
                View Products
              </Link>
              <Link href="/ui/dashboard/products/add" className="hover:text-green-500">
                Add Product
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Subscriptions */}
          <AccordionItem value="subscription">
            <AccordionTrigger className="flex items-center space-x-2 hover:text-green-700">
              <Crown className="w-5 h-5" />
              
              <span className={`${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
                Subscription
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col items-center space-y-2 pl-0 text-center">
              <Link href="/ui/dashboard/subscription/get" className="hover:text-green-500">
                View Subscription
              </Link>
              <Link href="/ui/dashboard/subscription/add" className="hover:text-green-500">
                Add Subscription
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isExpanded ? "ml-64" : "ml-16"}`}>
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
