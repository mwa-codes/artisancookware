"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useFormState } from "react-dom";
import { clsx } from "clsx";
import { ImageIcon, X, Pencil, Trash2, Plus } from "lucide-react";
import {
    createProductAction,
    deleteProductAction,
    type ProductActionState,
    updateProductAction
} from "@/app/admin/products/actions";

const ITEMS_PER_PAGE = 6;
const initialState: ProductActionState = { success: false };

export type AdminProduct = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sizes: string | null;
    features: string | null;
    category_id: string;
    category_name: string;
    price_type: "Factory" | "FOB" | null;
    price_value: number | null;
    factory_price_value: number | null;
    fob_price_value: number | null;
    factory_price_usd: number | null;
    fob_price_usd: number | null;
    moq: number;
    oem_available: boolean;
    lead_time_weeks: number;
    status: "active" | "draft" | "discontinued";
    is_featured: boolean;
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

function formatUsd(value: number | null | undefined) {
    if (value == null || !Number.isFinite(Number(value))) return "—";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value));
}

const STATUS_CLASS: Record<string, string> = {
    active: "bg-green-50 text-green-700 border border-green-200",
    draft: "bg-parchment text-ink-60 border border-ink-20",
    discontinued: "bg-red-50 text-red-600 border border-red-200"
};

function ProductModal({ open, onClose, product, categories }: ProductModalProps) {
    const isEdit = Boolean(product);
    const action = isEdit ? updateProductAction : createProductAction;
    const [state, formAction] = useFormState(action, initialState);
    const [slugTouched, setSlugTouched] = useState(false);
    const [slugValue, setSlugValue] = useState(product?.slug ?? "");
    const [previewImage, setPreviewImage] = useState<string | null>(product?.image_url ?? null);

    useEffect(() => {
        if (state.success) onClose();
    }, [state.success, onClose]);

    useEffect(() => {
        setSlugValue(product?.slug ?? "");
        setSlugTouched(false);
        setPreviewImage(product?.image_url ?? null);
    }, [product?.id, product?.slug, product?.image_url]);

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        if (!slugTouched && !isEdit) {
            const autoSlug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim();
            setSlugValue(autoSlug);
        }
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 px-4 py-8 overflow-y-auto backdrop-blur-sm">
            <form action={formAction} encType="multipart/form-data" className="w-full max-w-2xl bg-white shadow-xl my-auto rounded-[2px]">
                <div className="flex items-center justify-between border-b border-ink-20 px-6 py-4">
                    <h2 className="font-heading text-xl font-light text-ink">{isEdit ? "Edit Product" : "Add Product"}</h2>
                    <button type="button" onClick={onClose} className="text-ink-60 hover:text-ink">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {isEdit && <input type="hidden" name="id" value={product?.id} />}

                <div className="px-6 py-6 space-y-5 max-h-[75vh] overflow-y-auto">
                    <div>
                        <label className="admin-label">Product Image</label>
                        <div className="flex gap-4 items-start">
                            {previewImage ? (
                                <div className="relative h-24 w-24 shrink-0 bg-parchment border border-ink-20 overflow-hidden rounded-[2px]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            ) : (
                                <div className="h-24 w-24 shrink-0 bg-parchment border border-dashed border-ink-20 flex items-center justify-center text-ink-60 rounded-[2px]">
                                    <ImageIcon className="h-6 w-6" />
                                </div>
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-ink-60 file:mr-3 file:border file:border-ink-20 file:bg-parchment file:px-3 file:py-1.5 file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-ink file:cursor-pointer rounded-[2px]"
                                />
                                <p className="mt-1.5 text-xs text-ink-60">JPG, PNG or WebP. Max 10MB. This replaces the current image.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="admin-label" htmlFor="product-name">
                                Name *
                            </label>
                            <input
                                id="product-name"
                                name="name"
                                required
                                defaultValue={product?.name ?? ""}
                                onChange={handleNameChange}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="admin-label" htmlFor="product-category">
                                Category *
                            </label>
                            <select
                                id="product-category"
                                name="categoryId"
                                required
                                defaultValue={product?.category_id ?? ""}
                                className="admin-select"
                            >
                                <option value="" disabled>
                                    Select category
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="admin-label" htmlFor="product-slug">
                            URL Slug *
                            <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-ink-60">
                                artisancookware.co/products/<span className="text-gold">{slugValue || "..."}</span>
                            </span>
                        </label>
                        <input
                            id="product-slug"
                            name="slug"
                            required
                            value={slugValue}
                            onChange={(e) => {
                                setSlugValue(e.target.value);
                                setSlugTouched(true);
                            }}
                            className="admin-input font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="admin-label" htmlFor="product-desc">
                            Description
                        </label>
                        <textarea
                            id="product-desc"
                            name="description"
                            rows={3}
                            defaultValue={product?.description ?? ""}
                            className="admin-input"
                        />
                    </div>

                    <div>
                        <label className="admin-label" htmlFor="product-features">
                            Features
                            <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-ink-60">One per line</span>
                        </label>
                        <textarea
                            id="product-features"
                            name="features"
                            rows={4}
                            defaultValue={product?.features ?? ""}
                            placeholder={"Heavy-gauge aluminium construction\nNon-stick PTFE coating\nCompatible with all hob types"}
                            className="admin-input text-sm"
                        />
                    </div>

                    <div>
                        <label className="admin-label" htmlFor="product-sizes">
                            Available Sizes
                        </label>
                        <input
                            id="product-sizes"
                            name="sizes"
                            defaultValue={product?.sizes ?? ""}
                            placeholder="e.g. 12pc, 15pc, 18pc, 24pc"
                            className="admin-input"
                        />
                    </div>

                    <div className="border-t border-ink-20 pt-5">
                        <div className="admin-label mb-3">PKR Pricing (shown to local visitors)</div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="admin-label" htmlFor="factory-pkr">
                                    Factory Price (PKR)
                                </label>
                                <input
                                    id="factory-pkr"
                                    name="factoryPriceValue"
                                    type="number"
                                    step="0.01"
                                    defaultValue={product?.factory_price_value ?? ""}
                                    className="admin-input"
                                />
                            </div>
                            <div>
                                <label className="admin-label" htmlFor="fob-pkr">
                                    FOB Price (PKR)
                                </label>
                                <input
                                    id="fob-pkr"
                                    name="fobPriceValue"
                                    type="number"
                                    step="0.01"
                                    defaultValue={product?.fob_price_value ?? ""}
                                    className="admin-input"
                                />
                            </div>
                            <div>
                                <label className="admin-label" htmlFor="price-type">
                                    Price Type
                                </label>
                                <select id="price-type" name="priceType" defaultValue={product?.price_type ?? ""} className="admin-select">
                                    <option value="">None</option>
                                    <option value="Factory">Factory</option>
                                    <option value="FOB">FOB</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gold-pale border border-gold/20 p-4 rounded-[2px]">
                        <div className="admin-label mb-3 text-gold">USD Pricing (shown to international visitors via currency converter)</div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="admin-label" htmlFor="factory-usd">
                                    Factory Price (USD) *
                                </label>
                                <input
                                    id="factory-usd"
                                    name="factoryPriceUsd"
                                    type="number"
                                    step="0.01"
                                    defaultValue={product?.factory_price_usd ?? ""}
                                    className="admin-input"
                                    placeholder="e.g. 19.50"
                                />
                            </div>
                            <div>
                                <label className="admin-label" htmlFor="fob-usd">
                                    FOB Price (USD)
                                </label>
                                <input
                                    id="fob-usd"
                                    name="fobPriceUsd"
                                    type="number"
                                    step="0.01"
                                    defaultValue={product?.fob_price_usd ?? ""}
                                    className="admin-input"
                                    placeholder="e.g. 21.00"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="admin-label" htmlFor="product-moq">
                                MOQ (Units)
                            </label>
                            <input
                                id="product-moq"
                                name="moq"
                                type="number"
                                min={1}
                                defaultValue={product?.moq ?? 50}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="admin-label" htmlFor="product-lead">
                                Lead Time (weeks)
                            </label>
                            <input
                                id="product-lead"
                                name="leadTimeWeeks"
                                type="number"
                                min={1}
                                defaultValue={product?.lead_time_weeks ?? 4}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="admin-label" htmlFor="product-status">
                                Status
                            </label>
                            <select id="product-status" name="status" defaultValue={product?.status ?? "active"} className="admin-select">
                                <option value="active">Active</option>
                                <option value="draft">Draft</option>
                                <option value="discontinued">Discontinued</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-6 flex-wrap">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                defaultChecked={product?.is_featured ?? false}
                                className="h-4 w-4 border-ink-20 text-gold focus:ring-gold/30 rounded-[2px]"
                            />
                            <span className="text-sm text-ink">Featured on homepage</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="oemAvailable"
                                defaultChecked={product?.oem_available ?? false}
                                className="h-4 w-4 border-ink-20 text-gold focus:ring-gold/30 rounded-[2px]"
                            />
                            <span className="text-sm text-ink">OEM / Custom branding available</span>
                        </label>
                    </div>

                    {state.error && <p className="text-sm text-red-600">{state.error}</p>}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-ink-20 px-6 py-4">
                    <button type="button" onClick={onClose} className="admin-btn-outline">
                        Cancel
                    </button>
                    <button type="submit" className="admin-btn-primary">
                        {isEdit ? "Save Changes" : "Create Product"}
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
        if (state.success) onClose();
    }, [state.success, onClose]);

    if (!open || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 py-6 backdrop-blur-sm">
            <form action={formAction} className="w-full max-w-lg bg-white shadow-xl rounded-[2px] p-8 border border-ink-20">
                <input type="hidden" name="id" value={product.id} />
                <div className="space-y-3 text-center">
                    <h2 className="font-heading text-xl font-light text-ink">Delete product?</h2>
                    <p className="text-sm text-ink-60">
                        This will permanently remove <span className="font-semibold text-ink">{product.name}</span>.
                    </p>
                </div>
                {state.error ? <p className="text-sm text-red-600 mt-4">{state.error}</p> : null}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <button type="button" onClick={onClose} className="admin-btn-outline">
                        Cancel
                    </button>
                    <button type="submit" className="admin-btn-danger">
                        <Trash2 className="h-3.5 w-3.5" />
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
    const featuredCount = products.filter((product) => product.is_featured).length;

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
                    <h1 className="font-heading text-2xl font-light text-ink">Products</h1>
                    <p className="text-sm text-ink-60">Manage the Artisan Cookware product catalogue and pricing.</p>
                </div>
                <div className="rounded-[2px] border border-ink-20 bg-parchment px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                    Featured {featuredCount}/4
                </div>
                <button type="button" onClick={() => setShowCreate(true)} className="admin-btn-primary">
                    <Plus className="h-4 w-4" />
                    Add product
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border border-ink-20 bg-white p-4 rounded-[2px] shadow-card">
                <input
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="admin-input sm:w-80"
                />
                <div className="text-sm text-ink-60">
                    Showing <span className="font-semibold text-ink">{paginated.length}</span> of {filtered.length} products
                </div>
            </div>

            <div className="overflow-hidden border border-ink-20 bg-white rounded-[2px] shadow-card">
                <table className="min-w-full divide-y divide-ink-20 text-left text-sm text-ink-60">
                    <thead className="bg-parchment text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-60">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">USD Price</th>
                            <th className="px-4 py-3">MOQ</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Featured</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-20">
                        {paginated.length ? (
                            paginated.map((product) => (
                                <tr key={product.id} className="group">
                                    <td className="px-4 py-3 align-middle">
                                        {product.image_url ? (
                                            <Image
                                                src={product.image_url}
                                                alt={product.name}
                                                width={48}
                                                height={48}
                                                className="h-12 w-12 object-cover border border-ink-20 rounded-[2px]"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center border border-dashed border-ink-20 text-[10px] uppercase tracking-[0.08em] text-ink-60 rounded-[2px]">
                                                —
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-ink">{product.name}</td>
                                    <td className="px-4 py-3 text-ink">{product.category_name}</td>
                                    <td className="px-4 py-3 font-mono text-sm text-ink">{formatUsd(product.factory_price_usd)}</td>
                                    <td className="px-4 py-3 text-ink">{product.moq}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] rounded-[2px] ${STATUS_CLASS[product.status] ?? STATUS_CLASS.draft}`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-ink">{product.is_featured ? "Yes" : "—"}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setModalProduct(product)}
                                                className="admin-btn-outline py-1.5 px-3 text-[11px]"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteProduct(product)}
                                                className="admin-btn-danger py-1.5 px-3 text-[11px]"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-6 py-6 text-center text-sm text-ink-60">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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

            <ProductModal open={showCreate} onClose={() => setShowCreate(false)} categories={categories} />
            <ProductModal open={Boolean(modalProduct)} onClose={() => setModalProduct(null)} product={modalProduct ?? undefined} categories={categories} />
            <DeleteProductModal open={Boolean(deleteProduct)} onClose={() => setDeleteProduct(null)} product={deleteProduct ?? undefined} />
        </div>
    );
}
