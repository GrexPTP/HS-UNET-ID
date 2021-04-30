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
                                <li class="breadcrumb-item"><a href="{{ route('appointments.index') }}">Appointments</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Update</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid mt--6">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h2 class="mb-0">Appointment information</h2>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('appointments.update', $appointment->id) }}" method="POST">
                            @method('PATCH')
                            @csrf
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <label class="form-control-label" for="select-doctor-id">Doctor's Name</label>
                                        <p class="text-sm">{{ $user->name }}</p>
                                    </div>
                                    <div class="col-lg-4">
                                        <label class="form-control-label" for="select-patient-id">Patient's Name</label>
                                        <p class="text-sm">{{ $customers->find($appointment->patient_id)->name }}</p>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-first-name">Meeting Time</label>
                                            <p class="description">{{Carbon\Carbon::parse($appointment->meeting_time)->format('Y-m-d h:i')}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label class="form-control-label" for="description">Doctor's Description</label>
                                            <input name="description" type="text" id="description" class="form-control" placeholder="Enter Description" value="{{ $appointment->description }}">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </br>
                            <div class="col-12 text-center">
                                <button style="font-size: 1rem" type="submit" class="btn btn-sm btn-primary">Update</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection