@extends('layouts.app')
@section('main-content')

    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white d-inline-block mb-0">Examination</h6>
                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item"><a href="{{ route('dashboard') }}"><i class="fas fa-home"></i></a></li>
                                <li class="breadcrumb-item"><a href="{{ route('examinations.index') }}">Examinations</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Edit Examination</li>
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
                                <h2 class="mb-0">Examination information</h2>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('examinations.update', $examination->id) }}" method="POST">
                            @method("PATCH")
                            @csrf
                            <h6 class="heading-small text-muted mb-4">Patient information</h6>
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-4">
                                        <label class="form-control-label" for="input-username">Patient's Name</label>
                                        <p class="description">{{ $examination->patient->name }}</p>
                                    </div>

                                    <div class="col-8">
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-first-name">Paient's Description</label>
                                            <p class="description">{{ $examination->customer_description }}</p>
                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="form-control-label" for="image">Uploaded Image</label><br>
                                            <img src="{{ $examination->image }}" id="image" alt="Image placeholder" class="card-img-top" style="height: 500px; width: auto">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-last-name">Segmented Image</label><br>
                                            <img src="{{ $examination->result_image }}" alt="Image placeholder" class="card-img-top" style="height: 500px; width: auto">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr class="my-4"/>
                            <!-- Address -->
                            <h6 class="heading-small text-muted mb-4">Doctor's Feedback</h6>
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-address">Doctor's Name</label>
                                            @if($currentUser->isRole('doctor'))
                                                <p class="description">{{ $currentUser->name }}</p>
                                                <input type="hidden" name="doctor_id" class="form-control" value="{{ $currentUser->id }}">
                                            @else
                                                <select class="form-control" name="doctor_id" id="select-doctor-id">
                                                    @foreach($doctors as $doctor)
                                                        <option @if($doctor->id == $examination->doctor_id) selected @endif value="{{ $doctor->id }}">{{ $doctor->name }}</option>
                                                    @endforeach
                                                </select>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-address">Predicted result</label>
                                            <ul class="description">
                                            @foreach($examination->examination_details as $key => $detail)
                                                <li @if($key == 0) style="font-weight: bold" @endif>{{ $detail->disease->name }} ({{ round($detail->percentage * 100, 5) }}%)</li>
                                            @endforeach
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label class="form-control-label" for="disease-id">Your prediction</label>
                                            <select class="form-control" name="disease_id" id="disease-id">
                                                @foreach($diseases as $disease)
                                                    <option value="{{ $disease->id }}"
                                                            @if($disease->id == $examination->disease->id)
                                                            selected
                                                            @endif
                                                    >{{ $disease->name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="form-group">
                                            <label class="form-control-label" for="doctor-feedback">Feedback</label>
                                            <input type="text" id="doctor-feedback" class="form-control" placeholder="Your feedback to the patient"
                                                   name="doctor_feedback" value="{{ $examination->doctor_feedback }}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 text-center">
                                <button type="submit" class="btn btn-lg btn-primary">UPDATE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection