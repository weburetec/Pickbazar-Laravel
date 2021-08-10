<?php


namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\Address;

class AddressRepository extends BaseRepository
{
    /**
     * Configure the Model
     **/
    public function model()
    {
        return Address::class;
    }
}
