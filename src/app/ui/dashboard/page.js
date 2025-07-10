"use client"
import axios from 'axios';
import { Users, Dumbbell, UtensilsCrossed, Crown, TrendingUp, Calendar, Bell, Settings, BarChart3, Activity, Target, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [loading, setLoading] = useState({
    userCount: true,
    productCount: true,
    quickActions: false
  });
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  const calculateUserCount = async () => {
    try {
      setLoading(prev => ({ ...prev, userCount: true }));
      const res = await axios.get(`${BASE_URL}/api/v1/user/count`);

      if (res.status == 409) {
        toast.error('Error fetching user count')
      }
      if (res.status == 500) {
        console.log(err.message)
        toast.error(err.message)
      }
      setUserCount(res.data.count);
    } catch (err) {
      console.log(err.message)
      toast.error(err.message)
    } finally {
      setLoading(prev => ({ ...prev, userCount: false }));
    }
  }

  const calculateProductCount = async () => {
    try {
      setLoading(prev => ({ ...prev, productCount: true }));
      const res = await axios.get(`${BASE_URL}/api/v1/product/count`);

      if (res.status == 409) {
        toast.error('Error fetching product count')
      }

      setProductCount(res.data.count);
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(prev => ({ ...prev, productCount: false }));
    }
  }

  useEffect(() => {
    calculateUserCount();
    calculateProductCount();
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      icon: Users, label: "Manage Members", color: "from-blue-500 to-blue-600", description: "Add, edit, or view member profiles", onClick: () => {
        setLoading(prev => ({ ...prev, quickActions: true }));
        router.push('/ui/dashboard/users');
      }
    },
    {
      icon: UtensilsCrossed, label: "Meal Planning", color: "from-orange-500 to-orange-600", description: "Design nutrition plans and menus", onClick: () => {
        setTimeout(() => {
          router.push('/ui/dashboard/products');
        }, 4000)
        setLoading(prev => ({ ...prev, quickActions: true }));

      }
    },
    { icon: BarChart3, label: "Analytics", color: "from-purple-500 to-purple-600", description: "View performance metrics and reports" },
  ];

  const recentActivity = [
    { id: 1, action: "New member registration", member: "Sarah Johnson", time: "2 hours ago", type: "member" },
    { id: 2, action: "Workout plan completed", member: "Mike Chen", time: "4 hours ago", type: "workout" },
    { id: 3, action: "Meal plan updated", member: "Emma Davis", time: "6 hours ago", type: "meal" },
    { id: 4, action: "Achievement unlocked", member: "Alex Rodriguez", time: "1 day ago", type: "achievement" },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'member': return <Users className="w-4 h-4" />;
      case 'workout': return <Dumbbell className="w-4 h-4" />;
      case 'meal': return <UtensilsCrossed className="w-4 h-4" />;
      case 'achievement': return <Award className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <main className="p-6 md:p-8 max-w-7xl w-full min-h-screen mx-auto overflow:hidden dark:bg-black">
      <div className="relative overflow-hidden  ">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 p-8  border-slate-200/60 dark:border-gray-700/60">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center ">
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
              {loading.quickActions && (
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="relative z-10 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* User Count Card */}
            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 transition-all duration-300 text-left dark:bg-zinc-900/70">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-1">
                {loading.userCount ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-slate-600 dark:text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-700 delay-300">
                      {userCount !== null ? userCount : '--'}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Total Members</p>
                  </>
                )}
              </div>
            </div>

            {/* Product Count Card */}
            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 transition-all duration-300 text-left dark:bg-zinc-900/70">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-1">
                {loading.productCount ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-slate-600 dark:text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-700 delay-700">
                      {productCount !== null ? productCount : '--'}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Meals Planned</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">This week</p>
                  </>
                )}
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 transition-all duration-300 text-left dark:bg-zinc-900/70">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-800 dark:text-white transition-all duration-700 delay-900">
                  ${'35,000'}
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
                    onClick={action.onClick}
                    disabled={loading.quickActions}
                    className={`group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left dark:bg-zinc-900/70 ${loading.quickActions ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300 relative`}>
                      {loading.quickActions && index < 2 ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <action.icon className="w-6 h-6 text-white" />
                      )}
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
              <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-gray-600/60 shadow-lg dark:bg-zinc-900/70">
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
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                disabled={loading.quickActions}
              >
                {loading.quickActions ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  'Get Started Today'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}