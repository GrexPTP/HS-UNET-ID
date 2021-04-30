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
                            <li class="breadcrumb-item active" aria-current="page">Examination Information</li>
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
                            <h2 class="mb-0">EXAMINATION INFORMATION</h2>
                        </div>
                        <div class="col-4 text-right">
                            <a style="font-size: 1rem" href="{{ route('examinations.edit', $examination->id) }}" class="btn btn-lg btn-primary">EDIT DOCTOR'S PREDICTION</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        <h6 class="heading-small text-muted mb-4">Customer's information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-username">Full name</label>
                                        <p class="description">{{ $examination->patient->name }}</p>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <label class="form-control-label">Email address</label>
                                    <p class="description">{{ $examination->patient->email }}</p>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Phone number</label>
                                        <p class="description">{{ $examination->patient->phone }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="my-4" />
                        <!-- Description -->
                        <h6 class="heading-small text-muted mb-4">Customer's Description</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-username">Description</label>
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


                        <hr class="my-4" />
                        <!-- Address -->
                        <h6 class="heading-small text-muted mb-4">Doctor's Feedback</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-address">Result</label>
                                        <p class="description">{{ $examination->disease->name }}</p>
                                    </div>
                                </div>

                                <div class="col-4">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-address">Status</label><br>
                                        <span class="badge badge-dot mr-4">
                                            @if($examination->status == 'pending')
                                                <i class="bg-yellow"></i>
                                            @elseif($examination->status == 'confirmed')
                                                <i class="bg-success"></i>
                                            @endif
                                            <span class="status">{{ $examination->status }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-city">Advice</label>
                                        <p class="description">{{ $examination->doctor_feedback ?? 'Chưa có feedback nào từ bác sĩ'}}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection