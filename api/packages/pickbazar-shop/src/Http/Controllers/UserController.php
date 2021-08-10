<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PickBazar\Database\Repositories\UserRepository;
use Illuminate\Validation\ValidationException;
use PickBazar\Database\Models\User;
use Illuminate\Support\Facades\Hash;
use PickBazar\Http\Requests\UserCreateRequest;
use PickBazar\Http\Requests\UserUpdateRequest;
use PickBazar\Enums\Permission;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use PickBazar\Http\Requests\ChangePasswordRequest;
use PickBazar\Mail\ContactAdmin;
use PickBazar\Database\Models\Permission as ModelsPermission;
use PickBazar\Exceptions\PickbazarException;

class UserController extends CoreController
{
    public $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['profile', 'address'])->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *Í
     * @param UserCreateRequest $request
     * @return bool[]
     */
    public function store(UserCreateRequest $request)
    {
        return $this->repository->storeUser($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return array
     */
    public function show($id)
    {
        try {
            $user = $this->repository->with(['profile', 'address', 'shop', 'managed_shop'])->findOrFail($id);
            return $user;
        } catch (Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(UserUpdateRequest $request, $id)
    {
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
            $user = $this->repository->findOrFail($id);
            return $this->repository->updateUser($request, $user);
        } elseif ($request->user()->id == $id) {
            $user = $request->user();
            return $this->repository->updateUser($request, $user);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    public function me(Request $request)
    {
        $user = $request->user();

        if (isset($user)) {
            return $this->repository->with(['profile', 'address', 'shops.balance', 'managed_shop.balance'])->find($user->id);
        }
        throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
    }

    public function token(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->where('is_active', true)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ["token" => null, "permissions" => []];
        }
        return ["token" => $user->createToken('auth_token')->plainTextToken, "permissions" => $user->getPermissionNames()];
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return true;
        }
        return $request->user()->currentAccessToken()->delete();
    }

    public function register(UserCreateRequest $request)
    {
        $permissions = [Permission::CUSTOMER];
        if (isset($request->permission)) {
            $permissions[] = isset($request->permission->value) ? $request->permission->value : $request->permission;
        }
        $user = $this->repository->create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->givePermissionTo($permissions);

        return ["token" => $user->createToken('auth_token')->plainTextToken, "permissions" => $user->getPermissionNames()];
    }

    public function banUser(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && $user->id != $request->id) {
            $banUser =  User::find($request->id);
            $banUser->is_active = false;
            $banUser->save();
            return $banUser;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }
    public function activeUser(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && $user->id != $request->id) {
            $activeUser =  User::find($request->id);
            $activeUser->is_active = true;
            $activeUser->save();
            return $activeUser;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function forgetPassword(Request $request)
    {
        $user = $this->repository->findByField('email', $request->email);
        if (count($user) < 1) {
            return ['message' => 'PICKBAZAR_MESSAGE.NOT_FOUND', 'success' => false];
        }
        $tokenData = DB::table('password_resets')
            ->where('email', $request->email)->first();
        if (!$tokenData) {
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => Str::random(16),
                'created_at' => Carbon::now()
            ]);
            $tokenData = DB::table('password_resets')
                ->where('email', $request->email)->first();
        }

        if ($this->repository->sendResetEmail($request->email, $tokenData->token)) {
            return ['message' => 'PICKBAZAR_MESSAGE.CHECK_INBOX_FOR_PASSWORD_RESET_EMAIL', 'success' => true];
        } else {
            return ['message' => 'PICKBAZAR_MESSAGE.SOMETHING_WENT_WRONG', 'success' => false];
        }
    }
    public function verifyForgetPasswordToken(Request $request)
    {
        $tokenData = DB::table('password_resets')->where('token', $request->token)->first();
        $user = $this->repository->findByField('email', $request->email);
        if (!$tokenData) {
            return ['message' => 'PICKBAZAR_MESSAGE.INVALID_TOKEN', 'success' => false];
        }
        $user = $this->repository->findByField('email', $request->email);
        if (count($user) < 1) {
            return ['message' => 'PICKBAZAR_MESSAGE.NOT_FOUND', 'success' => false];
        }
        return ['message' => 'PICKBAZAR_MESSAGE.TOKEN_IS_VALID', 'success' => true];
    }
    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required|string',
                'email' => 'email|required',
                'token' => 'required|string'
            ]);

            $user = $this->repository->where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            DB::table('password_resets')->where('email', $user->email)->delete();

            return ['message' => 'PICKBAZAR_MESSAGE.PASSWORD_RESET_SUCCESSFUL', 'success' => true];
        } catch (\Exception $th) {
            return ['message' => 'PICKBAZAR_MESSAGE.SOMETHING_WENT_WRONG', 'success' => false];
        }
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $user = $request->user();
            if (Hash::check($request->oldPassword, $user->password)) {
                $user->password = Hash::make($request->newPassword);
                $user->save();
                return ['message' => 'PICKBAZAR_MESSAGE.PASSWORD_RESET_SUCCESSFUL', 'success' => true];
            } else {
                return ['message' => 'PICKBAZAR_MESSAGE.OLD_PASSWORD_INCORRECT', 'success' => false];
            }
        } catch (\Exception $th) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }
    public function contactAdmin(Request $request)
    {
        try {
            $details = $request->only('subject', 'name', 'email', 'description');
            Mail::to(config('shop.admin_email'))->send(new ContactAdmin($details));
            return ['message' => 'PICKBAZAR_MESSAGE.EMAIL_SENT_SUCCESSFUL', 'success' => true];
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function fetchStaff(Request $request)
    {
        if (!isset($request->shop_id)) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
        if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            return $this->repository->with(['profile'])->where('shop_id', '=', $request->shop_id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function staffs(Request $request)
    {
        $query = $this->fetchStaff($request);
        $limit = $request->limit ?? 15;
        return $query->paginate($limit);
    }

    public function socialLogin(Request $request)
    {
        $provider = $request->provider;
        $token = $request->access_token;
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }
        try {
            $user = Socialite::driver($provider)->userFromToken($token);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.INVALID_CREDENTIALS');
        }
        $userCreated = User::firstOrCreate(
            [
                'email' => $user->getEmail()
            ],
            [
                'email_verified_at' => now(),
                'name' => $user->getName(),
            ]
        );
        $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_user_id' => $user->getId(),
            ]
        );

        $avatar = [
            'thumbnail' => $user->getAvatar(),
            'original' => $user->getAvatar(),
        ];

        $userCreated->profile()->updateOrCreate(
            [
                'avatar' => $avatar
            ]
        );

        if (!$userCreated->hasPermissionTo(Permission::CUSTOMER)) {
            $userCreated->givePermissionTo(Permission::CUSTOMER);
        }

        return ["token" => $userCreated->createToken('auth_token')->plainTextToken, "permissions" => $userCreated->getPermissionNames()];
    }

    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['facebook', 'google'])) {
            throw new PickbazarException('PICKBAZAR_ERROR.PLEASE_LOGIN_USING_FACEBOOK_OR_GOOGLE');
        }
    }
}
