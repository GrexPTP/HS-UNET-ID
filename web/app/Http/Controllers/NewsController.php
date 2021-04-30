<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use App\News;
use Illuminate\View\View;

class NewsController extends Controller
{
    public function __construct()
    {
        ini_set('upload_max_filesize ', '256MB');
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|Response|View
     */
    public function index()
    {
        $news = News::with('creator')->orderByDesc('created_at')->paginate(10);
        return view('news.index', compact('news'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|Response|View
     */
    public function create()
    {
        return view('news.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $decriptionImage = null;
        if ($request->hasFile('description_image')) {
            $decriptionImage = ImageProcessingController::saveImageToServer('news-description-images', $request->description_image);
        }
        News::create([
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->get('content'),
            'description_image' => $decriptionImage,
            'creatorId' => $user->id
        ]);
        return redirect()->route('news.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $news = News::find($id);
        return view('news.show', compact('news'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $admins = Role::where('slug', 'admin')->first()->users;
        $news = News::find($id);
        return view('news.edit', compact('news', 'admins'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $news = News::find($id);
        if (!$news) {
            return redirect()->route('news.index');
        }
        $decriptionImage = $news->decriptionImage;
        if ($request->hasFile('description_image')) {
            $decriptionImage = ImageProcessingController::saveImageToServer('news-description-images', $request->description_image);
        }
        $news->update([
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->get('content'),
            'description_image' => $decriptionImage
        ]);
        return redirect()->route('news.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return false|Response|string
     */
    public function destroy($id)
    {
        $news = News::find($id);
        if (!$news) {
            return json_encode([
                'code' => 400,
                'status' => false,
                'message' => 'News is not exist'
            ]);
        }
        $news->delete();
        return json_encode([
            'code' => 200,
            'status' => true,
            'message' => 'News has been deleted'
        ]);
    }
}
