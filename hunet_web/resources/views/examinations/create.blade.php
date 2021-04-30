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
                            <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                            <li class="breadcrumb-item"><a href="#">Examination</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Create</li>
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
                    <form>
                        <h6 class="heading-small text-muted mb-4">Paient information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <label class="form-control-label" for="input-username">Paient's Name</label>
                                    <select class="form-control">
                                        <option>Đỗ Trung Tín</option>
                                        <option>Phan Tấn Phát</option>
                                    </select>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="example-date-input" class="form-control-label">Day Create Request</label>
                                        <input class="form-control" type="date" value="2018-11-23" id="example-date-input">
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Paient's Description</label>
                                        <input type="text" id="input-full-name" class="form-control" placeholder="Full name" value="Ngứa quá ngứa rồi!!">
                                    </div>
                                </div>
                               
                            </div>

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Image Upload</label>
                                        <img src="../assets/img/theme/img-1-1000x600.jpg" alt="Image placeholder" class="card-img-top">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-last-name">Segmented Image</label>
                                        <img src="../assets/img/theme/img-1-1000x600.jpg" alt="Image placeholder" class="card-img-top">
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr class="my-4" />
                        <!-- Address -->
                        <h6 class="heading-small text-muted mb-4">Doctor's Feedback</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-address">Doctor's Name</label>
                                        <select class="form-control">
                                            <option>Phan Minh Đức</option>
                                            <option>Đỗ Duy Mạnh</option>
                                            <option>Phan Tiến Dũng</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-city">Disease</label>
                                        <select class="form-control">
                                            <option>Melanoma</option>
                                            <option>Carcinoma</option>
                                            <option>Pigmented</option>
                                            <option>Normal</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Advice</label>
                                        <input type="text" id="input-full-name" class="form-control" placeholder="Full name" value="Hãy đến phòng khám của tôi sớm nhất có thể...">
                                    </div>
                                </div>
                               
                            </div>
                        </div>

                        </br>
                        <div class="col-12 text-center">
                            <a style="font-size: 1rem" href="#!" class="btn btn-sm btn-primary">Create</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection