<?php

namespace PickBazar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class OrderCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'status'           => 'required|exists:PickBazar\Database\Models\OrderStatus,id',
            'coupon_id'        => 'nullable|exists:PickBazar\Database\Models\Coupon,id',
            'shop_id'          => 'nullable|exists:PickBazar\Database\Models\Shop,id',
            'amount'           => 'required|numeric',
            'paid_total'       => 'required|numeric',
            'total'            => 'required|numeric',
            'delivery_time'    => 'nullable|string|required',
            'customer_contact' => 'string|required',
            'payment_gateway'  => 'string|required',
            'products'         => 'required|array',
            'card'             => 'array',
            'shipping_address' => 'array',
            'billing_address'  => 'array',
        ];
    }


    public function failedValidation(Validator $validator)
    {
        // TODO: Need to check from the request if it's coming from GraphQL API or not.
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
