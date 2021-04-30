@extends('layouts.app')
<style>
    table,
    thead,
    tr,
    tbody,
    th,
    td {
        text-align: center !important;
    }

    .table td {
        text-align: center !important;
    }

    .chosen {
        background-color: #35a279;
        color: white;
        font-weight: bold;
    }
</style>
@section('main-content')

    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white d-inline-block mb-0">Schedules</h6>
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="{{ route('users.index') }}">Schedules</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Schedules Update</li>
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
                                <h2 class="mb-0">Schedule</h2>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table table-responsive">
                            <table class="table align-items-center table-bordered" style="border: 0.15rem solid lightgray; border-collapse: collapse">
                                <thead class="thead-dark">
                                <tr>
                                    @foreach($dates as $key => $date)
                                        <th scope="col" class="text-white" style="background-color: #525f7f"><strong>{{ $dateNames[$key] . ' '. $date }}</strong></th>
                                    @endforeach
                                </tr>
                                </thead>
                                <tbody class="list" style="border: 0.15rem solid lightgray">
                                @for($i = 8; $i < 20; $i++)
                                    @if($i == 13)
                                        <tr style="border: 0.15rem solid lightgray;">
                                            <td colspan="7"></td>
                                        </tr>
                                    @endif
                                    <tr>
                                        @for($j = 0; $j < 7; $j++)

                                            <td @if($schedules[$dates[$j]][$i] == 1) class="chosen" @endif>{{ $i . ':00' }} - {{ $i + 1 . ':00' }}</td>
                                        @endfor
                                    </tr>
                                @endfor
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
@endsection