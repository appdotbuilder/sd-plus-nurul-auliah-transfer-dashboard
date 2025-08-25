import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    name: string;
    nisn: string;
    birth_date: string;
    gender: string;
    current_class: string;
    status: string;
    parent_name: string;
    parent_phone: string;
    transfer_requests_count?: number;
}

interface User {
    role: string;
}

interface Props {
    students: {
        data: Student[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        total: number;
    };
    classes: string[];
    filters: {
        status?: string;
        class?: string;
        search?: string;
    };
    user: User;
    [key: string]: unknown;
}

export default function StudentsIndex({ students, classes, filters, user }: Props) {
    const getStatusBadge = (status: string) => {
        const badges = {
            active: 'bg-green-100 text-green-800',
            transferred_out: 'bg-orange-100 text-orange-800',
            transferred_in: 'bg-blue-100 text-blue-800',
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const statusText = {
            active: '✅ Aktif',
            transferred_out: '📤 Mutasi Keluar',
            transferred_in: '📥 Mutasi Masuk',
        };
        return statusText[status as keyof typeof statusText] || status;
    };

    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters };
        if (value === '') {
            delete newFilters[key as keyof typeof newFilters];
        } else {
            newFilters[key as keyof typeof newFilters] = value;
        }
        
        router.get('/students', newFilters, { preserveState: true });
    };

    return (
        <AppShell>
            <Head title="Data Siswa - SD PLUS NURUL AULIA" />
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">👥 Data Siswa</h1>
                    <p className="text-gray-600 mt-1">
                        Kelola data siswa dan riwayat mutasi
                    </p>
                </div>
                
                {user.role !== 'teacher' && (
                    <Button asChild>
                        <Link href="/students/create">
                            ➕ Tambah Siswa
                        </Link>
                    </Button>
                )}
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
                            placeholder="Nama, NISN, atau nama orang tua..."
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
                            <option value="active">Aktif</option>
                            <option value="transferred_out">Mutasi Keluar</option>
                            <option value="transferred_in">Mutasi Masuk</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kelas
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.class || ''}
                            onChange={(e) => handleFilter('class', e.target.value)}
                        >
                            <option value="">Semua Kelas</option>
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <Button 
                            variant="outline" 
                            onClick={() => router.get('/students')} 
                            className="w-full"
                        >
                            🔄 Reset Filter
                        </Button>
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Daftar Siswa ({students.total} siswa)
                        </h3>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-700">Nama</th>
                                <th className="text-left p-4 font-medium text-gray-700">NISN</th>
                                <th className="text-left p-4 font-medium text-gray-700">Kelas</th>
                                <th className="text-left p-4 font-medium text-gray-700">Jenis Kelamin</th>
                                <th className="text-left p-4 font-medium text-gray-700">Orang Tua</th>
                                <th className="text-left p-4 font-medium text-gray-700">Status</th>
                                <th className="text-left p-4 font-medium text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.data.length > 0 ? (
                                students.data.map((student) => (
                                    <tr key={student.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="font-medium">{student.name}</div>
                                            <div className="text-sm text-gray-600">
                                                Lahir: {new Date(student.birth_date).toLocaleDateString('id-ID')}
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-sm">{student.nisn}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                {student.current_class || 'Belum ditetapkan'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {student.gender === 'male' ? '👦 Laki-laki' : '👧 Perempuan'}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm">
                                                <div className="font-medium">{student.parent_name}</div>
                                                <div className="text-gray-600">{student.parent_phone}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(student.status)}`}>
                                                {getStatusText(student.status)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`/students/${student.id}`}>
                                                        👁️ Detail
                                                    </Link>
                                                </Button>
                                                
                                                {(user.role === 'school_admin' || 
                                                  (user.role === 'teacher' && student.current_class)) && (
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/students/${student.id}/edit`}>
                                                            ✏️ Edit
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
                                        <div className="text-4xl mb-2">📚</div>
                                        <p>Tidak ada data siswa yang ditemukan</p>
                                        {Object.keys(filters).length > 0 && (
                                            <p className="text-sm mt-1">
                                                Coba ubah filter pencarian atau{' '}
                                                <button 
                                                    onClick={() => router.get('/students')}
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
                {students.links && students.links.length > 3 && (
                    <div className="px-6 py-4 border-t">
                        <div className="flex justify-center space-x-2">
                            {students.links.map((link, index) => (
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