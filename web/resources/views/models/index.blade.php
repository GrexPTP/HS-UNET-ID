@extends('layouts.app')
@section('main-content')
<div class="header bg-primary pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Model</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                            <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                            <li class="breadcrumb-item"><a href="#">Model</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Model Customisation</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid mt--6">
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h2 class="mb-0">MODEL CUSTOMIZATION</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form action="{{ route('models.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <h6 class="heading-small text-muted mb-4">MODEL'S INFORMATION</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-11">
                                    <div class="form-group">
                                        <label for="input-model" class="form-control-label">Model</label>
                                        <select id="input-model" class="form-control" name="model_id">
                                            @foreach($models as $model)
                                                <option @if($model['id']==$selectedModel) selected @endif  value="{{ $model['id'] }}">{{ $model['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-1">
                                    <div class="form-group">
                                        <label for="input-preprocess" class="form-control-label">Preprocessing</label>
                                        <input type="checkbox" id="input-preprocess" class="form-control" name="preprocess" @if($preprocessing) checked @endif/> 
                                    </div>
                                </div>
                            </div>


                        </div>
                        <hr class="my-4" />
                        <div class="col-12 text-center">
                            <button type="submit" class="btn btn-lg btn-primary">SAVE CHANGES</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection