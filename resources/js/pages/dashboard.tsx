import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Stats {
    total_students: number;
    incoming_transfers: number;
    outgoing_transfers: number;
    pending_requests: number;
    verified_requests: number;
    approved_requests: number;
    rejected_requests: number;
}

interface MonthlyData {
    months: string[];
    incoming: number[];
    outgoing: number[];
}

interface TransferRequest {
    id: number;
    transfer_type: string;
    status: string;
    created_at: string;
    student: {
        name: string;
        nisn: string;
    };
    initiator: {
        name: string;
    };
}

interface Notification {
    type: string;
    message: string;
    count: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    stats: Stats;
    monthlyData: MonthlyData;
    recentTransfers: TransferRequest[];
    pendingNotifications: Notification[];
    user: User;
    [key: string]: unknown;
}

export default function Dashboard({ stats, monthlyData, recentTransfers, pendingNotifications, user }: Props) {
    const getStatusBadge = (status: string) => {
        const badges = {
            submitted: 'bg-yellow-100 text-yellow-800',
            verified: 'bg-blue-100 text-blue-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    const getTransferTypeBadge = (type: string) => {
        return type === 'incoming' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-orange-100 text-orange-800';
    };

    const getRoleDisplay = (role: string) => {
        const roleNames = {
            school_admin: 'Admin Sekolah',
            teacher: 'Guru',
            district_operator: 'Operator Dinas'
        };
        return roleNames[role as keyof typeof roleNames] || role;
    };

    return (
        <AppShell>
            <Head title="Dashboard - SD PLUS NURUL AULIA" />
            
            {/* Welcome Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            🎓 Dashboard Mutasi Siswa
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Selamat datang, <span className="font-semibold">{user.name}</span> 
                            ({getRoleDisplay(user.role)})
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Button asChild>
                            <Link href="/transfers/create">
                                ➕ Ajukan Mutasi
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/students">
                                👥 Data Siswa
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            {pendingNotifications.length > 0 && (
                <div className="mb-8">
                    <div className="grid gap-4">
                        {pendingNotifications.map((notification, index) => (
                            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="text-2xl mr-3">🔔</div>
                                    <div className="flex-1">
                                        <p className="text-yellow-800 font-medium">{notification.message}</p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href="/transfers">Lihat Detail</Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center">
                        <div className="text-3xl mr-4">👥</div>
                        <div>
                            <p className="text-sm text-gray-600">Total Siswa</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total_students}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center">
                        <div className="text-3xl mr-4">📥</div>
                        <div>
                            <p className="text-sm text-gray-600">Mutasi Masuk</p>
                            <p className="text-2xl font-bold text-green-600">{stats.incoming_transfers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center">
                        <div className="text-3xl mr-4">📤</div>
                        <div>
                            <p className="text-sm text-gray-600">Mutasi Keluar</p>
                            <p className="text-2xl font-bold text-orange-600">{stats.outgoing_transfers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center">
                        <div className="text-3xl mr-4">⏳</div>
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending_requests}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <div className="text-2xl mb-2">✅</div>
                    <p className="text-sm text-gray-600 mb-1">Disetujui</p>
                    <p className="text-xl font-bold text-green-600">{stats.approved_requests}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <div className="text-2xl mb-2">🔄</div>
                    <p className="text-sm text-gray-600 mb-1">Diverifikasi</p>
                    <p className="text-xl font-bold text-blue-600">{stats.verified_requests}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <div className="text-2xl mb-2">❌</div>
                    <p className="text-sm text-gray-600 mb-1">Ditolak</p>
                    <p className="text-xl font-bold text-red-600">{stats.rejected_requests}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Monthly Transfers Chart (Placeholder) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        📊 Grafik Mutasi Bulanan
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📈</div>
                            <p className="text-gray-600">Chart will be rendered here</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Last 12 months: {monthlyData.months.slice(-3).join(', ')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Transfer Type Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        🥧 Distribusi Jenis Mutasi
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-700">Mutasi Masuk</span>
                            </div>
                            <span className="font-semibold">{stats.incoming_transfers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                                <span className="text-gray-700">Mutasi Keluar</span>
                            </div>
                            <span className="font-semibold">{stats.outgoing_transfers}</span>
                        </div>
                        
                        {/* Progress bars */}
                        <div className="mt-4">
                            <div className="bg-gray-200 rounded-full h-3 mb-2">
                                <div 
                                    className="bg-green-500 h-3 rounded-full" 
                                    style={{ 
                                        width: `${stats.incoming_transfers / (stats.incoming_transfers + stats.outgoing_transfers) * 100}%` 
                                    }}
                                ></div>
                            </div>
                            <div className="bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-orange-500 h-3 rounded-full" 
                                    style={{ 
                                        width: `${stats.outgoing_transfers / (stats.incoming_transfers + stats.outgoing_transfers) * 100}%` 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transfer Requests */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            📋 Mutasi Terbaru
                        </h3>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/transfers">Lihat Semua</Link>
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-700">Siswa</th>
                                <th className="text-left p-4 font-medium text-gray-700">NISN</th>
                                <th className="text-left p-4 font-medium text-gray-700">Jenis</th>
                                <th className="text-left p-4 font-medium text-gray-700">Status</th>
                                <th className="text-left p-4 font-medium text-gray-700">Pengaju</th>
                                <th className="text-left p-4 font-medium text-gray-700">Tanggal</th>
                                <th className="text-left p-4 font-medium text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransfers.length > 0 ? (
                                recentTransfers.map((transfer) => (
                                    <tr key={transfer.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4 font-medium">{transfer.student.name}</td>
                                        <td className="p-4 text-gray-600">{transfer.student.nisn}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTransferTypeBadge(transfer.transfer_type)}`}>
                                                {transfer.transfer_type === 'incoming' ? '📥 Masuk' : '📤 Keluar'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(transfer.status)}`}>
                                                {transfer.status === 'submitted' && '⏳ Diajukan'}
                                                {transfer.status === 'verified' && '🔄 Diverifikasi'}
                                                {transfer.status === 'approved' && '✅ Disetujui'}
                                                {transfer.status === 'rejected' && '❌ Ditolak'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600">{transfer.initiator.name}</td>
                                        <td className="p-4 text-gray-600">
                                            {new Date(transfer.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="p-4">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/transfers/${transfer.id}`}>Detail</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        <div className="text-4xl mb-2">📄</div>
                                        <p>Belum ada data mutasi</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppShell>
    );
}