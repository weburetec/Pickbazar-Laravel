<?php

namespace Pickbazar\Console;

use Illuminate\Console\Command;
use PickBazar\Database\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use PickBazar\Enums\Permission as UserPermission;
use Illuminate\Support\Facades\Validator;




class AdminCreateCommand extends Command
{
    protected $signature = 'pickbazar:create-admin';

    protected $description = 'Create an admin user.';
    public function handle()
    {
        try {
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

            Permission::firstOrCreate(['name' => UserPermission::SUPER_ADMIN]);
            Permission::firstOrCreate(['name' => UserPermission::CUSTOMER]);
            Permission::firstOrCreate(['name' => UserPermission::STORE_OWNER]);
            Permission::firstOrCreate(['name' => UserPermission::STAFF]);

            $name = 'admin';
            $email = "admin@redq.io";
            $password = "password";

            $validator = Validator::make(
                [
                    'name' =>  $name,
                    'email' =>  $email,
                    'password' =>  $password,
                ],
                [
                    'name'     => 'required|string',
                    'email'    => 'required|email|unique:users,email',
                    'password' => 'required',
                ]
            );
            if ($validator->fails()) {
                $this->info('User not created. See error messages below:');
                foreach ($validator->errors()->all() as $error) {
                    $this->error($error);
                }
                return;
            }
            $user = User::create([
                'name' =>  $name,
                'email' =>  $email,
                'password' =>  Hash::make($password),
            ]);
            $user->givePermissionTo(
                [
                    UserPermission::SUPER_ADMIN,
                    UserPermission::STORE_OWNER,
                    UserPermission::CUSTOMER,
                ]
            );
            $this->info('User Creation Successful!');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
