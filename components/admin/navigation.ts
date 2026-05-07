import { Boxes, ChartBar, DollarSign, Layers, MessagesSquare, Package } from "lucide-react";

export const adminNavigation = [
    { name: "Dashboard", href: "/admin", icon: ChartBar },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Boxes },
    { name: "Variants", href: "/admin/variants", icon: Layers },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessagesSquare },
    { name: "Currency", href: "/admin/currency", icon: DollarSign }
];
