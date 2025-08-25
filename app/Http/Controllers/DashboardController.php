<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\TransferRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with statistics and charts.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get basic statistics
        $stats = $this->getStatistics($user);
        
        // Get monthly transfer data for charts
        $monthlyData = $this->getMonthlyTransferData();
        
        // Get recent transfer requests
        $recentTransfers = $this->getRecentTransfers($user);
        
        // Get pending notifications
        $pendingNotifications = $this->getPendingNotifications($user);
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'monthlyData' => $monthlyData,
            'recentTransfers' => $recentTransfers,
            'pendingNotifications' => $pendingNotifications,
            'user' => $user,
        ]);
    }

    /**
     * Get dashboard statistics based on user role.
     *
     * @param  \App\Models\User  $user
     * @return array
     */
    protected function getStatistics($user)
    {
        $baseQuery = TransferRequest::query();
        
        // Filter based on user role
        if ($user->isTeacher()) {
            $baseQuery->where('initiated_by', $user->id);
        }
        
        return [
            'total_students' => Student::active()->count(),
            'incoming_transfers' => (clone $baseQuery)->where('transfer_type', 'incoming')->count(),
            'outgoing_transfers' => (clone $baseQuery)->where('transfer_type', 'outgoing')->count(),
            'pending_requests' => (clone $baseQuery)->where('status', 'submitted')->count(),
            'verified_requests' => (clone $baseQuery)->where('status', 'verified')->count(),
            'approved_requests' => (clone $baseQuery)->where('status', 'approved')->count(),
            'rejected_requests' => (clone $baseQuery)->where('status', 'rejected')->count(),
        ];
    }

    /**
     * Get monthly transfer data for the last 12 months.
     *
     * @return array
     */
    protected function getMonthlyTransferData()
    {
        $months = [];
        $incomingData = [];
        $outgoingData = [];
        
        for ($i = 11; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $months[] = $date->format('M Y');
            
            $incoming = TransferRequest::where('transfer_type', 'incoming')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
                
            $outgoing = TransferRequest::where('transfer_type', 'outgoing')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
                
            $incomingData[] = $incoming;
            $outgoingData[] = $outgoing;
        }
        
        return [
            'months' => $months,
            'incoming' => $incomingData,
            'outgoing' => $outgoingData,
        ];
    }

    /**
     * Get recent transfer requests based on user role.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Database\Eloquent\Collection
     */
    protected function getRecentTransfers($user)
    {
        $query = TransferRequest::with(['student', 'initiator'])
            ->orderBy('created_at', 'desc')
            ->limit(10);
            
        if ($user->isTeacher()) {
            $query->where('initiated_by', $user->id);
        }
        
        return $query->get();
    }

    /**
     * Get pending notifications based on user role.
     *
     * @param  \App\Models\User  $user
     * @return array
     */
    protected function getPendingNotifications($user)
    {
        $notifications = [];
        
        if ($user->isSchoolAdmin()) {
            $pendingVerification = TransferRequest::where('status', 'submitted')->count();
            if ($pendingVerification > 0) {
                $notifications[] = [
                    'type' => 'verification',
                    'message' => "$pendingVerification transfer request(s) waiting for verification",
                    'count' => $pendingVerification,
                ];
            }
            
            $pendingApproval = TransferRequest::where('status', 'verified')->count();
            if ($pendingApproval > 0) {
                $notifications[] = [
                    'type' => 'approval',
                    'message' => "$pendingApproval transfer request(s) waiting for approval",
                    'count' => $pendingApproval,
                ];
            }
        }
        
        if ($user->isDistrictOperator()) {
            $pendingFinalApproval = TransferRequest::where('status', 'verified')->count();
            if ($pendingFinalApproval > 0) {
                $notifications[] = [
                    'type' => 'final_approval',
                    'message' => "$pendingFinalApproval transfer request(s) waiting for final approval",
                    'count' => $pendingFinalApproval,
                ];
            }
        }
        
        return $notifications;
    }
}