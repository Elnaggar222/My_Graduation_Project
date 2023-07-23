<?php
namespace App\Http\Middleware;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;
use Illuminate\Support\Facades\Auth;
class Authenticatehospital extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    // public function handle($request, Closure $next, ...$guards)
    // {
    //     if (!Auth::check()) {
    //         return redirect()->route('login');
    //     }

    //     if (Auth::user()->role == 'hospital') {
    //         return redirect()->route('hospital');
    //     }

    //     if (Auth::user()->role == 'doctor') {
    //         return $next($request);
    //     }
    //     if (Auth::user()->role == 'patient') {
    //         return $next($request);
    //     }

    //     if (Auth::user()->role == 'admin') {
    //         return redirect()->route('admin');
    //     }
    // }

    // protected function redirectTo($request)
    // {
    //     if (! $request->expectsJson()) {
    //         return route('login');
    //     }
    // }
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

}

// "user", "admin", "doctor","patient","hospital"