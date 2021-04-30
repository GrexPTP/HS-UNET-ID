@extends('layouts.app')
@section('main-content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white d-inline-block mb-0">Diseases</h6>
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="{{ route('diseases.index') }}">Diseases</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Disease List</li>
                            </ol>
                        </nav>
                    </div>
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
                        <h3 class="mb-0">DISEASE LIST</h3>
                    </div>
                    <!-- Light table -->
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col" class="sort" data-sort="name">Name</th>
                                <th scope="col" class="sort" data-sort="images">Images</th>
                                <th scope="col" class="sort" data-sort="description">Description</th>
                                <th scope="col" class="sort" data-sort=""></th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach($diseases as $disease)
                                <tr>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $disease->name }}</span>
                                            </div>
                                        </div>
                                    </th>

                                    <td>
                                    <span class="badge badge-dot mr-4">
                                        <a href="#" class="avatar rounded-circle mr-3">
                                            <img alt="Image placeholder" src="{{ $disease->images }}">
                                        </a>
                                    </span>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm text-wrap">{{ $disease->description }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div>
                                            <a class="btn btn-icon bg-success" type="button" href="{{ route('diseases.show', $disease->id) }}" title="Show {{ $disease->name }}'s information">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-eye"></i></span>
                                            </a>
                                            <a class="btn btn-icon bg-info" type="button" href="{{ route('diseases.edit', $disease->id) }}" title="Edit {{ $disease->name }}'s information">
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
                        {{ $diseases->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection