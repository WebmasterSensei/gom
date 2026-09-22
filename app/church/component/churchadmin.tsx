"use client"
import { useAppwrite } from '@appwrite.io/react';
import { Databases, Query } from 'appwrite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { appwriteConfig } from '@/lib/appwrite';
import AddChurhForm from './addchuch';

type ChurchStatus = 'Active' | 'Inactive' | 'Pending';

interface ChurchDoc {
    $id: string;
    name: string;
    address: string;
    desc: string;
    map: string;
    status: ChurchStatus;
}

type ChurchSortField = 'name' | 'address' | 'desc' | 'map';

export default function ChurchesAdmin() {
    const { client } = useAppwrite()
    const databases = useMemo(() => new Databases(client), [client])

    const [churches, setchurches] = useState<ChurchDoc[]>([]);
    const [editingDoc, setEditingDoc] = useState<ChurchDoc | null>(null);

    const fetchChurches = useCallback(async () => {
        try {
            const { documents } = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.churchesCollectionId,
                [Query.orderDesc("$createdAt")]
            );
            setchurches(documents as unknown as ChurchDoc[]);
        } catch (error) {
            console.error("Error fetching churches:", error);
        }
    }, [databases]);

    useEffect(() => {
        fetchChurches();
    }, [fetchChurches]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortField, setSortField] = useState<ChurchSortField>('name');
    const [sortDirection, setSortDirection] = useState('asc');

    // Filter and sort churches
    const filteredchurches = churches
        .filter((church) => {
            const search = searchTerm.toLowerCase();
            const matchesSearch =
                (church.name || "").toLowerCase().includes(search) ||
                (church.address || "").toLowerCase().includes(search) ||
                (church.desc || "").toLowerCase().includes(search);

            const matchesStatus = statusFilter === 'All' || church.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const aValue: string | number = a[sortField] ?? "";
            const bValue: string | number = b[sortField] ?? "";

            if (sortDirection === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

    const handleSort = (field: ChurchSortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusBadge = (status: ChurchStatus) => {
        const statusStyles: Record<ChurchStatus, string> = {
            Active: 'bg-green-100 text-green-800',
            Inactive: 'bg-red-100 text-red-800',
            Pending: 'bg-yellow-100 text-yellow-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.Pending}`}>
                {status || 'Pending'}
            </span>
        );
    };

    const handleDelete = async (documentId: string) => {
        if (!confirm("Are you sure you want to delete this church?")) return;
        try {
            await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.churchesCollectionId,
                documentId
            );
            alert("✅ Deleted successfully!")
        } catch {
            alert("❌ Oops, error deleting!")
        } finally {
            fetchChurches();
        }
    }

    const columns: { key: ChurchSortField | 'actions'; label: string }[] = [
        { key: 'name', label: 'Church Name' },
        { key: 'address', label: 'Address' },
        { key: 'desc', label: 'Description' },
        { key: 'map', label: 'Embedded Map' },
        { key: 'actions', label: 'Actions' }
    ];

    return (
        <div className="min-h-screen bg-[#faf7f0] p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto pt-10">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-[#33281a]">Church Lists</h1>
                        <div className="mt-2 h-px w-16 bg-gradient-to-r from-[#c9a227] to-transparent"></div>
                        <p className="mt-2 text-sm text-[#7c6f5a]">
                            Manage church information
                        </p>
                    </div>
                    <a href="/church/create">
                        <button className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-[#b8860b] to-[#c9a227] hover:from-[#a37408] hover:to-[#b8860b] transition">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Church
                        </button>
                    </a>
                </div>

                {/* Controls */}
                <div className="mb-6 bg-white rounded-xl border border-[#ece3cd] p-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="relative w-full sm:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-[#b3a68a]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search churches..."
                                className="block w-full pl-10 pr-3 py-2 border border-[#e2d8c2] rounded-lg leading-5 bg-[#fbf8f1] text-[#33281a] placeholder-[#b3a68a] focus:outline-none focus:ring-1 focus:ring-[#c9a227] focus:border-[#c9a227] sm:text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full sm:w-44 border border-[#e2d8c2] rounded-lg py-2 px-3 text-sm text-[#33281a] bg-[#fbf8f1] focus:outline-none focus:ring-1 focus:ring-[#c9a227] focus:border-[#c9a227]"
                        >
                            <option value="All">All statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>

                {editingDoc && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between bg-white rounded-xl border border-[#ece3cd] p-4 mb-4">
                            <div>
                                <h2 className="font-serif text-lg font-semibold text-[#33281a]">
                                    Editing: {editingDoc.name}
                                </h2>
                                <p className="text-sm text-[#7c6f5a]">Update the details below, then save your changes.</p>
                            </div>
                            <button
                                onClick={() => setEditingDoc(null)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-[#e2d8c2] text-[#4a3f2c] bg-white hover:bg-[#f4ecdf] transition"
                            >
                                Cancel
                            </button>
                        </div>
                        <AddChurhForm
                            documentId={editingDoc.$id}
                            initialData={editingDoc}
                            onComplete={() => setEditingDoc(null)}
                        />
                    </div>
                )}

                {/* Table */}
                <div className="bg-white shadow-sm rounded-xl border border-[#ece3cd] overflow-hidden">
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#ece3cd]">
                            <thead className="bg-[#f4ecdf]">
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className="px-6 py-3 text-left text-xs font-semibold text-[#4a3f2c] uppercase tracking-wider cursor-pointer hover:bg-[#efe6d3]"
                                            onClick={() => column.key !== 'actions' && handleSort(column.key as ChurchSortField)}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>{column.label}</span>
                                                {sortField === column.key && (
                                                    <svg className={`h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#f0e9da]">
                                {filteredchurches.map((church) => (
                                    <tr key={church.$id} className="hover:bg-[#fbf8f1] transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-[#33281a]">{church?.name}</div>
                                                    <div className="text-sm text-[#7c6f5a]">{church?.desc}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-[#4a3f2c]">{church?.address}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-[#4a3f2c]">{church?.desc}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-[#4a3f2c]">{church?.map}</div>
                                            {getStatusBadge(church.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => setEditingDoc(church)}
                                                className="text-[#8a6d1a] hover:text-[#a37408] mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(church.$id)}
                                                className="text-[#7d2e3d] hover:text-[#a33b4d]"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden">
                        {filteredchurches.map((church) => (
                            <div key={church.$id} className="border-b border-[#f0e9da] p-4 hover:bg-[#fbf8f1]">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <h3 className="text-sm font-medium text-[#33281a]">{church.name}</h3>
                                            <p className="text-sm text-[#7c6f5a]">{church.desc}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(church.status)}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                                    <div>
                                        <span className="font-medium text-[#b3a68a]">Address:</span>
                                        <p className="text-[#33281a]">{church?.address}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-[#b3a68a]">Embedded Map:</span>
                                        <p className="text-[#33281a]">{church?.map}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() => setEditingDoc(church)}
                                        className="text-[#8a6d1a] hover:text-[#a37408]"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(church.$id)}
                                        className="text-[#7d2e3d] hover:text-[#a33b4d]"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {filteredchurches.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-[#c9b98e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-[#33281a]">No churches found</h3>
                        <p className="mt-1 text-sm text-[#7c6f5a]">
                            Try adjusting your search to find what you&apos;re looking for.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-[#7c6f5a]">
                        Showing <span className="font-medium text-[#33281a]">{filteredchurches.length}</span> of <span className="font-medium text-[#33281a]">{churches.length}</span> churches
                    </div>
                </div>
            </div>
        </div>
    );
}