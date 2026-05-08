"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import {
    createVariantAction,
    deleteVariantAction,
    type VariantActionState,
    updateVariantAction
} from "@/app/admin/variants/actions";
import { Toast, useToast } from "@/components/admin/Toast";

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
    onClose: (success?: boolean) => void;
};

type VariantModalProps = ModalBaseProps & {
    variant?: AdminVariant | null;
    products: AdminProductOption[];
};

function VariantModal({ open, onClose, variant, products }: VariantModalProps) {
    const isEdit = Boolean(variant);
    const action = isEdit ? updateVariantAction : createVariantAction;
    const [state, formAction] = useFormState(action, initialState);
    const wasSuccessful = useRef(false);

    useEffect(() => {
        if (state.success && !wasSuccessful.current) {
            onClose(true);
        }
        wasSuccessful.current = state.success;
    }, [state.success, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 py-6 backdrop-blur-sm">
            <form action={formAction} encType="multipart/form-data" className="w-full max-w-xl bg-white shadow-xl rounded-[2px] border border-ink-20 p-8">
                {isEdit ? <input type="hidden" name="id" defaultValue={variant?.id} /> : null}
                <header className="space-y-1 mb-6">
                    <h2 className="font-heading text-xl font-light text-ink">{isEdit ? "Edit variant" : "Add variant"}</h2>
                    <p className="text-sm text-ink-60">{isEdit ? "Update variant information." : "Create a new product variant."}</p>
                </header>
                <div className="space-y-4">
                    <div>
                        <label className="admin-label" htmlFor="variant-product">
                            Product
                        </label>
                        <select
                            id="variant-product"
                            name="productId"
                            required
                            defaultValue={variant?.product_id ?? ""}
                            className="admin-select"
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
                    <div>
                        <label className="admin-label" htmlFor="variant-color">
                            Color name
                        </label>
                        <input
                            id="variant-color"
                            name="colorName"
                            required
                            defaultValue={variant?.color_name ?? ""}
                            className="admin-input"
                        />
                    </div>
                    <div>
                        <label className="admin-label" htmlFor="variant-image">
                            Image
                        </label>
                        <div className="flex items-center gap-4 flex-wrap">
                            <input
                                id="variant-image"
                                name="image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="block w-full text-sm text-ink-60 file:mr-3 file:border file:border-ink-20 file:bg-parchment file:px-3 file:py-1.5 file:text-xs file:font-medium file:uppercase file:text-ink file:cursor-pointer rounded-[2px] sm:flex-1"
                            />
                            {variant?.image_url ? (
                                <Image
                                    src={variant.image_url}
                                    alt={variant.color_name}
                                    width={56}
                                    height={56}
                                    className="h-14 w-14 object-cover border border-ink-20 rounded-[2px]"
                                />
                            ) : null}
                        </div>
                        <p className="text-xs text-ink-60 mt-1">Optional. Uploading a new image will replace the current variant image.</p>
                    </div>
                </div>
                {state.error ? <p className="text-sm text-red-600 mt-4">{state.error}</p> : null}
                <div className="flex flex-wrap items-center justify-end gap-3 mt-8">
                    <button type="button" onClick={() => onClose()} className="admin-btn-outline">
                        Cancel
                    </button>
                    <button type="submit" className="admin-btn-primary">
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
    const wasSuccessful = useRef(false);

    useEffect(() => {
        if (state.success && !wasSuccessful.current) {
            onClose(true);
        }
        wasSuccessful.current = state.success;
    }, [state.success, onClose]);

    if (!open || !variant) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 py-6 backdrop-blur-sm">
            <form action={formAction} className="w-full max-w-md bg-white shadow-xl rounded-[2px] border border-ink-20 p-8">
                <input type="hidden" name="id" value={variant.id} />
                <div className="space-y-3 text-center">
                    <h2 className="font-heading text-xl font-light text-ink">Delete variant?</h2>
                    <p className="text-sm text-ink-60">
                        This will remove <span className="font-semibold text-ink">{variant.color_name}</span> for {variant.product_name}.
                    </p>
                </div>
                {state.error ? <p className="text-sm text-red-600 mt-4">{state.error}</p> : null}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <button type="button" onClick={() => onClose()} className="admin-btn-outline">
                        Cancel
                    </button>
                    <button type="submit" className="admin-btn-danger">
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}

export function VariantsClient({ variants, products }: { variants: AdminVariant[]; products: AdminProductOption[] }) {
    const router = useRouter();
    const { toast, showToast, dismissToast } = useToast();
    const [rows, setRows] = useState(variants);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [showCreate, setShowCreate] = useState(false);
    const [editingVariant, setEditingVariant] = useState<AdminVariant | null>(null);
    const [deletingVariant, setDeletingVariant] = useState<AdminVariant | null>(null);

    useEffect(() => {
        setRows(variants);
    }, [variants]);

    const filtered = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return rows;
        return rows.filter((variant) =>
            [variant.color_name, variant.product_name].some((field) => field.toLowerCase().includes(keyword))
        );
    }, [rows, search]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const currentPage = Math.min(page, pageCount - 1);
    const paginated = filtered.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    useEffect(() => {
        setPage(0);
    }, [search]);

    return (
        <div className="space-y-6 w-full">
            <div className="flex items-center justify-between">
                <p className="text-sm text-ink-60">
                    {rows.length} variant{rows.length !== 1 ? "s" : ""} total
                </p>
                <button type="button" onClick={() => setShowCreate(true)} className="admin-btn-primary">
                    Add variant
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border border-ink-20 bg-white p-4 rounded-[2px] shadow-card">
                <input
                    type="search"
                    placeholder="Search variants..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="admin-input sm:w-80"
                />
                <div className="text-sm text-ink-60">
                    Showing <span className="font-semibold text-ink">{paginated.length}</span> of {filtered.length} variants
                </div>
            </div>

            <div className="overflow-hidden border border-ink-20 bg-white rounded-[2px] shadow-card">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-ink-20 text-left text-sm text-ink-60">
                    <thead className="bg-parchment text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-60">
                        <tr>
                            <th className="px-6 py-4">Variant</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Created</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-20">
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
                                                    className="h-12 w-12 object-cover border border-ink-20 rounded-[2px]"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center border border-dashed border-ink-20 text-[10px] uppercase tracking-[0.08em] text-ink-60 rounded-[2px]">
                                                    IMG
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-ink">{variant.color_name}</p>
                                                <p className="text-xs text-ink-60">Variant ID: {variant.id.slice(0, 8)}…</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-ink">{variant.product_name}</td>
                                    <td className="px-6 py-4 text-xs text-ink-60">
                                        {new Date(variant.created_at).toLocaleDateString("en-PK", {
                                            dateStyle: "medium"
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingVariant(variant)}
                                                className="admin-btn-outline py-1.5 px-3 text-[11px]"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingVariant(variant)}
                                                className="admin-btn-danger py-1.5 px-3 text-[11px]"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-6 text-center text-sm text-ink-60">
                                    No variants found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-ink-60">
                    Page <span className="font-semibold text-ink">{currentPage + 1}</span> of {pageCount}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className={clsx(
                            "admin-btn-outline",
                            currentPage === 0 && "cursor-not-allowed opacity-50 pointer-events-none"
                        )}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.min(pageCount - 1, prev + 1))}
                        disabled={currentPage >= pageCount - 1}
                        className={clsx(
                            "admin-btn-outline",
                            currentPage >= pageCount - 1 && "cursor-not-allowed opacity-50 pointer-events-none"
                        )}
                    >
                        Next
                    </button>
                </div>
            </div>

            <VariantModal
                key={showCreate ? "create-open" : "create-closed"}
                open={showCreate}
                onClose={(success) => {
                    setShowCreate(false);
                    if (success) {
                        router.refresh();
                        showToast("Variant created successfully.");
                    }
                }}
                products={products}
            />
            <VariantModal
                key={editingVariant?.id ?? "edit-none"}
                open={Boolean(editingVariant)}
                onClose={(success) => {
                    setEditingVariant(null);
                    if (success) {
                        router.refresh();
                        showToast("Variant updated successfully.");
                    }
                }}
                variant={editingVariant ?? undefined}
                products={products}
            />
            <DeleteVariantModal
                key={deletingVariant?.id ?? "delete-none"}
                open={Boolean(deletingVariant)}
                onClose={(success) => {
                    const deletedId = deletingVariant?.id;
                    setDeletingVariant(null);
                    if (success && deletedId) {
                        setRows((prev) => prev.filter((variant) => variant.id !== deletedId));
                        router.refresh();
                        showToast("Variant deleted successfully.");
                    }
                }}
                variant={deletingVariant ?? undefined}
            />
            {toast ? <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} /> : null}
        </div>
    );
}
