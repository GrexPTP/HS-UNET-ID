@extends('layouts.app')
@section('main-content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white d-inline-block mb-0">Appointment</h6>
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="#">Appointments</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Appointment List</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="col-lg-6 col-5 text-right">
                        <a href="{{ route('appointments.create') }}" class="btn btn-sm btn-neutral">CREATE NEW APPOINTMENT</a>
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
                        <h3 class="mb-0">APPOINTMENT LIST</h3>
                    </div>
                    <!-- Light table -->
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" class="sort" data-sort="name">Patient's Name</th>
                                <th scope="col" class="sort" data-sort="email">Doctor's Name</th>
                                <th scope="col" class="sort" data-sort="phone">Description</th>
                                <th scope="col" class="sort" data-sort="gender">Meeting Time</th>
                                <th scope="col" class="sort" data-sort="gender">Status</th>
                                <th scope="col" class="sort" data-sort="gender"></th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach($appointments as $key => $appointment)
                                <tr>
                                    <th>
                                        {{ ((request()->page ?? 1) - 1) * 10 + $key + 1}}
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $appointment->patient ? $appointment->patient->name : '' }}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td class="budget">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $appointment->doctor ? $appointment->doctor->name : '' }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ $appointment->description }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{ \Carbon\Carbon::parse($appointment->meeting_time)->format('Y-m-d h:i:s') }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm text-{{ $appointment->status == 0 ? 'gray-dark' : ($appointment->status == 1 ? 'success' : 'danger') }}">
                                                    {{ $appointment->status == 0 ? 'Pending' : ($appointment->status == 1 ? 'Accepted' : 'Declined') }}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="avatar-group">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div>
                                            @if($appointment->status == 0)
                                            <button class="btn btn-icon bg-success" type="button" onclick="changeStatus({{ $appointment->id }}, 1)" title="Accept this appointment">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-check"></i></span>
                                            </button>
                                            <button class="btn btn-icon bg-danger" type="button" onclick="changeStatus({{ $appointment->id }}, -1)" title="Cancel this appointment">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-times"></i></span>
                                            </button>
                                            <a class="btn btn-icon bg-info" type="button" href="{{ route('appointments.edit', $appointment->id) }}">
                                                <span class="btn-inner--icon"><i class="white-icon fas fa-edit"></i></span>
                                            </a>
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <!-- Card footer -->
                    <div class="card-footer py-4">
                        {{ $appointments->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('custom-js')
    <script>
        function changeStatus(id, status) {
            let statusText = status == 1 ? 'accept' : 'cancel';
            if (confirm('Are you sure that you want to ' + statusText + ' this appointment?')) {
                $.ajax({
                    url: '{{ route('schedules.change-status') }}',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        _token: '{{ csrf_token() }}',
                        id: id,
                        status: status
                    }
                }).done(function (response) {
                    alert(response.message);
                    window.location.reload();
                });
                console.log(id, status, statusText);
            }
        }
    </script>
@endsection