<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TransferDocument
 *
 * @property int $id
 * @property int $transfer_request_id
 * @property string $document_name
 * @property string $document_type
 * @property string $file_path
 * @property string $file_type
 * @property int $file_size
 * @property int $uploaded_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\TransferRequest $transferRequest
 * @property-read \App\Models\User $uploader
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument query()
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereDocumentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereTransferRequestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransferDocument whereUploadedBy($value)
 * @method static \Database\Factories\TransferDocumentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TransferDocument extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'transfer_request_id',
        'document_name',
        'document_type',
        'file_path',
        'file_type',
        'file_size',
        'uploaded_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the transfer request for the document.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function transferRequest(): BelongsTo
    {
        return $this->belongsTo(TransferRequest::class);
    }

    /**
     * Get the user who uploaded the document.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}