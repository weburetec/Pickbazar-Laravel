<?php


namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;

class Type extends Model
{

    use Sluggable;

    protected $table = 'types';

    public $guarded = [];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ]
        ];
    }

    protected $casts = [
        'image'   => 'json',
    ];

    // protected static function boot()
    // {
    //     parent::boot();
    //     // Order by updated_at desc
    //     static::addGlobalScope('order', function (Builder $builder) {
    //         $builder->orderBy('updated_at', 'desc');
    //     });
    // }

    /**
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'type_id');
    }

    /**
     * @return HasMany
     */
    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'type_id');
    }
}
