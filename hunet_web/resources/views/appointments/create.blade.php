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
                                <li class="breadcrumb-item active" aria-current="page">Create New Appointment</li>
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
                                <h2 class="mb-0">APPOINTMENT INFORMATION</h2>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('appointments.store') }}" method="POST">
                            @csrf
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <label class="form-control-label" for="select-doctor-id">Doctor's Name</label>
                                        @if($isDoctor)
                                            <p class="text-sm">{{ $user->name }} (You)</p>
                                            <input type="hidden" name="doctor_id" class="form-control" value="{{ $user->id }}">
                                        @else
                                            <select class="form-control" name="doctor_id" id="select-doctor-id">
                                                @foreach($doctors as $doctor)
                                                    <option value="{{ $doctor->id }}">{{ $doctor->name }}</option>
                                                @endforeach
                                            </select>
                                        @endif
                                    </div>

                                    <div class="col-lg-4">
                                        <label class="form-control-label" for="select-patient-id">Patient's Name</label>
                                        <select class="form-control" id="select-patient-id" name="patient_id">
                                            @foreach($customers as $customer)
                                                <option value="{{ $customer->id }}">{{ $customer->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label for="meeting_time" class="form-control-label">Meeting Time</label>
                                            <input class="form-control @if($errors->has('meeting_time')) is-invalid @endif" name="meeting_time" type="datetime-local" value="{{ Carbon\Carbon::now()->format('Y-m-d\Th:i') }}" id="example-date-input">
                                            @if($errors->has('meeting_time')) <div class="invalid-feedback">{{ $errors->first('meeting_time') }}</div>@endif
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-first-name">Doctor's Description</label>
                                            <input name="description" type="text" id="description" class="form-control  @if($errors->has('description')) is-invalid @endif" placeholder="Enter Description" value="">
                                            @if($errors->has('description')) <div class="invalid-feedback">{{ $errors->first('description') }}</div>@endif
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </br>
                            <div class="col-12 text-center">
                                <button style="font-size: 1rem" type="submit" class="btn btn-sm btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection