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
                                <li class="breadcrumb-item active" aria-current="page">List News</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="col-lg-6 col-5 text-right">
                        <a href="{{ route('news.create') }}" class="btn btn-sm btn-neutral">CREATE NEW NEWS</a>
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
                        <h3 class="mb-0">NEWS LIST</h3>
                    </div>
                    <!-- Light table -->
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col" class="sort" data-sort="email">Image Description</th>
                                <th scope="col" class="sort" data-sort="name">Title</th>
                                <th scope="col" class="sort" data-sort="phone">Creator</th>
                                <th scope="col" class="sort" data-sort="gender">Date Create</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach($news as $news_item)
                                <tr>
                                    <td>
                                    <span class="badge badge-dot mr-4">
                                        <a href="#" class="avatar mr-3">
                                            <img alt="Image placeholder" src="{{$news_item->description_image}}">
                                        </a>
                                    </span>
                                    </td>

                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{$news_item->title}}</span>
                                            </div>
                                        </div>
                                    </th>

                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{$news_item->creator ? $news_item->creator->name : ''}}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ Carbon\Carbon::parse($news_item->created_at)->format('Y-m-d h:i') }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div>
                                            <a class="btn btn-icon bg-success" type="button" href="{{ route('news.show', $news_item->id) }}" title="Show news information">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-eye"></i></span>
                                            </a>
                                            <a class="btn btn-icon bg-info" type="button" href="{{ route('news.edit', $news_item->id) }}" title="Edit news information">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-edit"></i></span>
                                            </a>
                                            <button class="btn btn-icon bg-danger" type="button" onclick="deleteNews({{ $news_item->id }})"  title="Delete news">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-trash"></i></span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <!-- Card footer -->

                    <!-- Card footer -->
                    <div class="card-footer py-4">
                        {{ $news->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('custom-js')
    <script>
        function deleteNews(id) {
            if (confirm('Do you really want to delete this record?')) {
                $.ajax(
                    {
                        url: "{{ route('news.destroy', '') }}" + '/' + id,
                        type: 'DELETE',
                        dataType: "JSON",
                        data: {
                            "id": id,
                            "_token": '{{ csrf_token() }}',
                        },
                        success: function (respond) {
                            alert(respond.message);
                            window.location.reload();
                        },
                        error: function (xhr) {
                            console.log(xhr);
                        }
                    });
            }
        }
    </script>
@endsection