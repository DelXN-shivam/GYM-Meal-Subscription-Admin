"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { User, Package, Crown , ChevronLeft, ChevronRight, Menu, Bell, Moon, Sun } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openItems, setOpenItems] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const toggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);

  // Helper for active state (could be improved with router)
  const isActive = (href) => typeof window !== 'undefined' && window.location.pathname.startsWith(href);

  // Sidebar navigation items
  const navItems = [
    {
      label: "Users",
      icon: <User className="w-5 h-5" />, 
      links: [
        { label: "Get Users", href: "/ui/dashboard/users" },
      ],
      value: "users"
    },
    {
      label: "Products",
      icon: <Package className="w-5 h-5" />, 
      links: [
        { label: "View Products", href: "/ui/dashboard/products" },
        { label: "Add Product", href: "/ui/dashboard/products/add" },
      ],
      value: "products"
    },
    {
      label: "Subscription",
      icon: <Crown className="w-5 h-5" />, 
      links: [
        { label: "View Subscription", href: "/ui/dashboard/subscription" },
        { label: "Add Subscription", href: "/ui/dashboard/subscription/add" },
      ],
      value: "subscription"
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar (desktop & mobile) */}
      <aside
        className={`fixed z-30 h-full bg-sidebar/95 border-r border-sidebar-border shadow-lg transition-all duration-300 p-4 flex flex-col justify-between
          ${isExpanded ? "w-64" : "w-16"}
          hidden md:flex
        `}
      >
        <div>
          {/* Logo/Branding */}
          <div className="flex items-center gap-2 mb-8 px-1">
            <img src="/globe.svg" alt="Logo" className="w-8 h-8" />
            {isExpanded && <span className="text-xl font-bold text-sidebar-primary tracking-tight">GYM Meal Admin</span>}
          </div>
        {/* Toggle Button */}
          <div className="flex items-center justify-between mb-6">
            <div />
            <button
              onClick={toggleSidebar}
              className="text-muted-foreground hover:text-sidebar-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 rounded mr-1"
              aria-label="Toggle Sidebar"
            >
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
        </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <div key={item.value}>
                <Accordion type="multiple" className="w-full" value={openItems} onValueChange={setOpenItems}>
                  <AccordionItem value={item.value}>
                    <AccordionTrigger className={`flex items-center space-x-2 group hover:bg-sidebar-accent/30 rounded px-2 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${isExpanded ? '' : 'justify-center'}`}
                      onMouseEnter={() => !isExpanded && setActiveSection(item.value)}
                      onMouseLeave={() => !isExpanded && setActiveSection("")}
                    >
                      <span className="relative">
                        {item.icon}
                        {/* Tooltip for collapsed sidebar */}
                        {!isExpanded && activeSection === item.value && (
                          <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-sidebar-foreground text-sidebar bg-opacity-90 px-2 py-1 rounded shadow text-xs whitespace-nowrap z-50 animate-fade-in">
                            {item.label}
              </span>
                        )}
              </span>
                      <span className={`${isExpanded ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>{item.label}</span>
            </AccordionTrigger>
                    <AccordionContent className="flex flex-col items-start space-y-2 pl-0 text-left">
                      {item.links.map(link => (
                        <Link key={link.href} href={link.href} className={`w-full hover:text-slate-400 px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 `}>{link.label}</Link>
                      ))}
            </AccordionContent>
          </AccordionItem>
                </Accordion>
                {/* Divider after each section except last */}
                {idx < navItems.length - 1 && <div className="my-2 border-t border-sidebar-border opacity-60" />}
              </div>
            ))}
          </nav>
        </div>
        {/* Sidebar bottom: user profile */}
        <div className="flex flex-col items-center gap-2 mt-8 mb-2">
          <div className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-sidebar-accent/30 transition cursor-pointer">
            <img src="/window.svg" alt="User" className="w-8 h-8 rounded-full border border-sidebar-border" />
            {isExpanded && <div className="flex flex-col"><span className="font-semibold text-sm">Admin</span><span className="text-xs text-muted-foreground">Superuser</span></div>}
          </div>
          {isExpanded && <button className="w-full mt-2 py-1 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition text-xs font-medium">Logout</button>}
        </div>
      </aside>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <button
          className="fixed top-4 left-4 z-40 bg-sidebar p-2 rounded-md shadow-md border border-sidebar-border"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/40" onClick={toggleMobileSidebar} />
        )}
        <aside
          className={`fixed top-0 left-0 z-50 h-full bg-sidebar/95 border-r border-sidebar-border shadow-lg transition-all duration-300 p-4 w-64 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center gap-2 mb-8 px-1">
            <img src="/globe.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-sidebar-primary tracking-tight">GYM Meal Admin</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div />
            <button
              onClick={toggleMobileSidebar}
              className="text-muted-foreground hover:text-sidebar-primary transition-colors"
              aria-label="Close Sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          {/* Navigation (reuse) */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <div key={item.value}>
                <Accordion type="multiple" className="w-full" value={openItems} onValueChange={setOpenItems}>
                  <AccordionItem value={item.value}>
                    <AccordionTrigger className={`flex items-center space-x-2 group hover:bg-sidebar-accent/30 rounded px-2 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40`}>
                      {item.icon}
                      <span>{item.label}</span>
            </AccordionTrigger>
                    <AccordionContent className="flex flex-col items-start space-y-2 pl-0 text-left">
                      {item.links.map(link => (
                        <Link key={link.href} href={link.href} className={`w-full hover:text-sidebar-accent px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${isActive(link.href) ? "bg-sidebar-accent/40 font-semibold" : ""}`}>{link.label}</Link>
                      ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
                {idx < navItems.length - 1 && <div className="my-2 border-t border-sidebar-border opacity-60" />}
              </div>
            ))}
          </nav>
          {/* Sidebar bottom: user profile */}
          <div className="flex flex-col items-center gap-2 mt-8 mb-2">
            <div className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-sidebar-accent/30 transition cursor-pointer">
              <img src="/window.svg" alt="User" className="w-8 h-8 rounded-full border border-sidebar-border" />
              <div className="flex flex-col"><span className="font-semibold text-sm">Admin</span><span className="text-xs text-muted-foreground">Superuser</span></div>
            </div>
            <button className="w-full mt-2 py-1 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition text-xs font-medium">Logout</button>
          </div>
      </aside>
      </div>
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isExpanded ? "md:ml-64" : "md:ml-16"}`}>
        {/* Topbar */}
        <header className="w-full h-16 bg-white/95 border-b border-border flex items-center justify-between px-6 shadow-sm sticky top-0 z-20">
          {/* Search and actions */}
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 max-w-xs transition-all duration-300 focus-within:max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 rounded-md border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
            {/* Dark mode toggle */}
            <button
              className="p-2 rounded-full hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary/40"
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
            </button>
            {/* Notification dropdown */}
            <div className="relative">
              <button
                className="relative p-2 rounded-full hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-border rounded-md shadow-lg z-30 animate-fade-in">
                  <div className="p-4 text-sm text-muted-foreground border-b">Notifications</div>
                  <ul className="divide-y divide-border">
                    <li className="p-3 hover:bg-muted/50 transition">No new notifications</li>
                  </ul>
                </div>
              )}
            </div>
            {/* Profile dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                onClick={() => setProfileOpen((o) => !o)}
                aria-label="Profile"
              >
                <div className="w-8 h-8 rounded-full bg-muted" />
                <span className="font-medium text-sm text-muted-foreground hidden sm:block">Admin</span>
              </button>
              {/* Dropdown (animated) */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-border rounded-md shadow-lg z-30 animate-fade-in">
                  <div className="p-4 text-sm text-muted-foreground">Profile & Settings (coming soon)</div>
                </div>
              )}
            </div>
          </div>
        </header>
      {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto bg-gradient-to-br from-background to-muted/60 rounded-lg mt-4 shadow-sm relative">
          {/* SVG background pattern */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="relative z-10">
            {children}
          </div>
      </main>
      </div>
    </div>
  );
}
