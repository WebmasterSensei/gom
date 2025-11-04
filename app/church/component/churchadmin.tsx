"use client"
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function ChurchesAdmin() {

    const [churches, setchurches] = useState<any>([]);

    const fetchChurches = async () => {
        const { data, error } = await supabase.from("churches").select("*");
        console.log(data);
        if (error) console.error("Error fetching users:", error);
        else setchurches(data || []);
    };

    useEffect(() => {
        fetchChurches();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    // Filter and sort churches
    const filteredchurches = churches
        .filter((pastor: any) => {
            const matchesSearch = pastor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pastor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pastor.address.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'All' || pastor.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a: any, b: any) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            if (sortField === 'joinDate' || sortField === 'lastActive') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortDirection === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

    const handleSort = (field: any) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    type churchestatus = 'Active' | 'Inactive' | 'Pending';

    const getStatusBadge = (status: churchestatus) => {
        const statusStyles: Record<churchestatus, string> = {
            Active: 'bg-green-100 text-green-800',
            Inactive: 'bg-red-100 text-red-800',
            Pending: 'bg-yellow-100 text-yellow-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                {status}
            </span>
        );
    };

    const handleStatusChange = (id: any, newStatus: any) => {
        setchurches(churches.map((pastor: any) =>
            pastor.id === id ? { ...pastor, status: newStatus } : pastor
        ));
    };

    const handleDelete = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from("churches")
                .delete()
                .eq("id", id);

            alert("✅ Deleted successfully!")

        } catch {
            alert("❌ Opss Error Deleting!")
        } finally {
            fetchChurches();
        }

    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Church Lists</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage church information
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 sm:flex-none">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search churches..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Status Filter */}
                        
                        </div>

                        {/* Add Pastor Button */}
                        <a href="/church/create">
                            <button className="w-full sm:w-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Church
                            </button>
                        </a>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    {/* Desktop Table */}
                    {/* {JSON.stringify(filteredchurches)} */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        { key: 'name', label: 'Church Name' },
                                        { key: 'address', label: 'Address' },
                                        { key: 'desc', label: 'Description' },
                                        { key: 'map', label: 'Embeded Map' },
                                        { key: 'actions', label: 'Actions' }
                                    ].map((column) => (
                                        <th
                                            key={column.key}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => column.key !== 'actions' && handleSort(column.key)}
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
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredchurches.map((church: any) => (

                                    <tr key={church.id} className="hover:bg-gray-50">

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{church?.name}</div>
                                                    <div className="text-sm text-gray-500">{church?.desc}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{church?.address}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{church?.desc}</div>
                                        </td>
                                         <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{church?.map}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">

                                                <button
                                                    onClick={() => handleDelete(church.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden">
                        {filteredchurches.map((church: any) => (
                            <div key={church.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <h3 className="text-sm font-medium text-gray-900">{church.name}</h3>
                                            <p className="text-sm text-gray-500">{church.desc}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(church.status as churchestatus)}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-500">Addres:</span>
                                        <p className="text-gray-900">{church?.address}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-500">Embeded Map:</span>
                                        <p className="text-gray-900">{church?.map}</p>
                                    </div>
    
                                </div>

                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleDelete(church.id)}
                                        className="text-red-600 hover:text-red-900"
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
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No churches found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{filteredchurches.length}</span> of <span className="font-medium">{churches.length}</span> churches
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}