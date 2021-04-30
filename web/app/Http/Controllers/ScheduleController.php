<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\City;
use App\Role;
use App\Schedule;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ScheduleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = Role::whereSlug('doctor')->first()->users()->paginate(5);
        return view('schedules.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create()
    {
        $doctors = Role::whereSlug('doctor')->first()->users;
        return view('users.create', compact($doctors));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge([
            'password' => Hash::make('123456')
        ]);
        $validator = Validator::make($request->all(), [
            'username' => 'bail|required|unique:users|max:255',
            'password' => 'bail|required|max:255',
            'name' => 'bail|required|max:255',
            'phone' => 'bail|sometimes|numeric',
            'email' => 'bail|sometimes|email|max:255',
            'gender' => ['bail', 'required', Rule::in(['male', 'female'])],
            'birthdate' => 'bail|required|date',
            'role_id' => 'bail|required|exists:roles,id',
            'city_id' => 'bail|required|exists:cities,id',
        ]);

        if ($validator->fails()) {
            return redirect(route('users.create'))->withErrors($validator)->withInput();
        }

//        dd($request->all());

        User::create($request->all());
        return redirect()->route('users.index')->with(['message' => 'user ' . ($request->name ?? '') . ' created']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     */
    public function show($id)
    {
        $now = Carbon::now();
        $weekStartDate = $now->startOfWeek();
        $dates = [$weekStartDate->format('d-m-Y')];
        $dateNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        for ($i = 0; $i < 6; $i++) {
            $dates[] = $weekStartDate->addDay()->format('d-m-Y');
        }
        $user = User::find($id);
        if (!$user) {
            return redirect()->back()->with(['message' => 'This user is not exist']);
        }

        $schedules = [];

        foreach ($dates as $date) {
            for ($time = 8; $time < 20; $time++) {
                $startDate = Carbon::createFromFormat('d-m-Y', $date)->format('Y-m-d');
                $endTime = $startDate . ' ' . ($time + 1) . ':00:00';
                $startTime = $startDate . ' ' . $time . ':00:00';
                $scheduleItem = Schedule::where('start_date', $startDate)
                    ->where('start_time', $startTime)
                    ->where('end_time', $endTime)
                    ->where('doctorId', $id)
                    ->first();
                if (!$scheduleItem) {
                    $scheduleItem = Schedule::create([
                        'start_date' => $startDate,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'doctorId' => $id,
                        'status' => 0
                    ]);
                }
                $schedules[$date][$time] = $scheduleItem->status;
            }
        }

        return view('schedules.show', compact('user', 'dates', 'dateNames', 'schedules'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     */
    public function edit($id)
    {
        $now = Carbon::now();
        $weekStartDate = $now->startOfWeek();
        $dates = [$weekStartDate->format('d-m-Y')];
        $dateNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        for ($i = 0; $i < 6; $i++) {
            $dates[] = $weekStartDate->addDay()->format('d-m-Y');
        }
        $user = User::find($id);
        if (!$user) {
            return redirect()->back()->with(['message' => 'This user is not exist']);
        }

        $schedules = [];

        foreach ($dates as $date) {
            for ($time = 8; $time < 20; $time++) {
                $startDate = Carbon::createFromFormat('d-m-Y', $date)->format('Y-m-d');
                $endTime = $startDate . ' ' . ($time + 1) . ':00:00';
                $startTime = $startDate . ' ' . $time . ':00:00';
                $scheduleItem = Schedule::where('start_date', $startDate)
                    ->where('start_time', $startTime)
                    ->where('end_time', $endTime)
                    ->where('doctorId', $id)
                    ->first();
                if (!$scheduleItem) {
                    $scheduleItem = Schedule::create([
                        'start_date' => $startDate,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'doctorId' => $id,
                        'status' => 0
                    ]);
                }
                $schedules[$date][$time] = $scheduleItem->status;
            }
        }

        return view('schedules.edit', compact('user', 'dates', 'dateNames', 'schedules'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
//        $request->merge([
//            'id' => $id,
//        ]);
//        $validator = Validator::make($request->all(), [
//            'id' => 'bail|required|exists:App\user,id',
//            'name' => 'bail|required|max:255',
//            'phone' => 'bail|sometimes|numeric',
//            'email' => 'bail|sometimes|email|max:255',
//            'gender' => ['bail', 'required', Rule::in(['male', 'female'])],
//            'birth_date' => 'bail|required|date',
////            'role_id' => 'bail|required|exists:roles,id',
//            'city_id' => 'bail|required|exists:cities,id',
//        ]);
//
//        if ($validator->fails()) {
//            return redirect()->route('users.edit', $id)->withErrors($validator)->withInput();
//        }
        $user = User::find($id);
        foreach ($request->data as $date => $dateItem) {
            foreach ($dateItem as $time => $status) {
                $startDate = Carbon::createFromFormat('d-m-Y', $date)->format('Y-m-d');
                $endTime = $startDate . ' ' . ($time + 1) . ':00:00';
                $startTime = $startDate . ' ' . $time . ':00:00';
                $scheduleItem = Schedule::where('start_date', $startDate . ' 00:00:00')
                    ->where('start_time', $startTime)
                    ->where('end_time', $endTime)
                    ->where('doctorId', $id)
                    ->first();
                $scheduleItem->status = $status;
                $scheduleItem->save();
            }
        }
        if (Auth::user()->isRole('admin')) {
            return redirect()->route('schedules.index')->with(['message' => 'user ' . ($user->name ?? '') . ' updated']);
        }
        return redirect()->route('schedules.show', $user->id)->with(['message' => 'user ' . ($user->name ?? '') . ' updated']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->back()->with(['message' => 'This user is not exist']);
        }

        $name = $user->name;
        $user->delete();

        return view('users.index', ['message' => 'user ' . $name . 'deleted']);
    }
}
