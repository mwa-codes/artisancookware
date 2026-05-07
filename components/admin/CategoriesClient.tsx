"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { clsx } from "clsx";
import {
    createCategoryAction,
    deleteCategoryAction,
    type CategoryActionState,
    updateCategoryAction
} from "@/app/admin/categories/actions";

type AdminCategory = {
    id: string;
    name: string;
    description: string | null;
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
                className="w-full max-w-lg space-y-5 rounded-[2rem] border border-brand-primary/15 bg-white/90 p-8 shadow-2xl shadow-brand-primary/20"
            >
                <div className="space-y-1">
                    <h2 className="font-heading text-2xl font-semibold text-slate-900">
                        {isEdit ? "Edit category" : "Add category"}
                    </h2>
                    <p className="text-sm text-slate-600">
                        {isEdit ? "Update the category information." : "Create a new product category for the catalogue."}
                    </p>
                </div>
                {isEdit ? <input type="hidden" name="id" defaultValue={category?.id} /> : null}
                <div className="space-y-2">
                    <label htmlFor="category-name" className="text-sm font-medium text-slate-700">
                        Name
                    </label>
                    <input
                        id="category-name"
                        name="name"
                        required
                        defaultValue={category?.name ?? ""}
                        className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="category-description" className="text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        id="category-description"
                        name="description"
                        rows={4}
                        defaultValue={category?.description ?? ""}
                        className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
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
                        {isEdit ? "Save changes" : "Create category"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function DeleteModal({ open, onClose, category }: ModalProps) {
    const [state, formAction] = useFormState(deleteCategoryAction, initialFormState);

    useEffect(() => {
        if (state.success) {
            onClose();
        }
    }, [state.success, onClose]);

    if (!open || !category) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm">
            <form
                action={formAction}
                className="w-full max-w-md space-y-6 rounded-[2rem] border border-brand-primary/15 bg-white/90 p-8 shadow-2xl shadow-brand-primary/20"
            >
                <input type="hidden" name="id" value={category.id} />
                <div className="space-y-3 text-center">
                    <h2 className="font-heading text-2xl font-semibold text-slate-900">Delete category?</h2>
                    <p className="text-sm text-slate-600">
                        This will remove <span className="font-semibold text-brand-dark">{category.name}</span> and any related data. This action cannot be undone.
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
            [category.name, category.description ?? ""].some((field) => field.toLowerCase().includes(keyword))
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
                    <h1 className="font-heading text-2xl font-semibold text-slate-900">Categories</h1>
                    <p className="text-sm text-slate-600">Organise the catalogue into curated cookware collections.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setShowCreate(true)}
                    className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-primary/30 transition hover:bg-brand-dark"
                >
                    Add category
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-brand-primary/15 bg-white/80 p-4 shadow-lg shadow-brand-primary/10">
                <input
                    type="search"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 sm:w-72"
                />
                <div className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-brand-dark">{paginated.length}</span> of {filtered.length} categories
                </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-brand-primary/10 bg-white/90 shadow-card">
                <table className="table-premium text-left text-sm text-slate-600">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length ? (
                            paginated.map((category) => (
                                <tr key={category.id} className="group">
                                    <td className="font-semibold text-slate-900">{category.name}</td>
                                    <td className="text-sm text-slate-600">
                                        {category.description ? category.description : <span className="text-slate-400">—</span>}
                                    </td>
                                    <td className="text-xs text-brand-dark/70">
                                        {new Date(category.created_at).toLocaleDateString("en-PK", {
                                            dateStyle: "medium"
                                        })}
                                    </td>
                                    <td>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingCategory(category)}
                                                className="rounded-full border border-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-dark transition hover:border-brand-primary hover:bg-brand-light/80"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingCategory(category)}
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
                                    No categories found.
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

            <CategoryModal open={showCreate} onClose={() => setShowCreate(false)} />
            <CategoryModal
                open={Boolean(editingCategory)}
                onClose={() => setEditingCategory(null)}
                category={editingCategory ?? undefined}
            />
            <DeleteModal
                open={Boolean(deletingCategory)}
                onClose={() => setDeletingCategory(null)}
                category={deletingCategory ?? undefined}
            />
        </div>
    );
}
