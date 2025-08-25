<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransferRequestRequest;
use App\Http\Requests\UpdateTransferRequestRequest;
use App\Models\Student;
use App\Models\TransferRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransferRequestController extends Controller
{
    /**
     * Display a listing of transfer requests.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = TransferRequest::with(['student', 'initiator', 'verifier', 'approver']);
        
        // Filter based on user role
        if ($user->isTeacher()) {
            $query->where('initiated_by', $user->id);
        }
        
        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->filled('transfer_type')) {
            $query->where('transfer_type', $request->transfer_type);
        }
        
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('student', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%");
            });
        }
        
        $transfers = $query->latest()->paginate(15);
        
        return Inertia::render('transfers/index', [
            'transfers' => $transfers,
            'filters' => $request->only(['status', 'transfer_type', 'search']),
            'user' => $user,
        ]);
    }

    /**
     * Show the form for creating a new transfer request.
     */
    public function create()
    {
        $students = Student::active()->orderBy('name')->get();
        
        return Inertia::render('transfers/create', [
            'students' => $students,
        ]);
    }

    /**
     * Store a newly created transfer request.
     */
    public function store(StoreTransferRequestRequest $request)
    {
        $transfer = TransferRequest::create([
            ...$request->validated(),
            'initiated_by' => auth()->id(),
            'status' => 'submitted',
        ]);

        return redirect()->route('transfers.show', $transfer)
            ->with('success', 'Transfer request submitted successfully.');
    }

    /**
     * Display the specified transfer request.
     */
    public function show(TransferRequest $transfer)
    {
        $transfer->load(['student', 'initiator', 'verifier', 'approver', 'documents.uploader']);
        
        return Inertia::render('transfers/show', [
            'transfer' => $transfer,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for editing the specified transfer request.
     */
    public function edit(TransferRequest $transfer)
    {
        // Only allow editing if status is submitted and user is the initiator or school admin
        $user = auth()->user();
        if ($transfer->status !== 'submitted' && !($user->isSchoolAdmin() || $transfer->initiated_by === $user->id)) {
            return redirect()->route('transfers.show', $transfer)
                ->with('error', 'Transfer request cannot be edited.');
        }
        
        $students = Student::active()->orderBy('name')->get();
        
        return Inertia::render('transfers/edit', [
            'transfer' => $transfer,
            'students' => $students,
        ]);
    }

    /**
     * Update the specified transfer request.
     */
    public function update(UpdateTransferRequestRequest $request, TransferRequest $transfer)
    {
        $user = auth()->user();
        
        // Check permissions
        if ($transfer->status !== 'submitted' && !($user->isSchoolAdmin() || $transfer->initiated_by === $user->id)) {
            return redirect()->route('transfers.show', $transfer)
                ->with('error', 'Transfer request cannot be updated.');
        }
        
        $transfer->update($request->validated());

        return redirect()->route('transfers.show', $transfer)
            ->with('success', 'Transfer request updated successfully.');
    }

    /**
     * Remove the specified transfer request.
     */
    public function destroy(TransferRequest $transfer)
    {
        $user = auth()->user();
        
        // Only school admin or the initiator can delete, and only if status is submitted
        if (!($user->isSchoolAdmin() || $transfer->initiated_by === $user->id) || $transfer->status !== 'submitted') {
            return redirect()->route('transfers.index')
                ->with('error', 'Transfer request cannot be deleted.');
        }
        
        $transfer->delete();

        return redirect()->route('transfers.index')
            ->with('success', 'Transfer request deleted successfully.');
    }


}