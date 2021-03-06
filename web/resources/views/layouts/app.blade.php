<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Start your development with a Dashboard for Bootstrap 4.">
    <meta name="author" content="Creative Tim">
    <title>Hunet Team</title>
    <!-- Favicon -->
    <link rel="icon" href="{{ asset("assets/img/brand/favicon.png") }}" type="image/png">
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
    <!-- Icons -->
    <link rel="stylesheet" href="{{ asset("assets/vendor/nucleo/css/nucleo.css") }}" type="text/css">
    <link rel="stylesheet" href="{{ asset("assets/vendor/@fortawesome/fontawesome-free/css/all.min.css") }}" type="text/css">
    <!-- Argon CSS -->
    <link rel="stylesheet" href="{{ asset("assets/css/argon.css?v=1.2.0") }}" type="text/css">
    <!-- Hunet CSS -->
    <link rel="stylesheet" href="{{ asset("assets/css/hunet.css") }}" type="text/css">
</head>

<body>
<!-- Sidenav -->
<nav class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div class="scrollbar-inner">
        <!-- Brand -->
        <div class="sidenav-header  align-items-center">
            <a class="navbar-brand" href="javascript:void(0)">
                <img src="{{ asset("assets/img/brand/blue.png") }}" class="navbar-brand-img" alt="...">
            </a>
        </div>
        <div class="navbar-inner">
            <!-- Collapse -->
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                <!-- Nav items -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('dashboard') }}">
                            <i class="ni ni-tv-2 text-primary"></i>
                            <span class="nav-link-text">Dashboard</span>
                        </a>
                    </li>

                    @if(\Illuminate\Support\Facades\Auth::user()->isRole('admin'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('users.index') }}">
                                <i class="ni ni-single-02 text-yellow"></i>
                                <span class="nav-link-text">Users</span>
                            </a>
                        </li>
                    @endif

                    @if(\Illuminate\Support\Facades\Auth::user()->isRole('admin'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('diseases.index') }}">
                                <i class="ni ni-ambulance text-red"></i>
                                <span class="nav-link-text">Diseases</span>
                            </a>
                        </li>
                    @endif


                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('appointments.index') }}">
                            <i class="ni ni-calendar-grid-58 text-green"></i>
                            <span class="nav-link-text">Appointments</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('examinations.index') }}">
                            <i class="ni ni-mobile-button text-primary"></i>
                            <span class="nav-link-text">Examination Requests</span>
                        </a>
                    </li>

                    @if(\Illuminate\Support\Facades\Auth::user()->isRole('admin'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('roles.index') }}">
                                <i class="ni ni-planet text-orange"></i>
                                <span class="nav-link-text">Roles</span>
                            </a>
                        </li>
                    @endif
                    @if(\Illuminate\Support\Facades\Auth::user()->isRole('admin'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('news.index') }}">
                                <i class="ni ni-world text-info"></i>
                                <span class="nav-link-text">News</span>
                            </a>
                        </li>
                    @endif
                    @if(\Illuminate\Support\Facades\Auth::user()->isRole('admin'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('models.index') }}">
                                <i class="ni ni-settings text-gray"></i>
                                <span class="nav-link-text">Model Settings</span>
                            </a>
                        </li>
                    @endif
                    <li class="nav-item">
                        @if(\Illuminate\Support\Facades\Auth::user()->isRole('admin'))
                        <a class="nav-link" href="{{ route('schedules.index') }}">
                            @else
                                <a class="nav-link" href="{{ route('schedules.edit', \Illuminate\Support\Facades\Auth::user()->id) }}">
                            @endif
                            <i class="ni ni-calendar-grid-58 text-black-50"></i>
                            <span class="nav-link-text">Schedules</span>
                        </a>
                    </li>

                </ul>
                <!-- Divider -->
                <hr class="my-3">

            </div>
        </div>
    </div>
</nav>
<!-- Main content -->
<div class="main-content" id="panel">
    <!-- Topnav -->
    <nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Search form -->
                <form class="navbar-search navbar-search-light form-inline mr-sm-3" id="navbar-search-main">
                    <div class="form-group mb-0">
                        <div class="input-group input-group-alternative input-group-merge">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-search"></i></span>
                            </div>
                            <input class="form-control" placeholder="Search" type="text">
                        </div>
                    </div>
                    <button type="button" class="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">
                        <span aria-hidden="true">??</span>
                    </button>
                </form>
                <!-- Navbar links -->
                <ul class="navbar-nav align-items-center ml-md-auto invisible">
                    <li class="nav-item d-xl-none">
                        <!-- Sidenav toggler -->
                        <div class="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line"></i>
                                <i class="sidenav-toggler-line"></i>
                                <i class="sidenav-toggler-line"></i>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item d-sm-none">
                        <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                            <i class="ni ni-zoom-split-in"></i>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-ungroup"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default  dropdown-menu-right ">
                            <div class="row shortcuts px-4">
                                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-red">
                      <i class="ni ni-calendar-grid-58"></i>
                    </span>
                                    <small>Calendar</small>
                                </a>
                                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-orange">
                      <i class="ni ni-email-83"></i>
                    </span>
                                    <small>Email</small>
                                </a>
                                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-info">
                      <i class="ni ni-credit-card"></i>
                    </span>
                                    <small>Payments</small>
                                </a>
                                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-green">
                      <i class="ni ni-books"></i>
                    </span>
                                    <small>Reports</small>
                                </a>
                                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-purple">
                      <i class="ni ni-pin-3"></i>
                    </span>
                                    <small>Maps</small>
                                </a>
                                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-yellow">
                      <i class="ni ni-basket"></i>
                    </span>
                                    <small>Shop</small>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav align-items-center  ml-auto ml-md-0 ">
                    <li class="nav-item dropdown">
                        <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="{{ \Illuminate\Support\Facades\Auth::user()->profile_image ?? 'https://via.placeholder.com/150' }}">
                  </span>
                                <div class="media-body  ml-2  d-none d-lg-block">
                                    <span class="mb-0 text-sm  font-weight-bold">{{ \Illuminate\Support\Facades\Auth::user()->name ?? ''}}</span>
                                </div>
                            </div>
                        </a>
                        <div class="dropdown-menu  dropdown-menu-right ">
                            <div class="dropdown-header noti-title">
                                <h6 class="text-overflow m-0">Welcome!</h6>
                            </div>
                            <div class="dropdown-divider"></div>
                            <a href="{{ route('logout') }}" class="dropdown-item">
                                <i class="ni ni-user-run"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    @yield('main-content')

</div>

<!-- Footer -->
<footer class="py-5" id="footer-main">
    <div class="container">
        <div class="row align-items-center justify-content-xl-between">
            <div class="col-xl-6">
                <div class="copyright text-center text-xl-left text-muted">
                    &copy; 2021 <a href="#" class="font-weight-bold ml-1" target="_blank">Hunet Team</a>
                </div>
            </div>
            <div class="col-xl-6">
                <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                    <li class="nav-item">
                        <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Blog</a>
                    </li>
                    <li class="nav-item">
                        <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Terms of Use</a>
                    </li>
                    <li class="nav-item">
                        <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>

<!-- Argon Scripts -->
<!-- Core -->
<script src="{{ asset("assets/vendor/jquery/dist/jquery.min.js") }}"></script>
<script src="{{ asset("assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js") }}"></script>
<script src="{{ asset("assets/vendor/js-cookie/js.cookie.js") }}"></script>
<script src="{{ asset("assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js") }}"></script>
<script src="{{ asset("assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js") }}"></script>
<script src="{{ asset("assets/vendor/chart.js/dist/Chart.min.js") }}"></script>
<script src="{{ asset("assets/vendor/chart.js/dist/Chart.extension.js") }}"></script>
<script src="{{ asset("assets/js/argon.js?v=1.2.0") }}"></script>

@yield('custom-js')
</body>
</html>