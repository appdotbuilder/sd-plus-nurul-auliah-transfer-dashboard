<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Student
 *
 * @property int $id
 * @property string $name
 * @property string $nisn
 * @property \Illuminate\Support\Carbon $birth_date
 * @property string $birth_place
 * @property string $gender
 * @property string $address
 * @property string $parent_name
 * @property string $parent_phone
 * @property string|null $current_class
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TransferRequest> $transferRequests
 * @property-read int|null $transfer_requests_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereBirthPlace($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCurrentClass($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNisn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereParentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereParentPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student active()
 * @method static \Database\Factories\StudentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'nisn',
        'birth_date',
        'birth_place',
        'gender',
        'address',
        'parent_name',
        'parent_phone',
        'current_class',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all transfer requests for the student.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transferRequests(): HasMany
    {
        return $this->hasMany(TransferRequest::class);
    }

    /**
     * Scope a query to only include active students.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}