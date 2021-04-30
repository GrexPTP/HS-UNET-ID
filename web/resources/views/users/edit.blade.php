@extends('layouts.app')
@section('main-content')

    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white d-inline-block mb-0">Users</h6>
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="{{ route('users.index') }}">Users</a></li>
                                <li class="breadcrumb-item active" aria-current="page">User Update</li>
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
                                <h2 class="mb-0">PERSONAL PROFILE</h2>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('users.update', $user->id) }}" method="POST" enctype="multipart/form-data">
                            @method('PATCH')
                            @csrf
                            <h6 class="heading-small text-muted mb-4">{{ $user->name }}'s INFORMATION</h6>
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <label class="form-control-label" for="avatar">Profile image</label>
                                            <br>
                                            <img src="{{ $user->profile_image }}" class="img-fluid description-image">
                                            <input type="file" name="profile_image" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <label class="form-control-label" for="input-username">Username</label>
                                                <input type="text" id="input-username" class="form-control" readonly placeholder="Username" value="{{ $user->username ?? '' }}">
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-email">Email address</label>
                                                    <input name="email" type="email" id="input-email" class="form-control @if($errors->has('email')) is-invalid @endif" placeholder="Email" value="{{ $user->email }}">
                                                    @if($errors->has('email')) <div class="invalid-feedback">{{ $errors->first('email') }}</div>@endif
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-name">Full name</label>
                                                    <input name="name" type="text" id="input-name" class="form-control @if($errors->has('name')) is-invalid @endif" placeholder="Full name" value="{{ $user->name }}">
                                                    @if($errors->has('name')) <div class="invalid-feedback">{{ $errors->first('name') }}</div>@endif
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-phone">Phone</label>
                                                    <input name="phone" type="text" id="input-phone" class="form-control @if($errors->has('phone')) is-invalid @endif" placeholder="Phone" value="{{ $user->phone }}">
                                                    @if($errors->has('phone')) <div class="invalid-feedback">{{ $errors->first('phone') }}</div>@endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="form-group">
                                                    <label for="example-date-input" class="form-control-label">Birthdate</label>
                                                    <input class="form-control @if($errors->has('birth_date')) is-invalid @endif" type="date" value="{{ $user->birth_date }}" id="example-date-input" name="birth_date">
                                                    @if($errors->has('birth_date')) <div class="invalid-feedback">{{ $errors->first('birth_date') }}</div>@endif
                                                </div>
                                            </div>

                                            <div class="col-lg-4">
                                                <div class="form-group">
                                                    <label for="input-gender" class="form-control-label">Gender</label>
                                                    <select class="form-control" name="gender" id="input-gender">
                                                        <option value="male" @if($user->gender == 'male') selected @endif>Male</option>
                                                        <option value="female" @if($user->gender == 'female') selected @endif>Female</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-lg-4">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-city">City</label>
                                                    <select class="form-control" name="city_id" id="input-city">
                                                        @foreach($cities as $city)
                                                            <option value="{{$city->id}}"
                                                                    @if($city->id == $user->city_id) selected @endif>
                                                                {{ $city->name }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4"/>
                            <div class="col-12 text-right">
                                <button type="submit" class="btn btn-lg btn-primary">UPDATE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection