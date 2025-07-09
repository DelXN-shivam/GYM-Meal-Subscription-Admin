"use client"
import { Users, Dumbbell, UtensilsCrossed, Crown, TrendingUp, Calendar, Bell, Settings, BarChart3, Activity, Target, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeWorkouts: 0,
    mealsPlanned: 0,
    monthlyRevenue: 0
  });
  
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Animate stats on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalMembers: 847,
        activeWorkouts: 23,
        mealsPlanned: 156,
        monthlyRevenue: 24500
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { icon: Users, label: "Manage Members", color: "from-blue-500 to-blue-600", description: "Add, edit, or view member profiles" },
    { icon: Dumbbell, label: "Workout Plans", color: "from-green-500 to-green-600", description: "Create and assign workout routines" },
    { icon: UtensilsCrossed, label: "Meal Planning", color: "from-orange-500 to-orange-600", description: "Design nutrition plans and menus" },
    { icon: BarChart3, label: "Analytics", color: "from-purple-500 to-purple-600", description: "View performance metrics and reports" },
  ];

  const recentActivity = [
    { id: 1, action: "New member registration", member: "Sarah Johnson", time: "2 hours ago", type: "member" },
    { id: 2, action: "Workout plan completed", member: "Mike Chen", time: "4 hours ago", type: "workout" },
    { id: 3, action: "Meal plan updated", member: "Emma Davis", time: "6 hours ago", type: "meal" },
    { id: 4, action: "Achievement unlocked", member: "Alex Rodriguez", time: "1 day ago", type: "achievement" },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'member': return <Users className="w-4 h-4" />;
      case 'workout': return <Dumbbell className="w-4 h-4" />;
      case 'meal': return <UtensilsCrossed className="w-4 h-4" />;
      case 'achievement': return <Award className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <main className="p-6 md:p-8 max-w-7xl w-full mx-auto">
      <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 dark:border-gray-700/60 overflow-hidden min-h-[800px]">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Header */}
        <div className="relative z-10 p-8 border-b border-slate-200/60 dark:border-gray-700/60">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  GYM-Meal Admin
                </h1>
                <p className="text-slate-600 dark:text-gray-400 mt-1">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-gray-600/60 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 shadow-lg">
                <Bell className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-gray-600/60 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 shadow-lg">
                <Settings className="w-5 h-5 text-slate-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="relative z-10 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-700 delay-300">
                  {stats.totalMembers.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 dark:text-gray-400">Total Members</p>
                <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <Target className="w-5 h-5 text-orange-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-700 delay-500">
                  {stats.activeWorkouts}
                </p>
                <p className="text-sm text-slate-600 dark:text-gray-400">Active Workouts</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Right now</p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-700 delay-700">
                  {stats.mealsPlanned}
                </p>
                <p className="text-sm text-slate-600 dark:text-gray-400">Meals Planned</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">This week</p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-700 delay-900">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 dark:text-gray-400">Monthly Revenue</p>
                <p className="text-xs text-green-600 dark:text-green-400">+8% from last month</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{action.label}</h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Recent Activity</h3>
              <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-gray-600/40 transition-colors duration-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                          {activity.action}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-gray-400 truncate">
                          {activity.member}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl p-8 border border-blue-200/30 dark:border-blue-400/30">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                Ready to manage your fitness empire?
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Monitor member progress, create personalized workout plans, design nutrition programs, and track your business growth all from one powerful dashboard.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}