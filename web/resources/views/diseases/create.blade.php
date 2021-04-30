@extends('layouts.app')
@section('main-content')

<div class="header bg-primary pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Disease</h6>
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                            <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                            <li class="breadcrumb-item"><a href="#">Disease</a></li>
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
                            <h2 class="mb-0">Disease information</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Disease's Name</label>
                                        <input type="text" id="input-full-name" class="form-control" placeholder="Full name" value="Carcinoma">
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Manifestation</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5">Thương tổn là những u nhỏ, nồi cao trên mặt da, hình vòm đôi khi có cuống, thường có màu nâu đỏ. Thương tổn có thế loét, hay dễ chảy máu, hay táng sắc tố rải rác trên bề mặt.Thương tổn hay gặp ở thân mình, tuy nhiên có thể gặp ở bất kỳ vị trí nào trên cơ thể. Bệnh tiến triển nhanh nên thường được chẩn đoán muộn hơn so với thể nông bề mặt và có tiên lượng xấu.</textarea>
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-first-name">Image Description</label>
                                        <img src="../assets/img/theme/img-1-1000x600.jpg" alt="Image placeholder" class="card-img-top">
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