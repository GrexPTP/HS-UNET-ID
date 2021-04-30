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
                            <li class="breadcrumb-item"><a href="#">User</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Add User</li>
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
                            <h2 class="mb-0">PROFILE</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form action="{{ route('users.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <h6 class="heading-small text-muted mb-4">USER'S INFORMATION</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-4">
                                    <label class="form-control-label" for="input-username">Username</label>
                                    <input type="text" id="input-username" class="form-control @if($errors->has('username')) is-invalid @endif" placeholder="Username" name="username">
                                    @if($errors->has('username')) <div class="invalid-feedback">{{ $errors->first('username') }}</div>@endif
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-email">Email address</label>
                                        <input type="email" id="input-email" class="form-control @if($errors->has('email')) is-invalid @endif" placeholder="Email" name="email">
                                        @if($errors->has('email')) <div class="invalid-feedback">{{ $errors->first('email') }}</div>@endif
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label" for="avatar">Avatar</label>
                                        <input type="file" name="profile_image" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-full-name">Full name</label>
                                        <input type="text" id="input-full-name" class="form-control @if($errors->has('name')) is-invalid @endif" placeholder="Full name" name="name">
                                        @if($errors->has('name')) <div class="invalid-feedback">{{ $errors->first('name') }}</div>@endif
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-phone">Phone</label>
                                        <input type="text" id="input-phone" class="form-control @if($errors->has('phone')) is-invalid @endif" placeholder="Phone" name="phone">
                                        @if($errors->has('phone')) <div class="invalid-feedback">{{ $errors->first('phone') }}</div>@endif
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label for="input-date" class="form-control-label">Birthdate</label>
                                        <input class="form-control @if($errors->has('birth_date')) is-invalid @endif" type="date" id="input-date" name="birth_date">
                                        @if($errors->has('birth_date')) <div class="invalid-feedback">{{ $errors->first('birth_date') }}</div>@endif
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label for="input-gender" class="form-control-label">Gender</label>
                                        <select id="input-gender" class="form-control" name="gender">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label for="input-role" class="form-control-label">Role</label>
                                        <select id="input-gender" class="form-control" name="role_id">
                                            @foreach($roles as $role)
                                                <option value="{{ $role->id }}">{{ $role->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr class="my-4" />
                        <!-- Address -->
                        <h6 class="heading-small text-muted mb-4">Contact information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-address">Address</label>
                                        <input id="input-address" class="form-control" placeholder="Home Address" type="text" name="address">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-city">City/Province</label>
                                        <select id="input-city" class="form-control" name="city_id">
                                            @foreach($cities as $city)
                                                <option value="{{ $city->id }}">{{ $city->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button type="submit" class="btn btn-lg btn-primary">CREATE USER</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection