<?php

return [

    // The default gateway to use
    'default'  => 'stripe',

    // Add in each gateway here
    'gateways' => [
        'paypal' => [
            'driver'  => 'PayPal_Express',
            'options' => [
                'solutionType'   => '',
                'landingPage'    => '',
                'headerImageUrl' => '',
                'testMode'       => env('OMNIPAY_TEST_MODE', true)

            ]
        ],
        'stripe' => [
            'driver'  => 'Stripe',
            'options' => [
                'apiKey'   => env('STRIPE_API_KEY', config('shop.stripe_api_key')),
                'testMode' => env('OMNIPAY_TEST_MODE', true)
            ]
        ]
    ]

];
