<?php


namespace PickBazar\GraphQL\Queries;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use PickBazar\Facades\Shop;

class ShopQuery
{
    public function fetchShops($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('PickBazar\Http\Controllers\ShopController@fetchShops', $args);
    }
}
