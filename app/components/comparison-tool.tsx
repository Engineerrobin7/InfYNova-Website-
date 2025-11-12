"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export function ComparisonTool() {
  const [selectedCompetitor, setSelectedCompetitor] = useState("iphone");

  const competitors = {
    iphone: "iPhone 15 Pro",
    samsung: "Samsung S24 Ultra",
    oneplus: "OnePlus 12"
  };

  const features = [
    {
      category: "AI Features",
      items: [
        { name: "On-device AI", infynova: true, iphone: false, samsung: false, oneplus: false },
        { name: "AI Camera", infynova: true, iphone: true, samsung: true, oneplus: true },
        { name: "AI Assistant", infynova: true, iphone: true, samsung: true, oneplus: false },
        { name: "Predictive UI", infynova: true, iphone: false, samsung: false, oneplus: false }
      ]
    },
    {
      category: "Performance",
      items: [
        { name: "Processor", infynova: "Snapdragon 8 Gen 3", iphone: "A17 Pro", samsung: "Snapdragon 8 Gen 3", oneplus: "Snapdragon 8 Gen 3" },
        { name: "RAM", infynova: "12GB", iphone: "8GB", samsung: "12GB", oneplus: "16GB" },
        { name: "Storage", infynova: "256GB", iphone: "256GB", samsung: "256GB", oneplus: "256GB" },
        { name: "Battery", infynova: "5000mAh", iphone: "3274mAh", samsung: "5000mAh", oneplus: "5400mAh" }
      ]
    },
    {
      category: "Software",
      items: [
        { name: "OS", infynova: "NovaOS", iphone: "iOS 17", samsung: "One UI 6", oneplus: "OxygenOS 14" },
        { name: "Updates", infynova: "5 years", iphone: "5 years", samsung: "4 years", oneplus: "4 years" },
        { name: "Customization", infynova: true, iphone: false, samsung: true, oneplus: true },
        { name: "Bloatware", infynova: false, iphone: false, samsung: true, oneplus: true }
      ]
    },
    {
      category: "Price",
      items: [
        { name: "Starting Price", infynova: "₹39,999", iphone: "₹1,34,900", samsung: "₹1,29,999", oneplus: "₹64,999" },
        { name: "Value Score", infynova: "10/10", iphone: "6/10", samsung: "7/10", oneplus: "8/10" }
      ]
    }
  ];

  const renderValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-500 mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Compare InfyNova</h3>
        <div className="flex justify-center gap-2 flex-wrap">
          {Object.entries(competitors).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedCompetitor(key)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCompetitor === key
                  ? "bg-primary text-white"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left">Feature</th>
              <th className="p-4 text-center bg-primary/10">
                <div className="font-bold">InfyNova Pro</div>
                <div className="text-sm text-primary">₹39,999</div>
              </th>
              <th className="p-4 text-center">
                <div className="font-bold">{competitors[selectedCompetitor as keyof typeof competitors]}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((category, catIndex) => (
              <React.Fragment key={catIndex}>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="bg-muted/30"
                >
                  <td colSpan={3} className="p-3 font-semibold">
                    {category.category}
                  </td>
                </motion.tr>
                {category.items.map((item, itemIndex) => (
                  <motion.tr
                    key={itemIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: catIndex * 0.1 + itemIndex * 0.05 }}
                    className="border-b border-border hover:bg-muted/20"
                  >
                    <td className="p-4">{item.name}</td>
                    <td className="p-4 text-center bg-primary/5">
                      {renderValue(item.infynova)}
                    </td>
                    <td className="p-4 text-center">
                      {renderValue(item[selectedCompetitor as keyof typeof item])}
                    </td>
                  </motion.tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          * Prices and specifications as of November 2024. Subject to change.
        </p>
        <a
          href="/pre-order"
          className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
        >
          Pre-Order InfyNova Now
        </a>
      </div>
    </div>
  );
}
