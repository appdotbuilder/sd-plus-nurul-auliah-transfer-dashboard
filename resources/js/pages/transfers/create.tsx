import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface Student {
    id: number;
    name: string;
    nisn: string;
    current_class: string;
}

interface TransferFormData {
    student_id: string;
    transfer_type: string;
    origin_school: string;
    destination_school: string;
    transfer_reason: string;
    transfer_date: string;
    [key: string]: string;
}

interface Props {
    students: Student[];
    [key: string]: unknown;
}

export default function CreateTransfer({ students }: Props) {
    const { data, setData, post, processing, errors } = useForm<TransferFormData>({
        student_id: '',
        transfer_type: '',
        origin_school: 'SD PLUS NURUL AULIA',
        destination_school: '',
        transfer_reason: '',
        transfer_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transfers');
    };

    const handleTransferTypeChange = (type: string) => {
        setData(prevData => ({
            ...prevData,
            transfer_type: type,
            origin_school: type === 'outgoing' ? 'SD PLUS NURUL AULIA' : '',
            destination_school: type === 'incoming' ? 'SD PLUS NURUL AULIA' : '',
        }));
    };

    return (
        <AppShell>
            <Head title="Ajukan Mutasi - SD PLUS NURUL AULIA" />
            
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <Button variant="outline" asChild>
                        <Link href="/transfers">
                            ← Kembali
                        </Link>
                    </Button>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900">➕ Ajukan Mutasi Siswa</h1>
                <p className="text-gray-600 mt-1">
                    Lengkapi formulir untuk mengajukan mutasi siswa masuk atau keluar
                </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        📝 Formulir Pengajuan Mutasi
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Student Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            👤 Pilih Siswa <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.student_id}
                            onChange={(e) => setData('student_id', e.target.value)}
                            required
                        >
                            <option value="">Pilih siswa...</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name} - {student.nisn} ({student.current_class})
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.student_id} className="mt-1" />
                    </div>

                    {/* Transfer Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            🔄 Jenis Mutasi <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div 
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                    data.transfer_type === 'incoming' 
                                        ? 'border-green-500 bg-green-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onClick={() => handleTransferTypeChange('incoming')}
                            >
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="transfer_type"
                                        value="incoming"
                                        checked={data.transfer_type === 'incoming'}
                                        onChange={() => handleTransferTypeChange('incoming')}
                                        className="text-green-600"
                                    />
                                    <div>
                                        <div className="font-medium text-gray-900">📥 Mutasi Masuk</div>
                                        <div className="text-sm text-gray-600">
                                            Siswa pindah dari sekolah lain ke SD PLUS NURUL AULIA
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div 
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                    data.transfer_type === 'outgoing' 
                                        ? 'border-orange-500 bg-orange-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onClick={() => handleTransferTypeChange('outgoing')}
                            >
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="transfer_type"
                                        value="outgoing"
                                        checked={data.transfer_type === 'outgoing'}
                                        onChange={() => handleTransferTypeChange('outgoing')}
                                        className="text-orange-600"
                                    />
                                    <div>
                                        <div className="font-medium text-gray-900">📤 Mutasi Keluar</div>
                                        <div className="text-sm text-gray-600">
                                            Siswa pindah dari SD PLUS NURUL AULIA ke sekolah lain
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <InputError message={errors.transfer_type} className="mt-1" />
                    </div>

                    {/* School Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🏫 Sekolah Asal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.origin_school}
                                onChange={(e) => setData('origin_school', e.target.value)}
                                placeholder="Nama sekolah asal"
                                required
                                readOnly={data.transfer_type === 'outgoing'}
                            />
                            <InputError message={errors.origin_school} className="mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🎯 Sekolah Tujuan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.destination_school}
                                onChange={(e) => setData('destination_school', e.target.value)}
                                placeholder="Nama sekolah tujuan"
                                required
                                readOnly={data.transfer_type === 'incoming'}
                            />
                            <InputError message={errors.destination_school} className="mt-1" />
                        </div>
                    </div>

                    {/* Transfer Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📅 Tanggal Mutasi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.transfer_date}
                            onChange={(e) => setData('transfer_date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                        <InputError message={errors.transfer_date} className="mt-1" />
                        <p className="text-sm text-gray-600 mt-1">
                            Tanggal efektif mutasi siswa
                        </p>
                    </div>

                    {/* Transfer Reason */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📄 Alasan Mutasi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            value={data.transfer_reason}
                            onChange={(e) => setData('transfer_reason', e.target.value)}
                            placeholder="Jelaskan alasan mutasi siswa dengan detail..."
                            required
                        />
                        <InputError message={errors.transfer_reason} className="mt-1" />
                        <p className="text-sm text-gray-600 mt-1">
                            Berikan penjelasan yang jelas mengenai alasan mutasi
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Button type="button" variant="outline" asChild>
                            <Link href="/transfers">
                                ❌ Batal
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>🔄 Memproses...</>
                            ) : (
                                <>✅ Ajukan Mutasi</>
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Help Information */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    ℹ️ Informasi Penting
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Pastikan semua data yang diisi sudah benar sebelum mengajukan</li>
                    <li>• Setelah diajukan, permintaan akan masuk ke tahap verifikasi oleh Admin Sekolah</li>
                    <li>• Siapkan dokumen pendukung yang mungkin diperlukan untuk proses verifikasi</li>
                    <li>• Status pengajuan dapat dipantau melalui halaman daftar mutasi</li>
                    <li>• Hubungi admin jika memerlukan bantuan dalam proses pengajuan</li>
                </ul>
            </div>
        </AppShell>
    );
}