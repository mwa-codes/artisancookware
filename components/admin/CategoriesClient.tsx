"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useFormState } from "react-dom";
import { clsx } from "clsx";
import { ImageIcon, X, Trash2 } from "lucide-react";
import {
    createCategoryAction,
    deleteCategoryAction,
    type CategoryActionState,
    updateCategoryAction
} from "@/app/admin/categories/actions";

export type AdminCategory = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    display_order: number;
    is_featured: boolean;
    created_at: string;
};

const ITEMS_PER_PAGE = 8;

const initialFormState: CategoryActionState = { success: false };

type ModalProps = {
    open: boolean;
    onClose: () => void;
    category?: AdminCategory | null;
};

function CategoryModal({ open, onClose, category }: ModalProps) {
    const isEdit = Boolean(category);
    const action = isEdit ? updateCategoryAction : createCategoryAction;
    const [state, formAction] = useFormState(action, initialFormState);
    const [slugTouched, setSlugTouched] = useState(false);
    const [slugValue, setSlugValue] = useState(category?.slug ?? "");
    const [previewImage, setPreviewImage] = useState<string | null>(category?.image_url ?? null);

    useEffect(() => {
        if (state.success) onClose();
    }, [state.success, onClose]);

    useEffect(() => {
        setSlugValue(category?.slug ?? "");
        setSlugTouched(false);
        setPreviewImage(category?.image_url ?? null);
    }, [category?.id, category?.slug, category?.image_url]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 py-6 backdrop-blur-sm">
            <form action={formAction} encType="multipart/form-data" className="w-full max-w-lg bg-white shadow-xl rounded-[2px]">
                <div className="flex items-center justify-between border-b border-ink-20 px-6 py-4">
                    <h2 className="font-heading text-xl font-light text-ink">{isEdit ? "Edit Collection" : "Add Collection"}</h2>
                    <button type="button" onClick={onClose} className="text-ink-60 hover:text-ink">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {isEdit && <input type="hidden" name="id" value={category?.id} />}

                <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label className="admin-label">Collection Image</label>
                        <div className="flex gap-4 items-start">
                            {previewImage ? (
                                <div className="h-20 w-20 shrink-0 overflow-hidden border border-ink-20 rounded-[2px]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            ) : (
                                <div className="h-20 w-20 shrink-0 bg-parchment border border-dashed border-ink-20 flex items-center justify-center text-ink-60 rounded-[2px]">
                                    <ImageIcon className="h-5 w-5" />
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
                                <p className="mt-1 text-xs text-ink-60">Recommended: portrait ratio (3:4), min 600×800px</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="admin-label" htmlFor="cat-name">
                            Name *
                        </label>
                        <input
                            id="cat-name"
                            name="name"
                            required
                            defaultValue={category?.name ?? ""}
                            onChange={handleNameChange}
                            className="admin-input"
                        />
                    </div>

                    <div>
                        <label className="admin-label" htmlFor="cat-slug">
                            URL Slug *
                            <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-ink-60">
                                artisancookware.co/categories/<span className="text-gold">{slugValue || "..."}</span>
                            </span>
                        </label>
                        <input
                            id="cat-slug"
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
                        <label className="admin-label" htmlFor="cat-desc">
                            Description
                        </label>
                        <textarea
                            id="cat-desc"
                            name="description"
                            rows={3}
                            defaultValue={category?.description ?? ""}
                            className="admin-input"
                        />
                    </div>

                    <div>
                        <label className="admin-label" htmlFor="cat-order">
                            Display Order
                        </label>
                        <input
                            id="cat-order"
                            name="displayOrder"
                            type="number"
                            min={0}
                            defaultValue={category?.display_order ?? 0}
                            className="admin-input"
                        />
                        <p className="mt-1 text-xs text-ink-60">Lower numbers appear first. 0 = default.</p>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            defaultChecked={category?.is_featured ?? false}
                            className="h-4 w-4 border-ink-20 text-gold focus:ring-gold/30 rounded-[2px]"
                        />
                        <span className="text-sm text-ink">Show in homepage collections</span>
                    </label>

                    {state.error && <p className="text-sm text-red-600">{state.error}</p>}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-ink-20 px-6 py-4">
                    <button type="button" onClick={onClose} className="admin-btn-outline">
                        Cancel
                    </button>
                    <button type="submit" className="admin-btn-primary">
                        {isEdit ? "Save Changes" : "Create Collection"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function DeleteModal({ open, onClose, category }: ModalProps) {
    const [state, formAction] = useFormState(deleteCategoryAction, initialFormState);

    useEffect(() => {
        if (state.success) onClose();
    }, [state.success, onClose]);

    if (!open || !category) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 py-6 backdrop-blur-sm">
            <form action={formAction} className="w-full max-w-md bg-white shadow-xl rounded-[2px] border border-ink-20 p-8">
                <input type="hidden" name="id" value={category.id} />
                <div className="space-y-3 text-center">
                    <h2 className="font-heading text-xl font-light text-ink">Delete category?</h2>
                    <p className="text-sm text-ink-60">
                        This will remove <span className="font-semibold text-ink">{category.name}</span> and any related data. This action cannot be undone.
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

export function CategoriesClient({ categories }: { categories: AdminCategory[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [showCreate, setShowCreate] = useState(false);
    const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<AdminCategory | null>(null);

    const filtered = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return categories;
        return categories.filter((category) =>
            [category.name, category.slug, category.description ?? ""].some((field) => field.toLowerCase().includes(keyword))
        );
    }, [categories, search]);

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
                    <h1 className="font-heading text-2xl font-light text-ink">Categories</h1>
                    <p className="text-sm text-ink-60">Organise the catalogue into curated cookware collections.</p>
                </div>
                <button type="button" onClick={() => setShowCreate(true)} className="admin-btn-primary">
                    Add category
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border border-ink-20 bg-white p-4 rounded-[2px] shadow-card">
                <input
                    type="search"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="admin-input sm:w-72"
                />
                <div className="text-sm text-ink-60">
                    Showing <span className="font-semibold text-ink">{paginated.length}</span> of {filtered.length} categories
                </div>
            </div>

            <div className="overflow-hidden border border-ink-20 bg-white rounded-[2px] shadow-card">
                <table className="min-w-full divide-y divide-ink-20 text-left text-sm">
                    <thead className="bg-parchment text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-60">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Slug</th>
                            <th className="px-4 py-3">Order</th>
                            <th className="px-4 py-3">Featured</th>
                            <th className="px-4 py-3">Created</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-20 text-ink-60">
                        {paginated.length ? (
                            paginated.map((category) => (
                                <tr key={category.id} className="group">
                                    <td className="px-4 py-3">
                                        {category.image_url ? (
                                            <Image
                                                src={category.image_url}
                                                alt=""
                                                width={40}
                                                height={40}
                                                className="h-10 w-10 object-cover border border-ink-20 rounded-[2px]"
                                            />
                                        ) : (
                                            <span className="text-xs">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-ink">{category.name}</td>
                                    <td className="px-4 py-3 font-mono text-xs">{category.slug}</td>
                                    <td className="px-4 py-3">{category.display_order}</td>
                                    <td className="px-4 py-3">{category.is_featured ? "Yes" : "—"}</td>
                                    <td className="px-4 py-3 text-xs">
                                        {new Date(category.created_at).toLocaleDateString("en-PK", {
                                            dateStyle: "medium"
                                        })}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingCategory(category)}
                                                className="admin-btn-outline py-1.5 px-3 text-[11px]"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingCategory(category)}
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
                                <td colSpan={7} className="px-6 py-6 text-center text-sm text-ink-60">
                                    No categories found.
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

            <CategoryModal open={showCreate} onClose={() => setShowCreate(false)} />
            <CategoryModal open={Boolean(editingCategory)} onClose={() => setEditingCategory(null)} category={editingCategory ?? undefined} />
            <DeleteModal open={Boolean(deletingCategory)} onClose={() => setDeletingCategory(null)} category={deletingCategory ?? undefined} />
        </div>
    );
}
