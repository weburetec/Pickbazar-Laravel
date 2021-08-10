<?php


namespace PickBazar\GraphQL\Mutation;

use Illuminate\Support\Facades\Log;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Facades\Shop;

class OrderMutator
{

    public function store($rootValue, array $args, GraphQLContext $context)
    {
        try {
            return Shop::call('PickBazar\Http\Controllers\OrderController@store', $args);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }
    public function update($rootValue, array $args, GraphQLContext $context)
    {
        try {
            return Shop::call('PickBazar\Http\Controllers\OrderController@updateOrder', $args);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }
}
