"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Star,
  Gift,
  MapPin,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Edit,
  Trophy,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [cravePoints] = useState(1250)

  const menuItems = [
    {
      icon: MapPin,
      label: "Manage Addresses",
      href: "/addresses",
      description: "Add, edit or remove delivery addresses",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      href: "/payment-methods",
      description: "Manage your saved payment options",
    },
    { icon: Gift, label: "Offers & Coupons", href: "/offers", description: "View available deals and promotions" },
    { icon: Settings, label: "Settings", href: "/settings", description: "App preferences and notifications" },
    { icon: HelpCircle, label: "Help & Support", href: "/help", description: "Get help or contact support" },
  ]

  const recentOrders = [
    {
      id: 1,
      restaurant: "Burger Palace",
      items: "Classic Beef Burger, Fries",
      amount: 697,
      date: "2 days ago",
      status: "Delivered",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      restaurant: "Pizza Corner",
      items: "Margherita Pizza, Coke",
      amount: 450,
      date: "1 week ago",
      status: "Delivered",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      restaurant: "Spice Garden",
      items: "Butter Chicken, Naan",
      amount: 380,
      date: "2 weeks ago",
      status: "Delivered",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const achievements = [
    { title: "First Order", description: "Completed your first order", icon: "🎯", unlocked: true },
    { title: "Foodie Explorer", description: "Ordered from 5 different restaurants", icon: "🗺️", unlocked: true },
    { title: "Loyal Customer", description: "Placed 10 orders", icon: "❤️", unlocked: true },
    { title: "Points Master", description: "Earned 1000 CravePoints", icon: "⭐", unlocked: true },
    { title: "Speed Demon", description: "Order 5 times in a week", icon: "⚡", unlocked: false },
    { title: "Big Spender", description: "Spend ₹5000 in total", icon: "💰", unlocked: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Profile</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="bg-orange-500 text-white text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">John Doe</h2>
                  <p className="text-gray-600 mb-1">john.doe@email.com</p>
                  <p className="text-sm text-gray-500 mb-4">+91 9876543210</p>
                  <Button size="sm" variant="outline">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* CravePoints */}
                <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="fill-current" size={24} />
                        <span className="font-semibold text-lg">CravePoints</span>
                      </div>
                      <p className="text-3xl font-bold">{cravePoints}</p>
                      <p className="text-sm opacity-90">≈ ₹{Math.floor(cravePoints / 10)} value</p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      Redeem
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-orange-500">24</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">4.8</p>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-500">₹2.4k</p>
                  <p className="text-sm text-gray-600">Total Saved</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-purple-500">8</p>
                  <p className="text-sm text-gray-600">Restaurants</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Recent Orders</CardTitle>
                      <Link href="/orders">
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt={order.restaurant}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{order.restaurant}</h4>
                          <p className="text-sm text-gray-600">{order.items}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{order.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link key={item.label} href={item.href}>
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <Icon size={20} className="text-orange-500" />
                              <div className="flex-1">
                                <span className="font-medium text-gray-700">{item.label}</span>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                              <span className="text-gray-400">›</span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Clock size={48} className="text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">View All Orders</h3>
                      <p className="text-gray-600 mb-4">See your complete order history and track current orders</p>
                      <Link href="/orders">
                        <Button className="bg-orange-500 hover:bg-orange-600">Go to Orders</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <Trophy className="text-yellow-500" size={24} />
                      <span>Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            achievement.unlocked ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`text-2xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <h4
                                className={`font-medium ${achievement.unlocked ? "text-yellow-800" : "text-gray-600"}`}
                              >
                                {achievement.title}
                              </h4>
                              <p className={`text-sm ${achievement.unlocked ? "text-yellow-600" : "text-gray-500"}`}>
                                {achievement.description}
                              </p>
                            </div>
                            {achievement.unlocked && <Badge className="bg-yellow-500 text-white">Unlocked</Badge>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {menuItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link key={item.label} href={item.href}>
                          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <Icon size={20} className="text-gray-400" />
                            <div className="flex-1">
                              <span className="font-medium text-gray-700">{item.label}</span>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                            <span className="text-gray-400">›</span>
                          </div>
                        </Link>
                      )
                    })}

                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        className="w-full text-red-500 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
