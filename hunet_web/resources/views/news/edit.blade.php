@extends('layouts.app')
@section('main-content')

<div class="header bg-primary pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">News</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                            <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                            <li class="breadcrumb-item"><a href="{{ route('news.index') }}">News</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Update News Information</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid mt--6">
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h2 class="mb-0">News information</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form action="{{ route('news.update', $news->id) }}" method="POST" enctype="multipart/form-data">
                        @method('PATCH')
                        @csrf
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Description Image</label>
                                        <img src="{{ $news->description_image }}" alt="Image placeholder" class="card-img-top">
                                        <br>
                                        <input type="file" name="description_image">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Title</label>
                                        <input type="text" id="input-full-name" class="form-control" name="title" value="{{ $news->title }}" required>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Creator</label>
                                        <p class="description">{{ $news->creator ? $news->creator->name : '' }}</p>
                                    </div>
                                </div>

                            </div>


                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Description</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name="description">{{ $news->description }}</textarea>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Content</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" name="content" required>{{ $news->content }}</textarea>
                                    </div>
                                </div>

                            </div>

                        </div>
                        </br>
                        <div class="col-12 text-center">
                            <button type="submit" class="btn btn-sm btn-primary">UPDATE</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection