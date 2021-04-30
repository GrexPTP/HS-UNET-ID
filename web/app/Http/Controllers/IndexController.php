<?php

    namespace App\Http\Controllers;

    class IndexController extends Controller
    {
        public function index()
        {
            return view('login');
        }

        public function dashboard()
        {
            return view('dashboard');
        }
    }
