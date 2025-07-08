"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      name: "Classic Beef Burger",
      quantity: 2,
      price: 299,
      restaurant: "Burger Palace",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 201,
      name: "Crispy Fries",
      quantity: 1,
      price: 99,
      restaurant: "Burger Palace",
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState("")

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE50") {
      setAppliedPromo("SAVE50")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= 299 ? 0 : 40
  const promoDiscount = appliedPromo === "SAVE50" ? Math.min(100, subtotal * 0.5) : 0
  const total = subtotal + deliveryFee - promoDiscount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Add some delicious items to get started!</p>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 text-lg">Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
            <div className="ml-auto flex items-center space-x-2 text-sm text-gray-600">
              <ShoppingBag size={16} />
              <span>{cartItems.length} items</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <span>Items from Burger Palace</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                        <p className="text-gray-600">₹{item.price}</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 border rounded-lg">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-10 w-10 p-0 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="font-semibold min-w-[40px] text-center text-lg">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-10 w-10 p-0 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="h-10 w-10 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                  <Percent size={20} className="text-green-500" />
                  <span>Apply Coupon</span>
                </h3>
                <div className="flex space-x-3">
                  <Input
                    placeholder="Enter promo code (try SAVE50)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={applyPromoCode}
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">✅ Coupon {appliedPromo} applied successfully!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className={deliveryFee === 0 ? "text-green-600 font-medium" : "font-medium"}>
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coupon Discount</span>
                        <span className="text-green-600 font-medium">-₹{promoDiscount}</span>
                      </div>
                    )}
                    {deliveryFee === 0 && subtotal < 299 && (
                      <div className="text-sm text-gray-500">Add ₹{299 - subtotal} more for free delivery</div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">₹{total}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link href="/checkout">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" className="w-full bg-transparent">
                        Add More Items
                      </Button>
                    </Link>
                  </div>

                  <div className="text-xs text-gray-500 text-center pt-2">
                    🎯 You'll earn {Math.floor(total / 10)} CravePoints from this order!
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
