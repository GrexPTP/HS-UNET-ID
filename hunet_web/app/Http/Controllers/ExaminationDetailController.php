<?php

namespace App\Http\Controllers;

use App\Examination;
use App\ExaminationDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ExaminationDetailController extends Controller
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
//        $examinationDetails = ExaminationDetail::all();
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
        $examinationDetails = Examination::find($id);
        return view('examination-details.show', compact('examination'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     */
    public function edit($id)
    {
        $examination = Examination::find($id);
        if (!$examination) {
            return redirect()->back()->with(['message' => 'This examination is not exist']);
        }
        return view('examinations.edit', compact('examination'));
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
//            'id' => 'bail|required|exists:App\examination,id',
//            'name' => 'bail|required|unique:examinations|max:255',
//            'slug' => 'required|unique:examinations|max:255'
        ]);

        if ($validator->fails()) {
            return redirect()->route('examinations.edit')->withErrors($validator)->withInput();
        }

        unset($request['id']);

        Examination::find($id)->update($request->all());

        return view('examinations.index', ['message' => 'examination ' . ($request->name ?? '') . ' updated']);
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
