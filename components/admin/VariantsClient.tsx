"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { clsx } from "clsx";
import {
    createVariantAction,
    deleteVariantAction,
    type VariantActionState,
    updateVariantAction
} from "@/app/admin/variants/actions";

const ITEMS_PER_PAGE = 8;
const initialState: VariantActionState = { success: false };

export type AdminVariant = {
    id: string;
    product_id: string;
    product_name: string;
    color_name: string;
    image_url: string | null;
    created_at: string;
};

export type AdminProductOption = {
    id: string;
    name: string;
};

type ModalBaseProps = {
    open: boolean;
    onClose: () => void;
};

type VariantModalProps = ModalBaseProps & {
    variant?: AdminVariant | null;
    products: AdminProductOption[];
};

function VariantModal({ open, onClose, variant, products }: VariantModalProps) {
    const isEdit = Boolean(variant);
    const action = isEdit ? updateVariantAction : createVariantAction;
    const [state, formAction] = useFormState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onClose();
        }
    }, [state.success, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm">
            <form
                action={formAction}
                encType="multipart/form-data"
                className="w-full max-w-xl space-y-6 rounded-[2rem] border border-brand-primary/15 bg-white/95 p-8 shadow-2xl shadow-brand-primary/20"
            >
                {isEdit ? <input type="hidden" name="id" defaultValue={variant?.id} /> : null}
                <header className="space-y-1">
                    <h2 className="font-heading text-2xl font-semibold text-slate-900">
                        {isEdit ? "Edit variant" : "Add variant"}
                    </h2>
                    <p className="text-sm text-slate-600">
                        {isEdit ? "Update variant information." : "Create a new product variant."}
                    </p>
                </header>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="variant-product">
                        Product
                    </label>
                    <select
                        id="variant-product"
                        name="productId"
                        required
                        defaultValue={variant?.product_id ?? ""}
                        className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    >
                        <option value="" disabled>
                            Select a product
                        </option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="variant-color">
                        Color name
                    </label>
                    <input
                        id="variant-color"
                        name="colorName"
                        required
                        defaultValue={variant?.color_name ?? ""}
                        className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="variant-image">
                        Image
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            id="variant-image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="w-full rounded-2xl border border-dashed border-brand-primary/30 bg-white px-4 py-3 text-sm shadow-sm file:mr-4 file:rounded-full file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-brand-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 sm:w-auto"
                        />
                        {variant?.image_url ? (
                            <Image
                                src={variant.image_url}
                                alt={variant.color_name}
                                width={56}
                                height={56}
                                className="h-14 w-14 rounded-2xl border border-brand-primary/20 object-cover"
                            />
                        ) : null}
                    </div>
                    <p className="text-xs text-slate-500">Optional. Uploading a new image will replace the current variant image.</p>
                </div>
                {state.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}
                <div className="flex flex-wrap items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-brand-primary/20 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:border-brand-primary hover:bg-brand-light/80"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-primary/30 transition hover:bg-brand-dark"
                    >
                        {isEdit ? "Save changes" : "Create variant"}
                    </button>
                </div>
            </form>
        </div>
    );
}

type DeleteVariantModalProps = ModalBaseProps & {
    variant?: AdminVariant | null;
};

function DeleteVariantModal({ open, onClose, variant }: DeleteVariantModalProps) {
    const [state, formAction] = useFormState(deleteVariantAction, initialState);

    useEffect(() => {
        if (state.success) {
            onClose();
        }
    }, [state.success, onClose]);

    if (!open || !variant) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm">
            <form
                action={formAction}
                className="w-full max-w-md space-y-6 rounded-[2rem] border border-brand-primary/15 bg-white/95 p-8 shadow-2xl shadow-brand-primary/20"
            >
                <input type="hidden" name="id" value={variant.id} />
                <div className="space-y-3 text-center">
                    <h2 className="font-heading text-2xl font-semibold text-slate-900">Delete variant?</h2>
                    <p className="text-sm text-slate-600">
                        This will remove <span className="font-semibold text-brand-dark">{variant.color_name}</span> for {variant.product_name}.
                    </p>
                </div>
                {state.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-brand-primary/20 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:border-brand-primary hover:bg-brand-light/80"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-rose-500/30 transition hover:bg-rose-600"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}

export function VariantsClient({ variants, products }: { variants: AdminVariant[]; products: AdminProductOption[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [showCreate, setShowCreate] = useState(false);
    const [editingVariant, setEditingVariant] = useState<AdminVariant | null>(null);
    const [deletingVariant, setDeletingVariant] = useState<AdminVariant | null>(null);

    const filtered = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return variants;
        return variants.filter((variant) =>
            [variant.color_name, variant.product_name].some((field) => field.toLowerCase().includes(keyword))
        );
    }, [variants, search]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const currentPage = Math.min(page, pageCount - 1);
    const paginated = filtered.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    useEffect(() => {
        setPage(0);
    }, [search]);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-semibold text-slate-900">Variants</h1>
                    <p className="text-sm text-slate-600">Create colourways and imagery for each product.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setShowCreate(true)}
                    className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-primary/30 transition hover:bg-brand-dark"
                >
                    Add variant
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-brand-primary/15 bg-white/80 p-4 shadow-lg shadow-brand-primary/10">
                <input
                    type="search"
                    placeholder="Search variants..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 sm:w-80"
                />
                <div className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-brand-dark">{paginated.length}</span> of {filtered.length} variants
                </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-brand-primary/15 bg-white/95 shadow-lg shadow-brand-primary/10">
                <table className="min-w-full divide-y divide-brand-primary/15 text-left text-sm text-slate-600">
                    <thead className="bg-brand-light/50 text-xs uppercase tracking-[0.3em] text-brand-dark">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Variant</th>
                            <th className="px-6 py-4 font-semibold">Product</th>
                            <th className="px-6 py-4 font-semibold">Created</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-primary/10">
                        {paginated.length ? (
                            paginated.map((variant) => (
                                <tr key={variant.id} className="group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {variant.image_url ? (
                                                <Image
                                                    src={variant.image_url}
                                                    alt={variant.color_name}
                                                    width={48}
                                                    height={48}
                                                    className="h-12 w-12 rounded-2xl border border-brand-primary/20 object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-brand-primary/30 text-[10px] uppercase tracking-[0.3em] text-brand-dark">
                                                    IMG
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-900">{variant.color_name}</p>
                                                <p className="text-xs text-slate-500">Variant ID: {variant.id.slice(0, 8)}…</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-brand-dark">{variant.product_name}</td>
                                    <td className="px-6 py-4 text-xs text-brand-dark/70">
                                        {new Date(variant.created_at).toLocaleDateString("en-PK", {
                                            dateStyle: "medium"
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingVariant(variant)}
                                                className="rounded-full border border-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-dark transition hover:border-brand-primary hover:bg-brand-light/80"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingVariant(variant)}
                                                className="rounded-full border border-rose-400/40 px-3 py-1 text-xs font-semibold text-rose-500 transition hover:border-rose-500 hover:bg-rose-500/10"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-6 text-center text-sm text-slate-500">
                                    No variants found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-600">
                    Page <span className="font-semibold text-brand-dark">{currentPage + 1}</span> of {pageCount}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className={clsx(
                            "rounded-full border border-brand-primary/20 px-4 py-2 text-sm font-semibold transition",
                            currentPage === 0
                                ? "cursor-not-allowed opacity-50"
                                : "text-brand-dark hover:border-brand-primary hover:bg-brand-light/80"
                        )}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.min(pageCount - 1, prev + 1))}
                        disabled={currentPage >= pageCount - 1}
                        className={clsx(
                            "rounded-full border border-brand-primary/20 px-4 py-2 text-sm font-semibold transition",
                            currentPage >= pageCount - 1
                                ? "cursor-not-allowed opacity-50"
                                : "text-brand-dark hover:border-brand-primary hover:bg-brand-light/80"
                        )}
                    >
                        Next
                    </button>
                </div>
            </div>

            <VariantModal open={showCreate} onClose={() => setShowCreate(false)} products={products} />
            <VariantModal open={Boolean(editingVariant)} onClose={() => setEditingVariant(null)} variant={editingVariant ?? undefined} products={products} />
            <DeleteVariantModal open={Boolean(deletingVariant)} onClose={() => setDeletingVariant(null)} variant={deletingVariant ?? undefined} />
        </div>
    );
}
