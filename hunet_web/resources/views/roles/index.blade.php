@extends('layouts.app')
@section('main-content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white d-inline-block mb-0">User</h6>
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="{{ route('roles.index') }}">Roles</a></li>
                                <li class="breadcrumb-item active" aria-current="page">List Role</li>
                            </ol>
                        </nav>
                    </div>
                    <!-- <div class="col-lg-6 col-5 text-right">
                        <a href="#" class="btn btn-sm btn-neutral">Add Role</a>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--6">
        <div class="row">
            <div class="col">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header border-0">
                        <h3 class="mb-0">ROLE LIST</h3>
                    </div>
                    <!-- Light table -->
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col" class="sort" data-sort="name">Role Name</th>
                                <th scope="col" class="sort" data-sort="budget">Slug</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach($roles as $role)
                                <tr>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $role->name }}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td class="budget">
                                        {{ $role->slug }}
                                    </td>
{{--                                    <td class="text-right">--}}
{{--                                        <div>--}}
{{--                                            <button class="btn btn-icon bg-info" type="button">--}}
{{--                                                <span class="btn-inner--icon"><i class="white-icon fas fa-edit"></i></span>--}}
{{--                                            </button>--}}
{{--                                            <button class="btn btn-icon bg-danger" type="button">--}}
{{--                                                <span class="btn-inner--icon"><i class="white-icon fas fa-trash"></i></span>--}}
{{--                                            </button>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection