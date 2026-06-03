import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiShoppingBagLine, RiDownloadLine,
  RiFileShieldLine, RiTimeLine, RiTruckLine, RiCheckboxCircleLine
} from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_ORDERS = [
  {
    uuid: "mat-order-a2d9b4c7",
    status: "pending",
    createdAt: "2026-05-31T09:15:00Z",
    motto: "BREATHE & FLOW",
    lineStyle: "Solid",
    measurements: "fm1: 42cm | fm5: 175cm | fm6: 78cm"
  },
  {
    uuid: "mat-order-18c7e4a9",
    status: "shipped",
    createdAt: "2026-05-24T14:22:00Z",
    motto: "BE HERE NOW",
    lineStyle: "Border",
    measurements: "fm1: 39cm | fm5: 164cm | fm6: 72cm"
  },
  {
    uuid: "mat-order-f5a6b7d2",
    status: "completed",
    createdAt: "2026-05-10T11:05:00Z",
    motto: "STRENGTH & GRACE",
    lineStyle: "Solid",
    measurements: "fm1: 45cm | fm5: 182cm | fm6: 83cm"
  }
];

export default function MatOrdersPage() {
  const [orders] = useState(MOCK_ORDERS);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-700 border-amber-200 gap-1 rounded-md font-bold px-2 py-0.5">
            <RiTimeLine className="size-3" /> Pending Customization
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-700 border-blue-200 gap-1 rounded-md font-bold px-2 py-0.5">
            <RiFileShieldLine className="size-3" /> In Production
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-purple-100 hover:bg-purple-100 text-purple-700 border-purple-200 gap-1 rounded-md font-bold px-2 py-0.5">
            <RiTruckLine className="size-3" /> Shipped & Transit
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-100 hover:bg-emerald-100 text-emerald-700 border-emerald-200 gap-1 rounded-md font-bold px-2 py-0.5">
            <RiCheckboxCircleLine className="size-3" /> Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDownloadSVG = (uuid) => {
    alert(`Downloading Mat Alignment blueprint SVG for order ${uuid}...`);
  };

  return (
    <div className="bg-background min-h-screen py-30 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border/60 pb-5">
          <span className="text-brand font-bold text-xs uppercase tracking-widest">My Account</span>
          <h1 className="text-3xl font-extrabold text-foreground mt-1 flex items-center gap-2">
            <RiShoppingBagLine /> My Mat Orders
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Review manufacturing status, motto engravings, and download alignment blueprints.</p>
        </div>

        {/* List of Custom Orders */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <motion.div
                key={order.uuid}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-background border border-border rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:shadow-md hover:border-border/50"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-extrabold text-foreground text-sm md:text-base">
                      Order: <span className="font-mono text-muted-foreground">{order.uuid.substring(10)}</span>
                    </span>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-xs font-medium text-muted-foreground border-t border-border pt-3">
                    <div>
                      <span className="text-muted-foreground">Order Date:</span>{" "}
                      <span className="text-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Engraved Motto:</span>{" "}
                      <span className="text-foreground font-serif italic">"{order.motto}"</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Line Guide:</span>{" "}
                      <span className="text-foreground">{order.lineStyle} Line</span>
                    </div>
                    <div className="sm:col-span-2 md:col-span-3">
                      <span className="text-muted-foreground">Anatomical Specs:</span>{" "}
                      <span className="text-muted-foreground font-mono">{order.measurements}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {(order.status === "completed" || order.status === "shipped") ? (
                    <Button
                      onClick={() => handleDownloadSVG(order.uuid)}
                      className="w-full sm:w-auto bg-card hover:bg-card text-foreground font-bold h-10 px-4 rounded-xl gap-2 cursor-pointer shadow-sm"
                    >
                      <RiDownloadLine className="size-4" /> Download SVG
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground font-medium px-4 py-2 bg-background rounded-xl border border-border">
                      Processing blueprint...
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-background border border-border rounded-3xl p-16 text-center shadow-sm">
            <div className="text-muted-foreground text-5xl mb-4">🛒</div>
            <h3 className="text-lg font-bold text-foreground">No mat orders placed</h3>
            <p className="text-muted-foreground text-sm mt-1">Get custom fit alignment lines by creating a personalized yoga mat today.</p>
            <Button asChild className="bg-brand hover:bg-brand-light mt-6 font-semibold rounded-xl text-white">
              <Link to="/mat/info">Custom Mat Details</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
