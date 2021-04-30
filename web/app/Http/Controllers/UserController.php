<?php

namespace App\Http\Controllers;

use App\City;
use App\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->orderByDesc('created_at')->paginate(5);
        return view('users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create()
    {
        $cities = City::all();
        $roles = Role::all();
        return view('users.create', compact('cities', 'roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge([
            'password' => Hash::make('123456')
        ]);
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users|max:255',
            'password' => 'required|max:255',
            'name' => 'required|max:255',
            'phone' => 'sometimes|numeric',
            'email' => 'sometimes|email|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'birth_date' => 'required|date',
            'role_id' => 'required|exists:roles,id',
            'city_id' => 'required|exists:cities,id',
        ]);

        if ($validator->fails()) {
            return redirect(route('users.create'))->withErrors($validator)->withInput();
        }


        $parameters = $request->except('profile_image');

        $profileImage = null;
        if ($request->hasFile('profile_image')) {
            $profileImage = ImageProcessingController::saveImageToServer('profile-image-hunet-1', $request->file('profile_image'));
            $parameters['profile_image'] = $profileImage;
        }

        User::create($parameters);
        return redirect()->route('users.index')->with(['message' => 'user ' . ($request->name ?? '') . ' created']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     */
    public function show($id)
    {
        $user = User::find($id);
        return view('users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     */
    public function edit($id)
    {
        $user = User::find($id);
        $cities = City::all();
        $roles = Role::all();
        if (!$user) {
            return redirect()->back()->with(['message' => 'This user is not exist']);
        }
        return view('users.edit', compact('user', 'cities', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->merge([
            'id' => $id,
        ]);
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:App\user,id',
            'name' => 'required|max:255',
            'phone' => 'sometimes|numeric',
            'email' => 'sometimes|email|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'birth_date' => 'required|date|before:' . Carbon::now()->format('Y-m-d'),
//            'role_id' => 'bail|required|exists:roles,id',
            'city_id' => 'required|exists:cities,id',
        ]);

        if ($validator->fails()) {
            return redirect()->route('users.edit', $id)->withErrors($validator)->withInput();
        }

        unset($request['id']);

        $parameters = $request->except('profile_image');
        $profileImage = null;
        if ($request->hasFile('profile_image')) {
            $profileImage = ImageProcessingController::saveImageToServer('profile-image-hunet-1', $request->file('profile_image'));
            $parameters['profile_image'] = $profileImage;
        }

        User::find($id)->update($parameters);

        return redirect()->route('users.index')->with(['message' => 'user ' . ($request->name ?? '') . ' updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->back()->with(['message' => 'This user is not exist']);
        }

        $name = $user->name;
        $user->delete();

        return view('users.index', ['message' => 'user ' . $name . 'deleted']);
    }
}
