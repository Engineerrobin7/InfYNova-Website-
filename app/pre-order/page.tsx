"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { Check, Sparkles, Gift, Truck, Shield } from "lucide-react";
import { ProductHuntBadge } from "../components/product-hunt-badge";
import { toast } from "sonner";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function PreOrderPage() {
  const [selectedModel, setSelectedModel] = useState("pro");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    model: "pro"
  });

  const [captchaLoaded, setCaptchaLoaded] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setCaptchaLoaded(true);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const models = {
    base: {
      name: "InfYNova",
      price: 29999,
      discountPrice: 24999,
      features: [
        "Snapdragon 8 Gen 2",
        "8GB RAM + 128GB Storage",
        "50MP AI Camera",
        "4500mAh Battery",
        "NovaOS Standard"
      ]
    },
    pro: {
      name: "InfYNova Pro",
      price: 44999,
      discountPrice: 39999,
      features: [
        "Snapdragon 8 Gen 3",
        "12GB RAM + 256GB Storage",
        "108MP AI Camera System",
        "5000mAh Battery",
        "NovaOS Premium (Free)"
      ]
    },
    ultra: {
      name: "InfYNova Ultra",
      price: 64999,
      discountPrice: 59999,
      features: [
        "Snapdragon 8 Gen 3+",
        "16GB RAM + 512GB Storage",
        "200MP AI Camera Pro",
        "5500mAh Battery",
        "NovaOS Premium+ (Free)"
      ]
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const loadRazorpayScript = async () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if ((window as any).Razorpay) {
      return true;
    }

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (payload: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    preOrderId: string;
    email: string;
    name: string;
    modelName: string;
    price: number;
  }) => {
    const response = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return response.json();
  };

  const openRazorpayCheckout = async (order: any, preOrderId: string) => {
    if (typeof window === 'undefined') {
      throw new Error('Browser environment required');
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Unable to load Razorpay checkout');
    }

    return new Promise<void>((resolve, reject) => {
      const Razorpay = (window as any).Razorpay;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'InfYNova',
        description: `Pre-order ${models[selectedModel as keyof typeof models].name}`,
        image: '/logo.svg',
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#005f73',
        },
        handler: async (response: any) => {
          try {
            setPaymentLoading(true);
            const result = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              preOrderId,
              email: formData.email,
              name: formData.name,
              modelName: models[selectedModel as keyof typeof models].name,
              price: models[selectedModel as keyof typeof models].discountPrice,
            });

            if (result.success) {
              toast.success('Payment confirmed! We have emailed your receipt.');
              resolve();
            } else {
              toast.error('Payment verification failed. Please contact support.');
              reject(new Error(result.error || 'Verification failed'));
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification error. Please try again.');
            reject(error);
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment was cancelled'));
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let captchaToken = '';
      
      // Get reCAPTCHA token if available
      if (captchaLoaded && window.grecaptcha) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (siteKey) {
          captchaToken = await window.grecaptcha.execute(siteKey, { action: 'pre_order' });
        }
      }

      const response = await fetch('/api/pre-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
          honeypot: '',
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Track pre-order with GTM
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'pre_order',
            ecommerce: {
              items: [{
                item_name: data.data.model,
                item_id: formData.model,
                price: data.data.price,
                currency: 'INR',
                quantity: 1
              }]
            }
          });
        }

        const razorpayEnabled = Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

        if (razorpayEnabled) {
          try {
            const paymentResponse = await fetch('/api/payment/create-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: data.data.price,
                currency: 'INR',
                receipt: data.orderId,
                name: formData.name,
                email: formData.email,
                contact: formData.phone,
                notes: {
                  model: data.data.model,
                },
              }),
            });

            const paymentData = await paymentResponse.json();
            if (paymentData.success && paymentData.order) {
              await openRazorpayCheckout(paymentData.order, data.orderId);
            } else {
              toast.success("Pre-order Submitted!", {
                description: `Order #${data.orderNumber}. Check your email for confirmation.`,
                duration: 5000,
              });
              console.error('Razorpay create order failed:', paymentData.error);
            }
          } catch (paymentError) {
            console.error('Razorpay checkout error:', paymentError);
            toast.error('Payment not completed. Your order is saved and we will follow up by email.');
          }
        } else {
          toast.success("Pre-order Submitted!", {
            description: `Order #${data.orderNumber}. Check your email for confirmation.`,
            duration: 5000,
          });
        }

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          model: "pro"
        });
      } else {
        toast.error("Submission Failed", {
          description: data.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error('Pre-order error:', error);
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 text-foreground tracking-tight">
              Pre-Order InfY<span className="text-primary italic">Nova</span>
            </h1>
            <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
              Secure your place in the next evolution of mobile intelligence. <br className="hidden md:block" /> India's first AI-native smartphone.
            </p>
            
            {/* Early Bird Offer Banner - Updated to Lime/Blue */}
            <div className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(184,252,60,0.3)] border border-accent/50 animate-pulse">
              <Gift className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm">Early Bird: Save ₹5,000 + Global Priority</span>
            </div>
          </motion.div>

          {/* Product Hunt Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              🏆 Featured on Product Hunt
            </p>
            <ProductHuntBadge />
          </motion.div>

          {/* Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Gift, title: "₹5,000 Off", desc: "Limited time offer" },
              { icon: Sparkles, title: "Free Premium", desc: "NovaOS Premium included" },
              { icon: Truck, title: "Priority Delivery", desc: "Get it first" },
              { icon: Shield, title: "2 Year Warranty", desc: "Extended protection" }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <benefit.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Model Selection */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Choose Your Model</h2>
              <div className="space-y-4">
                {Object.entries(models).map(([key, model]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedModel(key);
                      setFormData({ ...formData, model: key });
                    }}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedModel === key
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{model.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-2xl font-bold text-primary">
                            ₹{model.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-lg text-muted-foreground line-through">
                            ₹{model.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {selectedModel === key && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {model.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pre-Order Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                    rows={3}
                    placeholder="Enter your complete address"
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-card border border-border rounded-xl p-6 mt-6">
                  <h3 className="font-bold mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="font-semibold">{models[selectedModel as keyof typeof models].name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span className="line-through text-muted-foreground">
                        ₹{models[selectedModel as keyof typeof models].price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-primary">
                      <span>Early Bird Discount:</span>
                      <span>-₹5,000</span>
                    </div>
                    <div className="flex justify-between text-primary">
                      <span>NovaOS Premium:</span>
                      <span>Free (₹2,999 value)</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary">
                          ₹{models[selectedModel as keyof typeof models].discountPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || paymentLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting || paymentLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {paymentLoading ? 'Processing Payment...' : 'Submitting...'}
                    </span>
                  ) : (
                    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Pay Securely Now' : 'Complete Pre-Order'
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  By pre-ordering, you agree to our terms and conditions. {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Secure payment powered by Razorpay.' : 'No payment required now. Pay on delivery.'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
