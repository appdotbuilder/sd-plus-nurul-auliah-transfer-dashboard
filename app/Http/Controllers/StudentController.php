<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of students.
     */
    public function index(Request $request)
    {
        $query = Student::with('transferRequests');
        
        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->filled('class')) {
            $query->where('current_class', $request->class);
        }
        
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%")
                  ->orWhere('parent_name', 'like', "%{$search}%");
            });
        }
        
        $students = $query->latest()->paginate(15);
        
        // Get unique classes for filter
        $classes = Student::whereNotNull('current_class')
            ->distinct()
            ->pluck('current_class')
            ->sort()
            ->values();
        
        return Inertia::render('students/index', [
            'students' => $students,
            'classes' => $classes,
            'filters' => $request->only(['status', 'class', 'search']),
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new student.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created student.
     */
    public function store(StoreStudentRequest $request)
    {
        $student = Student::create($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Student data created successfully.');
    }

    /**
     * Display the specified student.
     */
    public function show(Student $student)
    {
        $student->load(['transferRequests.initiator', 'transferRequests.verifier', 'transferRequests.approver']);
        
        return Inertia::render('students/show', [
            'student' => $student,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for editing the specified student.
     */
    public function edit(Student $student)
    {
        $user = auth()->user();
        
        // Check if user has permission to edit
        if ($user->isTeacher() && $student->current_class !== $user->class_assigned) {
            return redirect()->route('students.show', $student)
                ->with('error', 'You can only edit students from your assigned class.');
        }
        
        return Inertia::render('students/edit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified student.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $user = auth()->user();
        
        // Check if user has permission to edit
        if ($user->isTeacher() && $student->current_class !== $user->class_assigned) {
            return redirect()->route('students.show', $student)
                ->with('error', 'You can only edit students from your assigned class.');
        }
        
        $student->update($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Student data updated successfully.');
    }

    /**
     * Remove the specified student.
     */
    public function destroy(Student $student)
    {
        $user = auth()->user();
        
        // Only school admin can delete students
        if (!$user->isSchoolAdmin()) {
            return redirect()->route('students.index')
                ->with('error', 'You do not have permission to delete student data.');
        }
        
        // Check if student has transfer requests
        if ($student->transferRequests()->exists()) {
            return redirect()->route('students.index')
                ->with('error', 'Cannot delete student with existing transfer requests.');
        }
        
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student data deleted successfully.');
    }
}