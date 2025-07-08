"use client"

import { useState } from "react"
import { Search, MapPin, Star, Clock, Truck, Filter, ShoppingCart, User, Heart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const restaurants = [
  {
    id: 1,
    name: "Burger Palace",
    cuisine: "American, Fast Food",
    rating: 4.5,
    deliveryTime: "25-30 min",
    deliveryFee: 0,
    image: "/placeholder.svg?height=200&width=300",
    offer: "50% OFF up to ₹100",
    distance: "1.2 km",
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: "Italian, Pizza",
    rating: 4.3,
    deliveryTime: "30-35 min",
    deliveryFee: 25,
    image: "/placeholder.svg?height=200&width=300",
    offer: "Buy 1 Get 1 Free",
    distance: "2.1 km",
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian, North Indian",
    rating: 4.6,
    deliveryTime: "20-25 min",
    deliveryFee: 0,
    image: "/placeholder.svg?height=200&width=300",
    offer: "₹125 OFF above ₹249",
    distance: "0.8 km",
  },
  {
    id: 4,
    name: "Sushi Zen",
    cuisine: "Japanese, Sushi",
    rating: 4.4,
    deliveryTime: "35-40 min",
    deliveryFee: 35,
    image: "/placeholder.svg?height=200&width=300",
    offer: "20% OFF",
    distance: "3.2 km",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican, Tex-Mex",
    rating: 4.2,
    deliveryTime: "20-25 min",
    deliveryFee: 0,
    image: "/placeholder.svg?height=200&width=300",
    offer: "Free Delivery",
    distance: "1.8 km",
  },
  {
    id: 6,
    name: "Pasta Paradise",
    cuisine: "Italian, Continental",
    rating: 4.7,
    deliveryTime: "30-35 min",
    deliveryFee: 30,
    image: "/placeholder.svg?height=200&width=300",
    offer: "30% OFF",
    distance: "2.5 km",
  },
]

const categories = [
  { name: "Pizza", icon: "🍕", color: "bg-red-100" },
  { name: "Burger", icon: "🍔", color: "bg-yellow-100" },
  { name: "Indian", icon: "🍛", color: "bg-orange-100" },
  { name: "Chinese", icon: "🥡", color: "bg-red-100" },
  { name: "Desserts", icon: "🍰", color: "bg-pink-100" },
  { name: "Beverages", icon: "🥤", color: "bg-blue-100" },
  { name: "Mexican", icon: "🌮", color: "bg-green-100" },
  { name: "Italian", icon: "🍝", color: "bg-green-100" },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold text-gray-900">FoodieExpress</span>
              </Link>
            </div>

            {/* Location */}
            <div className="hidden md:flex items-center space-x-2 text-gray-600">
              <MapPin size={20} className="text-orange-500" />
              <div>
                <p className="text-sm font-medium">Deliver to</p>
                <p className="text-xs">Sector 62, Noida</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/offers" className="text-gray-600 hover:text-orange-500 transition-colors">
                Offers
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-orange-500 transition-colors">
                Help
              </Link>
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <User size={20} />
                <span className="hidden lg:block">Profile</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu size={20} />
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for restaurants, food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Delicious Food, <br className="hidden sm:block" />
              <span className="text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Order from your favorite restaurants and get it delivered in minutes
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <Input
                  placeholder="Enter your delivery address..."
                  className="pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 rounded-full shadow-lg"
                />
                <Button className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 rounded-full px-8">
                  Find Food
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">What's on your mind?</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 lg:p-6 rounded-2xl text-center transition-all hover:scale-105 ${
                  selectedCategory === category.name
                    ? "bg-orange-500 text-white shadow-lg"
                    : `${category.color} hover:shadow-md`
                }`}
              >
                <div className="text-3xl lg:text-4xl mb-2">{category.icon}</div>
                <p className="text-sm lg:text-base font-medium">{category.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Offers Banner */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white lg:col-span-2">
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">🎉 Special Offers</h3>
                <p className="text-lg opacity-90 mb-4">Get up to 60% off on your first order!</p>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">Order Now</Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold mb-2">🚚 Free Delivery</h3>
                <p className="opacity-90 mb-4">On orders above ₹299</p>
                <Button className="bg-white text-green-600 hover:bg-gray-100">Explore</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Restaurants near you</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Sort by: Relevance</option>
                <option>Delivery Time</option>
                <option>Rating</option>
                <option>Cost: Low to High</option>
                <option>Cost: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-orange-500 text-white shadow-lg">
                        {restaurant.offer}
                      </Badge>
                      <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart size={16} className="text-gray-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-500 transition-colors">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-sm">
                          <Star className="fill-current" size={12} />
                          <span className="font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock size={14} />
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Truck size={14} />
                            <span>{restaurant.deliveryFee === 0 ? "FREE" : `₹${restaurant.deliveryFee}`}</span>
                          </div>
                        </div>
                        <span className="text-gray-400">{restaurant.distance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Load More Restaurants
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold">FoodieExpress</span>
              </div>
              <p className="text-gray-400 mb-4">
                Delicious food delivered fast to your doorstep. Order from thousands of restaurants.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-white transition-colors">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Download App</h3>
              <div className="space-y-3">
                <Button className="w-full bg-black hover:bg-gray-800 justify-start">
                  <div className="mr-3">📱</div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </Button>
                <Button className="w-full bg-black hover:bg-gray-800 justify-start">
                  <div className="mr-3">🤖</div>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodieExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
