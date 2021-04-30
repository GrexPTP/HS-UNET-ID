@extends('layouts.app')
@section('main-content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        {{--                        <h6 class="h2 text-white d-inline-block mb-0">Users</h6>--}}
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="#">Doctors</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Doctor List</li>
                            </ol>
                        </nav>
                    </div>
                    <!-- <div class="col-lg-6 col-5 text-right">
                        <a href="{{ route('users.create') }}" class="btn btn-sm btn-neutral">Edit Schedule</a>
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
                        <h3 class="mb-0">DOCTOR LIST</h3>
                    </div>
                    <!-- Light table -->
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col" class="sort" data-sort="name">Name</th>
                                <th scope="col" class="sort" data-sort="username">Username</th>
                                <th scope="col" class="sort" data-sort="email">Email</th>
                                <th scope="col" class="sort" data-sort="phone">Phone</th>
                                <th scope="col" class="sort" data-sort="gender">Gender</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach($users as $user)
                                <tr>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <a href="#" class="avatar rounded-circle mr-3">
                                                <img alt="Image placeholder" src="{{ $user->profile_image ?? 'https://via.placeholder.com/150' }}">
                                            </a>
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $user->name }}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td class="budget">
                                        {{ $user->username }}
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $user->email }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $user->phone }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ ucfirst($user->gender) }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div>
                                            <a class="btn btn-icon bg-success" type="button" href="{{ route('schedules.show', $user->id) }}">
                                                    <span class="btn-inner--icon"><i class="white-icon fas fa-eye"></i></span>
                                            </a>
                                            <a class="btn btn-icon bg-info" type="button" href="{{ route('schedules.edit', $user->id) }}">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-edit"></i></span>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <!-- Card footer -->
                    <div class="card-footer py-4">
                        {{ $users->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
