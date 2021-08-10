<?php


namespace PickBazar\Database\Repositories;


use PickBazar\Database\Models\Attachment;

class AttachmentRepository extends BaseRepository
{
    /**
     * Configure the Model
     **/
    public function model()
    {
        return Attachment::class;
    }
}
