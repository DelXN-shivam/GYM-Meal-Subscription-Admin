"use client"
import React, { useState } from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Menu, 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  Crown,
  Shield
} from 'lucide-react';

// Mock navigation items
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
      { href: '/users/members', label: 'Members' },
      { href: '/users/trainers', label: 'Trainers' },
      { href: '/users/staff', label: 'Staff' }
    ]
  },
  {
    value: 'products',
    label: 'Products',
    icon: <Dumbbell size={20} />,
    links: [
      { href: '/products/equipment', label: 'Equipment' },
      { href: '/products/classes', label: 'Classes' },
      { href: '/products/memberships', label: 'Memberships' }
    ]
  },
  {
    value: 'meals',
    label: 'Meal Plans',
    icon: <UtensilsCrossed size={20} />,
    links: [
      { href: '/meals/plans', label: 'Plans' },
      { href: '/meals/recipes', label: 'Recipes' },
      { href: '/meals/nutrition', label: 'Nutrition Guide' }
    ]
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    links: [
      { href: '/settings/general', label: 'General' },
      { href: '/settings/notifications', label: 'Notifications' },
      { href: '/settings/security', label: 'Security' }
    ]
  }
];

const EnhancedDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [openItems, setOpenItems] = useState(['dashboard']); // Start with dashboard open
  const [activeLink, setActiveLink] = useState('/dashboard/overview'); // Track active link

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  const toggleDropdown = (itemValue) => {
    setOpenItems(prev => 
      prev.includes(itemValue) 
        ? prev.filter(item => item !== itemValue)
        : [...prev, itemValue]
    );
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  const isActive = (href) => {
    return href === activeLink;
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Enhanced Topbar */}
        <header className="w-full h-16 bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 border-b border-slate-200/60 dark:border-gray-700/60 flex items-center justify-between px-6 shadow-lg sticky top-0 z-30">
          {/* Logo Section */}
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

          {/* Enhanced Search */}
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

          {/* Enhanced Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <Sun className="w-5 h-5 text-yellow-500" /> : 
                <Moon className="w-5 h-5 text-slate-600" />
              }
            </button>
            
            {/* Enhanced Notification */}
            <div className="relative">
              <button
                className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                onClick={() => setNotifOpen(!notifOpen)}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center font-medium animate-pulse">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-2xl shadow-2xl z-40 animate-in slide-in-from-top-2 duration-200 backdrop-blur-lg">
                  <div className="p-4 border-b border-slate-100 dark:border-gray-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400">You have 3 unread messages</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-slate-50 dark:border-gray-700/50 last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">New member registration</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">John Doe just signed up for premium membership</p>
                            <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Enhanced Profile */}
            <div className="relative">
              <button
                className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-lg"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Profile"
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-sm text-white hidden sm:block">Admin</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-2xl shadow-2xl z-40 animate-in slide-in-from-top-2 duration-200 backdrop-blur-lg">
                  <div className="p-4 border-b border-slate-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Super Admin</p>
                        <p className="text-sm text-slate-500 dark:text-gray-400">admin@gym.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700 dark:text-gray-300">Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left text-red-600 dark:text-red-400">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Enhanced Desktop Sidebar */}
          <aside
            className={`fixed z-20 h-[calc(100vh-4rem)] mt-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-slate-200/60 dark:border-gray-700/60 shadow-xl transition-all duration-300 p-4 flex flex-col
              ${isExpanded ? "w-72" : "w-20"}
              hidden md:flex
            `}
          >
            {/* Toggle Button */}
            <div className="flex items-center justify-between mb-8">
              <div />
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                aria-label="Toggle Sidebar"
              >
                {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
            
            {/* Enhanced Navigation */}
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item, idx) => (
                <div key={item.value} className="group">
                  {isExpanded ? (
                    <div className="space-y-1">
                      {/* Main Item Button with Dropdown Toggle */}
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
                      
                      {/* Dropdown Links */}
                      {openItems.includes(item.value) && (
                        <div className="ml-12 space-y-1 animate-in slide-in-from-top-1 duration-200">
                          {item.links.map(link => (
                            <button
                              key={link.href}
                              onClick={() => handleLinkClick(link.href)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                                isActive(link.href) 
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              {link.label}
                            </button>
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
                        <div className="absolute left-16 top-0 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl shadow-2xl p-4 whitespace-nowrap z-50 animate-in slide-in-from-left-2 duration-200 backdrop-blur-lg">
                          <div className="font-semibold text-slate-900 dark:text-white mb-2">{item.label}</div>
                          <div className="space-y-1">
                            {item.links.map(link => (
                              <button
                                key={link.href}
                                onClick={() => handleLinkClick(link.href)}
                                className={`block w-full text-left text-sm transition-colors py-1 px-2 rounded ${
                                  isActive(link.href)
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                              >
                                {link.label}
                              </button>
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
            
            {/* Enhanced User Profile Section */}
            {isExpanded && (
              <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-slate-200/60 dark:border-gray-600/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Admin</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Super User</p>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  Sign Out
                </button>
              </div>
            )}
          </aside>

          {/* Mobile Sidebar (Enhanced) */}
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
              {/* Mobile Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">GYM Meal Admin</h2>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Management Portal</p>
                </div>
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-2">
                {navItems.map((item, idx) => (
                  <div key={item.value} className="space-y-1">
                    <button 
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-200"
                      onClick={() => toggleDropdown(item.value)}
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-gray-700">
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
                      <div className="ml-12 space-y-1 animate-in slide-in-from-top-1 duration-200">
                        {item.links.map(link => (
                          <button
                            key={link.href}
                            onClick={() => {
                              handleLinkClick(link.href);
                              setMobileSidebarOpen(false); // Close mobile sidebar on link click
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              isActive(link.href) 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {link.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {idx < navItems.length - 1 && <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-700 to-transparent" />}
                  </div>
                ))}
              </nav>
            </aside>
          </div>

          {/* Enhanced Main Content Area */}
          <div className={`flex-1 flex flex-col min-h-[calc(100vh-4rem)] transition-all duration-300 ${isExpanded ? "md:ml-72" : "md:ml-20"}`}>
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
              {/* Enhanced Background Pattern */}
              <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 dark:border-gray-700/60 p-8 min-h-[600px] overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                
                {/* Grid Pattern */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]" viewBox="0 0 400 400" fill="none">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                
                {/* Content Area */}
                <div className="relative z-10">
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <Crown className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                      Welcome to GYM-Meal Admin
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
                      Your comprehensive management portal for gym operations, meal planning, and member administration. 
                      Navigate through the sidebar to access different sections of your dashboard.
                    </p>
                    <div className="text-sm text-slate-500 dark:text-gray-500 mb-12">
                      Currently viewing: <span className="font-semibold text-blue-600 dark:text-blue-400">{activeLink}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      {[
                        { icon: <Users className="w-8 h-8" />, title: "Member Management", desc: "Manage gym members and their subscriptions" },
                        { icon: <Dumbbell className="w-8 h-8" />, title: "Equipment Tracking", desc: "Monitor and maintain gym equipment" },
                        { icon: <UtensilsCrossed className="w-8 h-8" />, title: "Meal Planning", desc: "Create and manage nutrition plans" }
                      ].map((item, i) => (
                        <div key={i} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-gray-700/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                          <p className="text-slate-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;