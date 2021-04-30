@extends('layouts.app')
@section('main-content')

    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white d-inline-block mb-0">Disease</h6>
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="#">Disease</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Update</li>
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
                                <h2 class="mb-0">Disease information</h2>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('diseases.update', $disease->id) }}" method="POST" enctype="multipart/form-data">
                            @method("PATCH")
                            @csrf
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label class="form-control-label" for="input-first-name">Disease's Name</label>
                                                <input type="text" id="input-full-name" readonly class="form-control" placeholder="Full name" value="{{ $disease->name ?? ''}}" name="name">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label class="form-control-label" for="input-first-name">Description</label>
                                                <textarea class="form-control @if($errors->has('description')) is-invalid @endif" id="exampleFormControlTextarea1" rows="8" name="description">{{ $disease->description ?? '' }}</textarea>
                                                @if($errors->has('description')) <div class="invalid-feedback">{{ $errors->first('description') }}</div>@endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label class="form-control-label" for="images">Description Image</label>
                                                <br>
                                                <img src="{{ $disease->images }}" alt="Image placeholder" class="card-img-top description-image">
                                                <input type="file" name="images" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </br>
                            <div class="col-12 text-center">
                                <button style="font-size: 1rem" type="submit" class="btn btn-lg btn-primary">UPDATE</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection