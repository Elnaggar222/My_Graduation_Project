<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticateadmin extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }
    // protected function credentials(\Illuminate\Http\Request $request)
    // {
    //     return ['email' => $request->email, 'password' => $request->password, 'status' => 'مفعل'];
    // }//is_admin=>true

}
