<?php

namespace App\Http\Controllers;

use App\Disease;
use App\Examination;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\Console\Helper\Helper;

class DiseaseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resources
     */
    public function index()
    {
        $diseases = Disease::where('slug', '!=', 'normal')->paginate(10);
        return view('diseases.index', compact('diseases'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('diseases.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show($id)
    {
        $disease = Disease::find($id);
        return view('diseases.show', compact('disease'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $disease = Disease::find($id);
        return view('diseases.edit', compact('disease'));
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param $id
     * @return RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $request->merge([
            'id' => $id
        ]);
        $validator = Validator::make($request->all(), [
            'id' => 'bail|required|exists:App\Disease,id'
        ]);

        if ($validator->fails()) {
            return redirect()->route('diseases.edit', $id)->withErrors($validator)->withInput();
        }

        unset($request['id']);

        $parameters = $request->except('images');

        $images = null;
        if ($request->hasFile('images')) {
            $images = ImageProcessingController::saveImageToServer('disease-images', $request->file('images'));
            $parameters['images'] = $images;
        }

        Disease::find($id)->update($parameters);
        return redirect()->route('diseases.index')->with(['message' => 'Disease updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
