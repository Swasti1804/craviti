"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, MapPin, Phone, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState("Order Placed")

  const orderStatuses = ["Order Placed", "Restaurant Accepted", "Food Being Prepared", "Out for Delivery", "Delivered"]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 20, 100)
        const statusIndex = Math.floor(newProgress / 25)
        setCurrentStatus(orderStatuses[Math.min(statusIndex, orderStatuses.length - 1)])
        return newProgress
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-4">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Order Confirmation</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center py-12">
          <CheckCircle className="text-green-500 mx-auto mb-6" size={80} />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600">Your delicious food is on its way</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono font-semibold">#FE12345</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Restaurant</span>
                  <span className="font-medium">Burger Palace</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-orange-500 text-lg">₹697</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="font-medium">25-30 min</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <MapPin size={20} />
                  <span>Delivery Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-800">Delivering to:</p>
                  <p className="text-gray-600">123 Main Street, Apartment 4B</p>
                  <p className="text-gray-600">Sector 62, Noida - 201301</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="font-medium text-gray-800">Delivery Partner</p>
                    <p className="text-gray-600">Rahul Kumar</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="text-yellow-400 fill-current" size={14} />
                      <span className="text-sm text-gray-600">4.8 rating</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone size={16} className="mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Tracking */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Clock size={20} />
                  <span>Order Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="font-semibold text-xl text-orange-500 mb-4">{currentStatus}</p>
                  <Progress value={progress} className="w-full h-3" />
                  <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
                </div>

                <div className="space-y-4">
                  {orderStatuses.map((status, index) => (
                    <div
                      key={status}
                      className={`flex items-center space-x-3 ${
                        index <= Math.floor(progress / 25) ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          index <= Math.floor(progress / 25) ? "bg-green-500 border-green-500" : "border-gray-300"
                        }`}
                      />
                      <span className="font-medium">{status}</span>
                      {index === Math.floor(progress / 25) && (
                        <Badge className="bg-orange-100 text-orange-700 text-xs">Current</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-bold text-xl mb-2">Congratulations!</h3>
                <p className="text-lg opacity-90 mb-2">You earned 69 CravePoints from this order!</p>
                <p className="text-sm opacity-75">Points will be credited after delivery</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link href="/orders">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 py-3">Track All Orders</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full py-3 bg-transparent">
              Order Again
            </Button>
          </Link>
          <Button variant="outline" className="w-full py-3 bg-transparent">
            Share Order
          </Button>
        </div>

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any issues with your order, our support team is here to help.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm">
                Chat Support
              </Button>
              <Button variant="outline" size="sm">
                Call Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
