"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { clsx } from "clsx";
import { createProductAction, deleteProductAction, type ProductActionState, updateProductAction } from "@/app/admin/products/actions";
import { formatCurrency } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;
const initialState: ProductActionState = { success: false };

export type AdminProduct = {
    id: string;
    name: string;
    description: string | null;
    sizes: string | null;
    features: string | null;
    category_id: string;
    category_name: string;
    price_type: "Factory" | "FOB" | null;
    price_value: number | null;
    factory_price_value: number | null;
    fob_price_value: number | null;
    image_url: string | null;
    created_at: string;
};

export type AdminCategoryOption = {
    id: string;
    name: string;
};

type ModalBaseProps = {
    open: boolean;
    onClose: () => void;
};

type ProductModalProps = ModalBaseProps & {
    product?: AdminProduct | null;
    categories: AdminCategoryOption[];
};

function ProductModal({ open, onClose, product, categories }: ProductModalProps) {
    const isEdit = Boolean(product);
    const action = isEdit ? updateProductAction : createProductAction;
    const [state, formAction] = useFormState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onClose();
        }
    }, [state.success, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm overflow-y-auto">
            <form
                action={formAction}
                encType="multipart/form-data"
                className="w-full max-w-3xl space-y-6 rounded-[2.5rem] border border-brand-primary/15 bg-white/95 p-8 shadow-2xl shadow-brand-primary/20"
            >
                {isEdit ? <input type="hidden" name="id" defaultValue={product?.id} /> : null}
                <header className="space-y-1">
                    <h2 className="font-heading text-2xl font-semibold text-slate-900">
                        {isEdit ? "Edit product" : "Add product"}
                    </h2>
                    <p className="text-sm text-slate-600">
                        {isEdit ? "Update product details and pricing." : "Create a new product entry with imagery and pricing."}
                    </p>
                </header>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-name">
                            Name
                        </label>
                        <input
                            id="product-name"
                            name="name"
                            required
                            defaultValue={product?.name ?? ""}
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-category">
                            Category
                        </label>
                        <select
                            id="product-category"
                            name="categoryId"
                            required
                            defaultValue={product?.category_id ?? ""}
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="product-description">
                        Description
                    </label>
                    <textarea
                        id="product-description"
                        name="description"
                        rows={3}
                        defaultValue={product?.description ?? ""}
                        className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-sizes">
                            Sizes / Variants
                        </label>
                        <textarea
                            id="product-sizes"
                            name="sizes"
                            rows={3}
                            defaultValue={product?.sizes ?? ""}
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-features">
                            Features (one per line)
                        </label>
                        <textarea
                            id="product-features"
                            name="features"
                            rows={3}
                            defaultValue={product?.features ?? ""}
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-price-type">
                            Default price type
                        </label>
                        <select
                            id="product-price-type"
                            name="priceType"
                            defaultValue={product?.price_type ?? "Factory"}
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        >
                            <option value="Factory">Factory</option>
                            <option value="FOB">FOB</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-price-value">
                            Default price value (PKR)
                        </label>
                        <input
                            id="product-price-value"
                            name="priceValue"
                            type="number"
                            min="0"
                            step="1"
                            defaultValue={product?.price_value ?? ""}
                            placeholder="5000"
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-price-factory">
                            Factory price (PKR)
                        </label>
                        <input
                            id="product-price-factory"
                            name="factoryPriceValue"
                            type="number"
                            min="0"
                            step="1"
                            defaultValue={product?.factory_price_value ?? ""}
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="product-price-fob">
                            FOB price (PKR)
                        </label>
                        <input
                            id="product-price-fob"
                            name="fobPriceValue"
                            type="number"
                            min="0"
                            step="1"
                            defaultValue={product?.fob_price_value ?? ""}
                            className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="product-image">
                        Image
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                        <input
                            id="product-image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="w-full rounded-2xl border border-dashed border-brand-primary/30 bg-white px-4 py-3 text-sm shadow-sm file:mr-4 file:rounded-full file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-brand-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 sm:w-auto"
                        />
                        {product?.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-2xl border border-brand-primary/20 object-cover"
                            />
                        ) : null}
                    </div>
                    <p className="text-xs text-slate-500">Recommended 800×600 JPEG or PNG. Uploading a new image will replace the existing one.</p>
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
                        className="rounded-full bg-brand-primary px-6 py-2 text-sm font-semibold text-white shadow-md shadow-brand-primary/30 transition hover:bg-brand-dark"
                    >
                        {isEdit ? "Save changes" : "Create product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

type DeleteProductModalProps = ModalBaseProps & {
    product?: AdminProduct | null;
};

function DeleteProductModal({ open, onClose, product }: DeleteProductModalProps) {
    const [state, formAction] = useFormState(deleteProductAction, initialState);

    useEffect(() => {
        if (state.success) {
            onClose();
        }
    }, [state.success, onClose]);

    if (!open || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm">
            <form
                action={formAction}
                className="w-full max-w-lg space-y-6 rounded-[2rem] border border-brand-primary/15 bg-white/95 p-8 shadow-2xl shadow-brand-primary/20"
            >
                <input type="hidden" name="id" value={product.id} />
                <div className="space-y-3 text-center">
                    <h2 className="font-heading text-2xl font-semibold text-slate-900">Delete product?</h2>
                    <p className="text-sm text-slate-600">
                        This will permanently remove <span className="font-semibold text-brand-dark">{product.name}</span>.
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

export function ProductsClient({ products, categories }: { products: AdminProduct[]; categories: AdminCategoryOption[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [modalProduct, setModalProduct] = useState<AdminProduct | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<AdminProduct | null>(null);
    const [showCreate, setShowCreate] = useState(false);

    const filtered = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return products;
        return products.filter((product) => {
            const tokens = [product.name, product.category_name, product.description ?? ""];
            return tokens.some((token) => token.toLowerCase().includes(keyword));
        });
    }, [products, search]);

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
                    <h1 className="font-heading text-2xl font-semibold text-slate-900">Products</h1>
                    <p className="text-sm text-slate-600">Manage the Artisan Cookware product catalogue and pricing.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setShowCreate(true)}
                    className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-primary/30 transition hover:bg-brand-dark"
                >
                    Add product
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-brand-primary/15 bg-white/80 p-4 shadow-lg shadow-brand-primary/10">
                <input
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 sm:w-80"
                />
                <div className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-brand-dark">{paginated.length}</span> of {filtered.length} products
                </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-brand-primary/15 bg-white/95 shadow-lg shadow-brand-primary/10">
                <table className="min-w-full divide-y divide-brand-primary/15 text-left text-sm text-slate-600">
                    <thead className="bg-brand-light/50 text-xs uppercase tracking-[0.3em] text-brand-dark">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Product</th>
                            <th className="px-6 py-4 font-semibold">Category</th>
                            <th className="px-6 py-4 font-semibold">Factory / FOB</th>
                            <th className="px-6 py-4 font-semibold">Updated</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-primary/10">
                        {paginated.length ? (
                            paginated.map((product) => (
                                <tr key={product.id} className="group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {product.image_url ? (
                                                <Image
                                                    src={product.image_url}
                                                    alt={product.name}
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
                                                <p className="font-semibold text-slate-900">{product.name}</p>
                                                <p className="text-xs text-slate-500 line-clamp-2">{product.description ?? "No description"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-brand-dark">{product.category_name}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-brand-dark">Factory: {formatCurrency(product.factory_price_value) ?? "—"}</span>
                                            <span className="text-slate-500">FOB: {formatCurrency(product.fob_price_value) ?? "—"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-brand-dark/70">
                                        {new Date(product.created_at).toLocaleDateString("en-PK", {
                                            dateStyle: "medium"
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setModalProduct(product)}
                                                className="rounded-full border border-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-dark transition hover:border-brand-primary hover:bg-brand-light/80"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteProduct(product)}
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
                                <td colSpan={5} className="px-6 py-6 text-center text-sm text-slate-500">
                                    No products found.
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

            <ProductModal open={showCreate} onClose={() => setShowCreate(false)} categories={categories} />
            <ProductModal open={Boolean(modalProduct)} onClose={() => setModalProduct(null)} product={modalProduct ?? undefined} categories={categories} />
            <DeleteProductModal open={Boolean(deleteProduct)} onClose={() => setDeleteProduct(null)} product={deleteProduct ?? undefined} />
        </div>
    );
}
