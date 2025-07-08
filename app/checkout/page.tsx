"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, CreditCard, Wallet, Star, Smartphone, QrCode, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [usePoints, setUsePoints] = useState(false)
  const [pointsToRedeem, setPointsToRedeem] = useState([0])
  const [promoCode, setPromoCode] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("card")

  const cartItems = [
    {
      id: 101,
      name: "Classic Beef Burger",
      quantity: 2,
      price: 299,
      restaurant: "Burger Palace",
    },
    {
      id: 201,
      name: "Crispy Fries",
      quantity: 1,
      price: 99,
      restaurant: "Burger Palace",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 0
  const cravePointsBalance = 500
  const maxRedeemablePoints = Math.min(cravePointsBalance, Math.floor(subtotal * 0.5)) // Max 50% of subtotal
  const pointsDiscount = usePoints ? Math.floor(pointsToRedeem[0] / 10) : 0 // 10 points = ₹1
  const total = subtotal + deliveryFee - pointsDiscount

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
      popular: true,
    },
    {
      id: "upi",
      name: "UPI",
      icon: QrCode,
      description: "Pay via any UPI app",
      popular: true,
    },
    {
      id: "phonepe",
      name: "PhonePe",
      icon: Smartphone,
      description: "Pay with PhonePe wallet",
      popular: false,
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: Wallet,
      description: "Pay with Paytm wallet",
      popular: false,
    },
    {
      id: "googlepay",
      name: "Google Pay",
      icon: Smartphone,
      description: "Pay with Google Pay",
      popular: false,
    },
  ]

  const handlePlaceOrder = () => {
    // Simulate order placement
    router.push("/order-confirmation")
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
            <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin size={20} className="text-orange-500" />
                    <span>Delivery Address</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus size={16} className="mr-1" />
                    Add New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Saved Address */}
                <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-orange-500 text-white">Home</Badge>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <p className="font-medium text-gray-800">123 Main Street, Apartment 4B</p>
                      <p className="text-gray-600">Sector 62, Noida, Uttar Pradesh - 201301</p>
                      <p className="text-sm text-gray-500 mt-1">Near City Mall</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>

                {/* Add New Address Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="House/Flat Number" />
                  <Input placeholder="Street Address" />
                  <Input placeholder="City" />
                  <Input placeholder="Pincode" />
                  <Input placeholder="Landmark (Optional)" className="md:col-span-2" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                          selectedPayment === method.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <Icon
                          size={24}
                          className={selectedPayment === method.id ? "text-orange-500" : "text-gray-400"}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`font-medium ${
                                selectedPayment === method.id ? "text-orange-500" : "text-gray-700"
                              }`}
                            >
                              {method.name}
                            </span>
                            {method.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                        {selectedPayment === method.id && <Badge className="bg-orange-500 text-white">Selected</Badge>}
                      </div>
                    )
                  })}
                </div>

                {/* Card Details Form */}
                {selectedPayment === "card" && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
                    <h4 className="font-medium">Card Details</h4>
                    <div className="grid gap-4">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVV" />
                      </div>
                      <Input placeholder="Cardholder Name" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Apply Coupon</h3>
                <div className="flex space-x-3">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CravePoints */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-500 fill-current" size={20} />
                    <span className="font-semibold text-lg">Use CravePoints</span>
                  </div>
                  <Switch checked={usePoints} onCheckedChange={setUsePoints} />
                </div>

                {usePoints && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Points to redeem: {pointsToRedeem[0]}</span>
                        <span className="text-green-600 font-medium">-₹{pointsDiscount}</span>
                      </div>
                      <Slider
                        value={pointsToRedeem}
                        onValueChange={setPointsToRedeem}
                        max={maxRedeemablePoints}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0 points</span>
                        <span>{maxRedeemablePoints} points max</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t">
                  <span className="text-gray-600">Available Balance: {cravePointsBalance} points</span>
                  <span className="text-xs text-gray-500">10 points = ₹1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.restaurant}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Bill Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    {usePoints && pointsDiscount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">CravePoints Discount</span>
                        <span className="text-green-600">-₹{pointsDiscount}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">₹{total}</span>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    🎯 You'll earn {Math.floor(total / 10)} CravePoints from this order!
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg mt-6"
                    onClick={handlePlaceOrder}
                  >
                    Place Order • ₹{total}
                  </Button>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-green-700">
                    <div className="text-lg">🔒</div>
                    <div>
                      <h4 className="font-medium">Secure Payment</h4>
                      <p className="text-sm text-green-600">Your payment information is encrypted and secure</p>
                    </div>
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
