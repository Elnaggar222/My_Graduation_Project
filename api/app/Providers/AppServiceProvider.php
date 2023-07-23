<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;//

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
{
    Response::macro('api', function ($data = null, $message = null, $statusCode = 200) {
        $response = [
            'data' => $data,
            'message' => $message,
            'status_code' => $statusCode,
        ];
        return response()->json($response, $statusCode);
    });
}

}
