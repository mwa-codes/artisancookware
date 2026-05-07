import { ChartBar, Boxes, Package, Layers, MessagesSquare } from "lucide-react";

export const adminNavigation = [
    { name: "Dashboard", href: "/admin", icon: ChartBar },
    { name: "Categories", href: "/admin/categories", icon: Boxes },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Variants", href: "/admin/variants", icon: Layers },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessagesSquare }
];
