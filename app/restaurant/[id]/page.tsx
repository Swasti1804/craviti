"use client"

import { useState } from "react"
import { ArrowLeft, Star, Clock, Truck, Plus, Minus, ShoppingCart, Heart, Share2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"

const menuItems = [
  {
    id: 101,
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, onion, and special sauce served with crispy fries",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg?height=200&width=200",
    category: "Burgers",
    veg: false,
    bestseller: true,
    spicy: 1,
  },
  {
    id: 102,
    name: "Chicken Deluxe Burger",
    description: "Grilled chicken breast with cheese, lettuce, and mayo on a toasted bun",
    price: 349,
    image: "/placeholder.svg?height=200&width=200",
    category: "Burgers",
    veg: false,
    bestseller: false,
    spicy: 2,
  },
  {
    id: 103,
    name: "Veggie Supreme Burger",
    description: "Plant-based patty with fresh vegetables and vegan mayo",
    price: 279,
    image: "/placeholder.svg?height=200&width=200",
    category: "Burgers",
    veg: true,
    bestseller: false,
    spicy: 0,
  },
  {
    id: 201,
    name: "Crispy Fries",
    description: "Golden crispy potato fries seasoned with herbs and spices",
    price: 99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Sides",
    veg: true,
    bestseller: true,
    spicy: 0,
  },
  {
    id: 202,
    name: "Onion Rings",
    description: "Crispy battered onion rings served with tangy dip",
    price: 129,
    image: "/placeholder.svg?height=200&width=200",
    category: "Sides",
    veg: true,
    bestseller: false,
    spicy: 0,
  },
  {
    id: 301,
    name: "Chocolate Shake",
    description: "Rich chocolate milkshake topped with whipped cream and chocolate chips",
    price: 149,
    image: "/placeholder.svg?height=200&width=200",
    category: "Beverages",
    veg: true,
    bestseller: false,
    spicy: 0,
  },
  {
    id: 302,
    name: "Fresh Lemonade",
    description: "Refreshing lemonade made with fresh lemons and mint",
    price: 89,
    image: "/placeholder.svg?height=200&width=200",
    category: "Beverages",
    veg: true,
    bestseller: true,
    spicy: 0,
  },
]

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))]

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = menuItems.find((item) => item.id === Number.parseInt(itemId))
      return sum + (item ? item.price * count : 0)
    }, 0)
  }

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const getSpicyIndicator = (level: number) => {
    if (level === 0) return ""
    return "🌶️".repeat(level)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-xl font-bold text-gray-800">Burger Palace</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share2 size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart size={20} />
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart size={20} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Restaurant Hero */}
        <div className="relative h-64 lg:h-80">
          <img
            src="/placeholder.svg?height=320&width=1200"
            alt="Burger Palace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            <div className="max-w-4xl">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Burger Palace</h1>
              <p className="text-lg lg:text-xl opacity-90 mb-4">American, Fast Food • ₹₹</p>
              <div className="flex items-center space-x-6 text-sm lg:text-base">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="font-semibold">4.5</span>
                  <span className="opacity-75">(1000+ ratings)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={20} />
                  <span>25-30 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck size={20} />
                  <span>FREE delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 p-6 lg:p-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Offers */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Offers for you</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🎉</div>
                      <div>
                        <h3 className="font-semibold text-orange-800">50% OFF up to ₹100</h3>
                        <p className="text-sm text-orange-600">Use code: SAVE50</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🚚</div>
                      <div>
                        <h3 className="font-semibold text-green-800">Free Delivery</h3>
                        <p className="text-sm text-green-600">On orders above ₹299</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Menu */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Menu</h2>

              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-sm">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedCategory} className="space-y-6">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-4 h-4 rounded border-2 ${item.veg ? "border-green-500" : "border-red-500"}`}
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full m-0.5 ${item.veg ? "bg-green-500" : "bg-red-500"}`}
                                  />
                                </div>
                                {item.bestseller && (
                                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                    ⭐ Bestseller
                                  </Badge>
                                )}
                                {item.spicy > 0 && <span className="text-sm">{getSpicyIndicator(item.spicy)}</span>}
                              </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-xl font-bold">₹{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-gray-500 line-through">₹{item.originalPrice}</span>
                              )}
                              {item.originalPrice && (
                                <Badge className="bg-green-100 text-green-700">
                                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                </Badge>
                              )}
                            </div>

                            {cart[item.id] ? (
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-orange-500 rounded-lg px-3 py-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                    className="h-8 w-8 p-0 text-white hover:bg-orange-600"
                                  >
                                    <Minus size={16} />
                                  </Button>
                                  <span className="text-white font-semibold min-w-[30px] text-center">
                                    {cart[item.id]}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => addToCart(item.id)}
                                    className="h-8 w-8 p-0 text-white hover:bg-orange-600"
                                  >
                                    <Plus size={16} />
                                  </Button>
                                </div>
                                <span className="text-sm text-gray-600">₹{item.price * cart[item.id]}</span>
                              </div>
                            ) : (
                              <Button
                                onClick={() => addToCart(item.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                              >
                                ADD TO CART
                              </Button>
                            )}
                          </div>

                          <div className="md:w-48 p-6 flex items-center justify-center">
                            <div className="relative">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl shadow-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Restaurant Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Restaurant Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Info size={16} className="text-gray-400" />
                      <span>Outlet: Sector 62, Noida</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>Open: 10:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck size={16} className="text-gray-400" />
                      <span>Free delivery on orders above ₹299</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cart Summary */}
              {getTotalItems() > 0 && (
                <Card className="border-orange-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Cart Summary</h3>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span>{getTotalItems()} items</span>
                        <span>₹{getTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Delivery</span>
                        <span>FREE</span>
                      </div>
                    </div>
                    <Link href="/cart">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        View Cart • ₹{getTotalPrice()}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
