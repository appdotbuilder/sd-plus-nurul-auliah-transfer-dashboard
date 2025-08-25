import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Student {
    name: string;
    nisn: string;
}

interface User {
    name: string;
    role: string;
}

interface TransferRequest {
    id: number;
    transfer_type: string;
    status: string;
    origin_school: string;
    destination_school: string;
    transfer_date: string;
    created_at: string;
    student: Student;
    initiator: User;
    verifier?: User;
    approver?: User;
}

interface Props {
    transfers: {
        data: TransferRequest[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        total: number;
    };
    filters: {
        status?: string;
        transfer_type?: string;
        search?: string;
    };
    user: User;
    [key: string]: unknown;
}

export default function TransfersIndex({ transfers, filters, user }: Props) {
    const getStatusBadge = (status: string) => {
        const badges = {
            submitted: 'bg-yellow-100 text-yellow-800',
            verified: 'bg-blue-100 text-blue-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const statusText = {
            submitted: '⏳ Diajukan',
            verified: '🔄 Diverifikasi',
            approved: '✅ Disetujui',
            rejected: '❌ Ditolak',
        };
        return statusText[status as keyof typeof statusText] || status;
    };

    const getTransferTypeBadge = (type: string) => {
        return type === 'incoming' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-orange-100 text-orange-800';
    };

    const getTransferTypeText = (type: string) => {
        return type === 'incoming' ? '📥 Mutasi Masuk' : '📤 Mutasi Keluar';
    };

    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters };
        if (value === '') {
            delete newFilters[key as keyof typeof newFilters];
        } else {
            newFilters[key as keyof typeof newFilters] = value;
        }
        
        router.get('/transfers', newFilters, { preserveState: true });
    };

    return (
        <AppShell>
            <Head title="Mutasi Siswa - SD PLUS NURUL AULIA" />
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🔄 Mutasi Siswa</h1>
                    <p className="text-gray-600 mt-1">
                        Kelola pengajuan mutasi siswa masuk dan keluar
                    </p>
                </div>
                
                <Button asChild>
                    <Link href="/transfers/create">
                        ➕ Ajukan Mutasi
                    </Link>
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pencarian
                        </label>
                        <input
                            type="text"
                            placeholder="Nama siswa atau NISN..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.search || ''}
                            onChange={(e) => handleFilter('search', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.status || ''}
                            onChange={(e) => handleFilter('status', e.target.value)}
                        >
                            <option value="">Semua Status</option>
                            <option value="submitted">Diajukan</option>
                            <option value="verified">Diverifikasi</option>
                            <option value="approved">Disetujui</option>
                            <option value="rejected">Ditolak</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jenis Mutasi
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.transfer_type || ''}
                            onChange={(e) => handleFilter('transfer_type', e.target.value)}
                        >
                            <option value="">Semua Jenis</option>
                            <option value="incoming">Mutasi Masuk</option>
                            <option value="outgoing">Mutasi Keluar</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <Button 
                            variant="outline" 
                            onClick={() => router.get('/transfers')} 
                            className="w-full"
                        >
                            🔄 Reset Filter
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-gray-900">{transfers.total}</div>
                    <div className="text-sm text-gray-600">Total Mutasi</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                        {transfers.data.filter(t => t.status === 'submitted').length}
                    </div>
                    <div className="text-sm text-gray-600">Menunggu</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {transfers.data.filter(t => t.status === 'verified').length}
                    </div>
                    <div className="text-sm text-gray-600">Diverifikasi</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {transfers.data.filter(t => t.status === 'approved').length}
                    </div>
                    <div className="text-sm text-gray-600">Disetujui</div>
                </div>
            </div>

            {/* Transfers Table */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">
                        📋 Daftar Mutasi Siswa
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-700">Siswa</th>
                                <th className="text-left p-4 font-medium text-gray-700">Jenis</th>
                                <th className="text-left p-4 font-medium text-gray-700">Sekolah</th>
                                <th className="text-left p-4 font-medium text-gray-700">Status</th>
                                <th className="text-left p-4 font-medium text-gray-700">Pengaju</th>
                                <th className="text-left p-4 font-medium text-gray-700">Tanggal</th>
                                <th className="text-left p-4 font-medium text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.data.length > 0 ? (
                                transfers.data.map((transfer) => (
                                    <tr key={transfer.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="font-medium">{transfer.student.name}</div>
                                            <div className="text-sm text-gray-600 font-mono">
                                                NISN: {transfer.student.nisn}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTransferTypeBadge(transfer.transfer_type)}`}>
                                                {getTransferTypeText(transfer.transfer_type)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm">
                                                <div className="font-medium">
                                                    {transfer.transfer_type === 'incoming' ? '📥' : '📤'} 
                                                    {transfer.transfer_type === 'incoming' 
                                                        ? transfer.origin_school 
                                                        : transfer.destination_school}
                                                </div>
                                                <div className="text-gray-600">
                                                    {transfer.transfer_type === 'incoming' ? 'dari' : 'ke'} sekolah
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(transfer.status)}`}>
                                                {getStatusText(transfer.status)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {transfer.initiator.name}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {new Date(transfer.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`/transfers/${transfer.id}`}>
                                                        👁️ Detail
                                                    </Link>
                                                </Button>
                                                
                                                {/* Show verification button for school admin */}
                                                {user.role === 'school_admin' && transfer.status === 'submitted' && (
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/transfers/${transfer.id}`}>
                                                            🔍 Verifikasi
                                                        </Link>
                                                    </Button>
                                                )}

                                                {/* Show approval button for admin/district operator */}
                                                {(user.role === 'school_admin' || user.role === 'district_operator') && 
                                                 transfer.status === 'verified' && (
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/transfers/${transfer.id}`}>
                                                            ✅ Setujui
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        <div className="text-4xl mb-2">📄</div>
                                        <p>Tidak ada data mutasi yang ditemukan</p>
                                        {Object.keys(filters).length > 0 && (
                                            <p className="text-sm mt-1">
                                                Coba ubah filter pencarian atau{' '}
                                                <button 
                                                    onClick={() => router.get('/transfers')}
                                                    className="text-blue-600 underline"
                                                >
                                                    reset semua filter
                                                </button>
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {transfers.links && transfers.links.length > 3 && (
                    <div className="px-6 py-4 border-t">
                        <div className="flex justify-center space-x-2">
                            {transfers.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-2 text-sm rounded-lg ${
                                        link.active 
                                            ? 'bg-blue-600 text-white' 
                                            : link.url 
                                                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}