@extends('layouts.app')
@section('main-content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        {{-- <h6 class="h2 text-white d-inline-block mb-0">Users</h6>--}}
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="{{ route('dashboard') }}"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="{{ route('examinations.index') }}">Examinations</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Examination List</li>
                            </ol>
                        </nav>
                    </div>
{{--                    <div class="col-lg-6 col-5 text-right">--}}
{{--                        <a href="#" class="btn btn-sm btn-neutral">Add New Examination</a>--}}
{{--                    </div>--}}
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
                        <h3 class="mb-0">EXAMINATION LIST</h3>
                    </div>
                    <!-- Light table -->
                    <div class="table-responsive" style="overflow: hidden">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" class="sort" data-sort="name">Patient's Name</th>
                                <th scope="col" class="sort" data-sort="phone">Phone Number</th>
                                <th scope="col" class="sort" data-sort="image">Image</th>
                                <th scope="col" class="sort" data-sort="predicted-result">Predicted result</th>
                                <th scope="col" class="sort" data-sort="status">Status</th>
                                <th scope="col" class="sort" data-sort="date">Request Date</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach($examinations as $key => $examination)
                                <tr>
                                    <td>
                                        {{ ((request()->page ?? 1) - 1) * 10 + $key + 1}}
                                    </td>
                                    <td>
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $examination->patient->name }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="budget">
                                        {{ $examination->patient->phone }}
                                    </td>
                                    <td>
                                        <span class="badge badge-dot mr-4">
                                            <a href="{{ $examination->image }}" class="mr-3" target="_blank">
                                                <img class="in-list-description-image" alt="Image placeholder" src="{{ $examination->image }}">
                                            </a>
                                        </span>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $examination->disease->name }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge badge-dot mr-4">
                                            @if($examination->status == 'pending')
                                                <i class="bg-yellow"></i>
                                            @elseif($examination->status == 'confirmed')
                                                <i class="bg-success"></i>
                                            @endif
                                            <span class="status">{{ $examination->status }}</span>
                                        </span>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ \Carbon\Carbon::parse($examination->created_at)->format('Y-m-d h:i:s') }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div>
                                            <a class="btn btn-icon bg-success" type="button" href="{{ route('examinations.show', $examination->id) }}" title="Show examination result">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-eye"></i></span>
                                            </a>
                                            <a class="btn btn-icon bg-info" type="button" href="{{ route('examinations.edit', $examination->id) }}" title="Edit doctor's prediction">
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
                        {{ $examinations->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection