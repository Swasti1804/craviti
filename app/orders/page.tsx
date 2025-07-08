"use client"

import { useState } from "react"
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

const orders = [
  {
    id: 12345,
    restaurant: "Burger Palace",
    items: ["Classic Beef Burger x2", "Crispy Fries x1"],
    amount: 697,
    date: "2024-01-15",
    time: "2:30 PM",
    status: "delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 12344,
    restaurant: "Pizza Corner",
    items: ["Margherita Pizza x1", "Coke x1"],
    amount: 450,
    date: "2024-01-10",
    time: "7:45 PM",
    status: "delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 12343,
    restaurant: "Spice Garden",
    items: ["Butter Chicken x1", "Naan x2"],
    amount: 380,
    date: "2024-01-08",
    time: "1:15 PM",
    status: "cancelled",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 12342,
    restaurant: "Sushi Zen",
    items: ["California Roll x1", "Miso Soup x1"],
    amount: 650,
    date: "2024-01-05",
    time: "8:20 PM",
    status: "delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-500" size={16} />
      case "cancelled":
        return <XCircle className="text-red-500" size={16} />
      default:
        return <Clock className="text-orange-500" size={16} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-orange-100 text-orange-700"
    }
  }

  const filteredOrders = activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Your Orders</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-600">You haven't placed any orders yet.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt={order.restaurant}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800">{order.restaurant}</h3>
                            <p className="text-sm text-gray-600">Order #{order.id}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </Badge>
                        </div>

                        <div className="space-y-1 mb-3">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-sm text-gray-600">
                              • {item}
                            </p>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {order.date} • {order.time}
                          </div>
                          <div className="font-bold text-lg">₹{order.amount}</div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          {order.status === "delivered" && (
                            <>
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                Reorder
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                Rate Order
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
