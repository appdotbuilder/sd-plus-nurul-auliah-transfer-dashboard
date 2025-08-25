<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\TransferRequest
 *
 * @property int $id
 * @property int $student_id
 * @property int $initiated_by
 * @property int|null $verified_by
 * @property int|null $approved_by
 * @property string $transfer_type
 * @property string $origin_school
 * @property string $destination_school
 * @property string $transfer_reason
 * @property \Illuminate\Support\Carbon $transfer_date
 * @property string $status
 * @property string|null $verification_notes
 * @property string|null $approval_notes
 * @property \Illuminate\Support\Carbon|null $verified_at
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Student $student
 * @property-read \App\Models\User $initiator
 * @property-read \App\Models\User|null $verifier
 * @property-read \App\Models\User|null $approver
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TransferDocument> $documents
 * @property-read int|null $documents_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereApprovalNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereDestinationSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereInitiatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereOriginSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereTransferDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereTransferReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereTransferType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereVerifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest whereVerificationNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|TransferRequest byType(string $type)
 * @method static \Database\Factories\TransferRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TransferRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'initiated_by',
        'verified_by',
        'approved_by',
        'transfer_type',
        'origin_school',
        'destination_school',
        'transfer_reason',
        'transfer_date',
        'status',
        'verification_notes',
        'approval_notes',
        'verified_at',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'transfer_date' => 'date',
        'verified_at' => 'datetime',
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student for the transfer request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the user who initiated the transfer request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function initiator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'initiated_by');
    }

    /**
     * Get the user who verified the transfer request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Get the user who approved the transfer request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get all documents for the transfer request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function documents(): HasMany
    {
        return $this->hasMany(TransferDocument::class);
    }

    /**
     * Scope a query to only include pending transfer requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->whereIn('status', ['submitted', 'verified']);
    }

    /**
     * Scope a query to filter by transfer type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByType($query, string $type)
    {
        return $query->where('transfer_type', $type);
    }
}