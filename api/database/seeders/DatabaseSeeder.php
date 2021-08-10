<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\Attribute;
use PickBazar\Database\Models\AttributeValue;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Category;
use PickBazar\Database\Models\Type;
use PickBazar\Database\Models\Order;
use PickBazar\Database\Models\OrderStatus;
use PickBazar\Database\Models\Coupon;
use Spatie\Permission\Models\Permission;
use PickBazar\Enums\Permission as UserPermission;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // run your app seeder
    }
}
