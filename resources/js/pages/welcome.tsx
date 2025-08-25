import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Student Transfer Management System - SD PLUS NURUL AULIA" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 text-white p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">SD PLUS NURUL AULIA</h1>
                                    <p className="text-sm text-gray-600">Student Transfer Management</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <Link 
                                    href="/login" 
                                    className="text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    Login
                                </Link>
                                <Button asChild>
                                    <Link href="/register">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <span className="text-5xl">🎓</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Sistem Mutasi Siswa
                            <span className="block text-blue-600">SD PLUS NURUL AULIA</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Platform digital terpadu untuk mengelola proses mutasi siswa dengan workflow yang terstruktur, 
                            dokumentasi lengkap, dan pelaporan yang komprehensif.
                        </p>
                        
                        <div className="flex justify-center space-x-4">
                            <Button size="lg" asChild>
                                <Link href="/login">
                                    🚀 Mulai Sekarang
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/register">
                                    📝 Daftar Akun
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Role Management</h3>
                            <p className="text-gray-600">
                                Akses berbeda untuk Admin Sekolah, Guru, dan Operator Dinas dengan hak akses yang terstruktur.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Dashboard Analytics</h3>
                            <p className="text-gray-600">
                                Statistik real-time dan grafik bulanan untuk memantau mutasi siswa masuk dan keluar.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-4">🔄</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Workflow Management</h3>
                            <p className="text-gray-600">
                                Proses verifikasi dan persetujuan bertingkat dengan tracking status yang jelas.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-4">📄</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Document Management</h3>
                            <p className="text-gray-600">
                                Upload dan kelola dokumen pendukung dengan format PDF/JPG yang aman.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Reports</h3>
                            <p className="text-gray-600">
                                Laporan komprehensif dengan filter dan ekspor ke Excel/PDF untuk arsip.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-4">🔔</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Notifications</h3>
                            <p className="text-gray-600">
                                Notifikasi otomatis untuk status mutasi dan reminder untuk proses yang pending.
                            </p>
                        </div>
                    </div>

                    {/* Process Flow */}
                    <div className="bg-white rounded-xl shadow-sm border p-8 mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                            📋 Alur Proses Mutasi
                        </h3>
                        
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                                    1️⃣
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Pengajuan</h4>
                                <p className="text-sm text-gray-600">Guru/Admin mengajukan mutasi dengan dokumen lengkap</p>
                            </div>
                            
                            <div className="text-gray-400 text-2xl md:rotate-0 rotate-90">➡️</div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                                    2️⃣
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Verifikasi</h4>
                                <p className="text-sm text-gray-600">Admin Sekolah melakukan verifikasi dokumen</p>
                            </div>
                            
                            <div className="text-gray-400 text-2xl md:rotate-0 rotate-90">➡️</div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                                    3️⃣
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Persetujuan</h4>
                                <p className="text-sm text-gray-600">Kepala Sekolah/Dinas memberikan persetujuan final</p>
                            </div>
                            
                            <div className="text-gray-400 text-2xl md:rotate-0 rotate-90">➡️</div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                                    4️⃣
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Selesai</h4>
                                <p className="text-sm text-gray-600">Cetak surat rekomendasi dan arsip digital</p>
                            </div>
                        </div>
                    </div>

                    {/* User Roles */}
                    <div className="bg-white rounded-xl shadow-sm border p-8 mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                            🎭 Peran Pengguna
                        </h3>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                    👨‍💼
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Admin Sekolah</h4>
                                <ul className="text-sm text-gray-600 space-y-2 text-left">
                                    <li>✅ Kelola data siswa lengkap</li>
                                    <li>✅ Verifikasi dokumen mutasi</li>
                                    <li>✅ Setujui proses transfer</li>
                                    <li>✅ Akses laporan komprehensif</li>
                                    <li>✅ Manajemen user (kecuali admin)</li>
                                </ul>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                    👨‍🏫
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Guru</h4>
                                <ul className="text-sm text-gray-600 space-y-2 text-left">
                                    <li>✅ Lihat data siswa di kelas</li>
                                    <li>✅ Ajukan mutasi siswa</li>
                                    <li>✅ Upload dokumen pendukung</li>
                                    <li>✅ Pantau status pengajuan</li>
                                    <li>✅ Laporan siswa terkait</li>
                                </ul>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                    👨‍💻
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Operator Dinas</h4>
                                <ul className="text-sm text-gray-600 space-y-2 text-left">
                                    <li>✅ Pantau semua mutasi</li>
                                    <li>✅ Persetujuan final transfer</li>
                                    <li>✅ Akses laporan wilayah</li>
                                    <li>✅ Monitoring lintas sekolah</li>
                                    <li>✅ Arsip data regional</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-xl">
                        <h3 className="text-3xl font-bold mb-4">🚀 Siap untuk Memulai?</h3>
                        <p className="text-xl mb-8 opacity-90">
                            Bergabunglah dengan sistem mutasi siswa modern yang efisien dan terintegrasi
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button variant="secondary" size="lg" asChild>
                                <Link href="/login">
                                    🔑 Login ke Dashboard
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                <Link href="/register">
                                    📋 Daftar Sekarang
                                </Link>
                            </Button>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-gray-400">
                                © 2024 SD PLUS NURUL AULIA - Sistem Mutasi Siswa
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Platform terintegrasi untuk pengelolaan mutasi siswa yang efisien dan transparan
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}