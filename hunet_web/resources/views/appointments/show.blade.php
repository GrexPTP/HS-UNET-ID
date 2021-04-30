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
                            <li class="breadcrumb-item"><a href="#">Appointment</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Appointment Information</li>
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
                        <div class="col-4 text-right">
                            <a style="font-size: 1rem" href="#!" class="btn btn-sm btn-primary">Update</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        <h6 class="heading-small text-muted mb-4">Patient's information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-username">Username</label>
                                        <p class="description">TinKG</p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <label class="form-control-label">Email address</label>
                                    <p class="description">tinkg@gmail.com</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Full name</label>
                                        <p class="description">Đỗ Trung Tín</p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-last-name">Phone</label>
                                        <p class="description">0113113113</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="my-4" />
                        <!-- Description -->
                        <h6 class="heading-small text-muted mb-4">Appointment's Information</h6>
                        <div class="pl-lg-4">
                            <div class="row">

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Meeting Time</label>
                                        <p class="description">{{ Carbon\Carbon::parse($appointment->meeting_time)->format('Y-m-d h:i') }}</p>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <hr class="my-4" />
                        <!-- Address -->
                        <h6 class="heading-small text-muted mb-4">Doctor's Information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-username">Username</label>
                                        <p class="description">DucPM</p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <label class="form-control-label">Email address</label>
                                    <p class="description">ducpm@gmail.com</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Full name</label>
                                        <p class="description">Phan Minh Đức</p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-last-name">Phone</label>
                                        <p class="description">0113113114</p>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-username">Description</label>
                                        <p class="description">Bác sĩ có thể đến trễ 15 phút</p>
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