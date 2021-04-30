<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class RoleController extends Controller
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
        $roles = Role::all();
        return view('roles.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create()
    {
        return view('roles.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge([
            'slug' => Str::slug($request->name ?? '', '-'),
        ]);
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|unique:roles|max:255',
            'slug' => 'required|unique:roles|max:255'
        ]);
        if ($validator->fails()) {
            return redirect(route('roles.create'))->withErrors($validator)->withInput();
        }

        Role::create($request->all());
        return view('roles.index', ['message', 'Role ' . ($request->name ?? '') . ' created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     */
    public function show($id)
    {
        $role = Role::find($id);
        return view('roles.show', compact('role'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     */
    public function edit($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return redirect()->back()->with(['message' => 'This role is not exist']);
        }
        return view('roles.edit', compact('role'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->merge([
            'slug' => Str::slug($request->name ?? '', '-'),
            'id' => $id
        ]);
        $validator = Validator::make($request->all(), [
            'id' => 'bail|required|exists:App\Role,id',
            'name' => 'bail|required|unique:roles|max:255',
            'slug' => 'required|unique:roles|max:255'
        ]);

        if ($validator->fails()) {
            return redirect()->route('roles.edit')->withErrors($validator)->withInput();
        }

        unset($request['id']);

        Role::find($id)->update($request->all());

        return view('roles.index', ['message' => 'Role ' . ($request->name ?? '') . ' updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $role = Role::find($id);

        if (!$role) {
            return redirect()->back()->with(['message' => 'This role is not exist']);
        }

        $name = $role->name;
        $role->delete();

        return view('roles.index', ['message' => 'Role ' . $name . 'deleted']);
    }
}
