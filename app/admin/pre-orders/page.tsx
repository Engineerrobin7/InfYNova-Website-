"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  CheckCircle, 
  XCircle, 
  Clock,
  Truck,
  Mail,
  Phone,
  MapPin,
  Filter,
  RefreshCw,
  Download,
  Search
} from "lucide-react";
import { toast } from "sonner";

interface PreOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  model: string;
  modelName: string;
  price: number;
  originalPrice: number;
  status: string;
  paymentStatus: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPreOrdersPage() {
  const [orders, setOrders] = useState<PreOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'shipped'>('all');
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an admin-only endpoint
      // For now, we'll show a message
      toast.info("Admin Dashboard", {
        description: "Connect to Firebase to view pre-orders"
      });
      setOrders([]);
    } catch (error) {
      console.error('Load orders error:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const searchByEmail = async () => {
    if (!searchEmail) {
      toast.error('Please enter an email');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/pre-order?email=${encodeURIComponent(searchEmail)}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        toast.success(`Found ${data.count} order(s)`);
      } else {
        toast.error(data.error || 'Failed to search');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    // TODO: Implement status update API
    toast.info('Status Update', {
      description: 'This feature requires admin authentication'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.price, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'confirmed': return 'text-blue-500 bg-blue-500/10';
      case 'shipped': return 'text-purple-500 bg-purple-500/10';
      case 'delivered': return 'text-green-500 bg-green-500/10';
      case 'cancelled': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Pre-Orders</h1>
              <p className="text-muted-foreground">Manage customer pre-orders</p>
            </div>
            <button
              onClick={loadOrders}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: stats.total, icon: Package, color: 'text-blue-500' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-500' },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-green-500' },
            { label: 'Shipped', value: stats.shipped, icon: Truck, color: 'text-purple-500' },
            { label: 'Revenue', value: `₹${(stats.totalRevenue / 1000).toFixed(0)}K`, icon: Package, color: 'text-emerald-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2 flex-1 min-w-[300px]">
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Search by email..."
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
              onKeyPress={(e) => e.key === 'Enter' && searchByEmail()}
            />
            <button
              onClick={searchByEmail}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            {['all', 'pending', 'confirmed', 'shipped'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border hover:bg-muted'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No orders found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching by email or check back later
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{order.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ₹{order.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground line-through">
                          ₹{order.originalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{order.modelName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${order.email}`} className="text-primary hover:underline">
                          {order.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${order.phone}`} className="text-primary hover:underline">
                          {order.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{order.address}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 lg:w-48">
                    <button
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-semibold"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm font-semibold"
                    >
                      Mark Shipped
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
