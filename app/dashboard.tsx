"use client"
import { useState } from 'react';
import { LayoutDashboard, Users, ShoppingCart, TrendingUp, DollarSign, Activity, Bell, Search, Menu, X } from 'lucide-react';

export default function Dashboard() {

  const stats = [
    { name: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, trend: 'up' },
    { name: 'Active Users', value: '2,345', change: '+15.3%', icon: Users, trend: 'up' },
    { name: 'Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart, trend: 'up' },
    { name: 'Conversion Rate', value: '3.24%', change: '-2.4%', icon: TrendingUp, trend: 'down' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto py-16">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.trend === 'up' ? 'bg-blue-100' : 'bg-red-100'}`}>
                    <stat.icon className={`w-6 h-6 ${stat.trend === 'up' ? 'text-blue-600' : 'text-red-600'}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium">{stat.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}