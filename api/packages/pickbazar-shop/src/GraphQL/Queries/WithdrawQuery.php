<?php


namespace PickBazar\GraphQL\Queries;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use PickBazar\Facades\Shop;

class WithdrawQuery
{
    public function fetchWithdraws($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('PickBazar\Http\Controllers\WithdrawController@fetchWithdraws', $args);
    }

    public function fetchSingleWithdraw($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('PickBazar\Http\Controllers\WithdrawController@fetchSingleWithdraw', $args);
    }
}
