import { CheckCircle } from "lucide-react";

type HighlightListProps = {
    items: string[];
};

export function HighlightList({ items }: HighlightListProps) {
    if (!items.length) return null;
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
