<?php

namespace App\Http\Controllers;

use App\Disease;
use App\Examination;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ExaminationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $examinations = Examination::with(['patient', 'doctor', 'disease'])->orderByDesc('created_at');
        if (!$user->isRole('admin')) {
            $examinations = $examinations->whereIn('doctor_id', [null, $user->id]);
        }
        $examinations = $examinations->paginate(10);
        return view('examinations.index', compact('examinations'));
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create()
    {
        return view('examinations.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
//            'examinationname' => 'bail|required|unique:examinations|max:255',
//            'password' => 'bail|required|max:255',
//            'name' => 'bail|required|max:255',
//            'phone' => 'bail|sometimes|numeric|max:11',
//            'email' => 'bail|sometimes|email|max:255',
//            'gender' => ['bail', 'required', Rule::in(['male', 'female'])],
//            'birthdate' => 'bail|required|date',
//            'role_id' => 'bail|required|exists:roles,id',
        ]);

        if ($validator->fails()) {
            return redirect(route('examinations.create'))->withErrors($validator)->withInput();
        }

        Examination::create($request->all());
        return view('examinations.index', ['message', 'examination ' . ($request->name ?? '') . ' created']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     */
    public function show($id)
    {
        $examination = Examination::with(['patient', 'doctor', 'disease'])->find($id);
        return view('examinations.show', compact('examination'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     */
    public function edit($id)
    {
        $currentUser = Auth::user();
        $examination = Examination::with(['patient', 'doctor', 'disease', 'examination_details'])->find($id);
        $diseases = Disease::all();
        $doctors = Role::where('slug', 'doctor')->first()->users;
        if (!$examination) {
            return redirect()->back()->with(['message' => 'This examination is not exist']);
        }
        return view('examinations.edit', compact('examination', 'currentUser', 'diseases', 'doctors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $status = "confirmed";
        if ($user->isRole("admin")) {
            $status = "pending";
        }
        $request->merge([
            'id' => $id,
            'doctor_id' => $request->doctor_id ?? Auth::user()->id,
            'status' => $status
        ]);
        $validator = Validator::make($request->all(), [
            'id' => 'bail|required|exists:App\Examination,id',
            'doctor_id' => 'bail|required|exists:App\User,id',
            'disease_id' => 'bail|required|exists:App\Disease,id'
        ]);

        if ($validator->fails()) {
            return redirect()->route('examinations.edit')->withErrors($validator)->withInput();
        }

        unset($request['id']);

        Examination::find($id)->update($request->all());
        return redirect()->route('examinations.index')->with(['message' => 'Examination updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $examination = Examination::find($id);

        if (!$examination) {
            return redirect()->back()->with(['message' => 'This examination is not exist']);
        }

        $name = $examination->name;
        $examination->delete();

        return view('examinations.index', ['message' => 'examination ' . $name . 'deleted']);
    }
}
