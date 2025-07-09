"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bell, Sun, Moon, ChevronLeft, ChevronRight, ChevronDown,
  ChevronUp, Menu, Users, Dumbbell, PackageSearch,
  BarChart3, Settings, LogOut, Search, Crown, Shield , CreditCard
} from 'lucide-react';

const navItems = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 size={20} />,
    links: [
      { href: '/dashboard/overview', label: 'Overview' },
      { href: '/dashboard/analytics', label: 'Analytics' },
      { href: '/dashboard/reports', label: 'Reports' }
    ]
  },
  {
    value: 'users',
    label: 'Users',
    icon: <Users size={20} />,
    links: [
      { href: '/ui/dashboard/users', label: 'View Users' }
    ]
  },
  {
    value: 'products',
    label: 'Products',
    icon: <PackageSearch size={20} />,
    links: [
      { href: '/ui/dashboard/products', label: 'View Products' },
      { href: '/ui/dashboard/products/add', label: 'Add Product' }
    ]
  },
  {
    value: 'subscriptions',
    label: 'Subscriptions',
    icon: <CreditCard size={20} />, // You'll need to import CreditCard from lucide-react
    links: [
      { href: '/ui/dashboard/subscription', label: 'View Subscriptions' },
      { href: '/ui/dashboard/subscription/add', label: 'Add Subscription' }
    ]
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    links: [
      { href: '/settings/general', label: 'General' },
      { href: '/settings/notifications', label: 'Notifications' }
    ]
  }
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [openItems, setOpenItems] = useState(['dashboard']);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  const toggleDropdown = (itemValue) => {
    setOpenItems(prev => 
      prev.includes(itemValue) 
        ? prev.filter(item => item !== itemValue)
        : [...prev, itemValue]
    );
  };

  const isActive = (href) => pathname === href;

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header - Keep your original header */}
        <header className="w-full h-16 bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 border-b border-slate-200/60 dark:border-gray-700/60 flex items-center justify-between px-6 shadow-lg sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GYM-Meal-Admin
              </h1>
              <p className="text-xs text-slate-500 dark:text-gray-400">Management Portal</p>
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 w-80 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users, meals, equipment..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            
            <div className="relative">
              <button
                className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell className="w-5 h-5 text-slate-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center font-medium animate-pulse">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-2xl shadow-2xl z-40">
                  {/* Notification dropdown content */}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-lg"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-sm text-white hidden sm:block">Admin</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-2xl shadow-2xl z-40">
                  {/* Profile dropdown content */}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Desktop Sidebar - Keep your original sidebar */}
          <aside className={`fixed z-20 h-[calc(100vh-4rem)] mt-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-slate-200/60 dark:border-gray-700/60 shadow-xl transition-all duration-300 p-4 flex flex-col ${isExpanded ? "w-72" : "w-20"} hidden md:flex`}>
            <div className="flex items-center justify-between mb-8">
              <div />
              <button
                onClick={toggleSidebar}
                className="p-2 mr-1 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
            
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item, idx) => (
                <div key={item.value} className="group">
                  {isExpanded ? (
                    <div className="space-y-1">
                      <button 
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 group"
                        onClick={() => toggleDropdown(item.value)}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors">
                          {item.icon}
                        </div>
                        <span className="font-medium text-slate-700 dark:text-gray-300 flex-1 text-left">{item.label}</span>
                        <div className="p-1 rounded-md transition-transform duration-200">
                          {openItems.includes(item.value) ? 
                            <ChevronUp size={16} className="text-slate-500 dark:text-gray-400" /> : 
                            <ChevronDown size={16} className="text-slate-500 dark:text-gray-400" />
                          }
                        </div>
                      </button>
                      
                      {openItems.includes(item.value) && (
                        <div className="ml-12 space-y-1">
                          {item.links.map(link => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                                isActive(link.href) 
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        onMouseEnter={() => setActiveSection(item.value)}
                        onMouseLeave={() => setActiveSection("")}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-gray-700">
                          {item.icon}
                        </div>
                      </button>
                      {activeSection === item.value && (
                        <div className="absolute left-16 top-0 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl shadow-2xl p-4 whitespace-nowrap z-50">
                          <div className="font-semibold text-slate-900 dark:text-white mb-2">{item.label}</div>
                          <div className="space-y-1">
                            {item.links.map(link => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className={`block w-full text-left text-sm transition-colors py-1 px-2 rounded ${
                                  isActive(link.href)
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {idx < navItems.length - 1 && <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-700 to-transparent" />}
                </div>
              ))}
            </nav>
            
            {isExpanded && (
              <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-slate-200/60 dark:border-gray-600/60">
                {/* User profile section */}
              </div>
            )}
          </aside>

          {/* Mobile Sidebar */}
          <div className="md:hidden">
            <button
              className="fixed top-20 left-4 z-40 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border border-slate-200/60 dark:border-gray-600/60"
              onClick={toggleMobileSidebar}
            >
              <Menu size={20} />
            </button>
            {mobileSidebarOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={toggleMobileSidebar} />
            )}
            <aside
              className={`fixed top-0 left-0 z-50 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-slate-200/60 dark:border-gray-700/60 shadow-2xl transition-all duration-300 p-6 w-80 overflow-y-auto ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              {/* Mobile sidebar content */}
            </aside>
          </div>

          {/* Content Area */}
          <div className={`flex-1 ${isExpanded ? "md:ml-72" : "md:ml-20"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}