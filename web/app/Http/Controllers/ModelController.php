<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $file = file_get_contents(base_path('/model_settings.json'));
        $data = json_decode($file, true);
        $models = $data['models'];
        $preprocessing = $data['isPreprocess'];
        $selectedModel = $data['selectedModel'];
        return view('models.index', compact('models', 'preprocessing', 'selectedModel'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file = file_get_contents(base_path('/model_settings.json'));
        $data = json_decode($file, true);
        $data['isPreprocess'] = $request->preprocess ? true: false;
        $data['selectedModel'] = $request->model_id;
        $selectedModel = $request->model_id;
        $preprocessing = $request->preprocess;
        $models = $data['models'];
        $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(base_path('/model_settings.json'), stripslashes($newJsonString));
        return view('models.index', compact('models', 'preprocessing', 'selectedModel'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
