<?php


namespace PickBazar\GraphQL\Mutation;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use PickBazar\Http\Controllers\OrderStatusController;
use PickBazar\Facades\Shop;

class OrderStatusMutator
{

    public function store($rootValue, array $args, GraphQLContext $context)
    {

        // Do graphql stuff
        return Shop::call('PickBazar\Http\Controllers\OrderStatusController@store', $args);
    }
}
