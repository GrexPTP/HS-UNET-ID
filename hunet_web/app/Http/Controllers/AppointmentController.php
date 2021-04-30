<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Role;
use Google\Cloud\Storage\StorageClient;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $user = Auth::user();
        $where = [];
        if (!$user->isRole('admin')) {
            $where[] = ['doctor_id', $user->id];
        }
        $appointments = Appointment::with(['doctor', 'patient'])->where($where)->orderByDesc('created_at')->paginate(5);
        return view('appointments.index', compact('appointments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $isDoctor = $user->isRole('doctor');
        $doctors = Role::where('slug', 'doctor')->first()->users;
        $customers = Role::where('slug', 'customer')->first()->users;
        return view('appointments.create', compact('doctors', 'customers', 'isDoctor', 'user'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|RedirectResponse|Response|Redirector
     */
    public function store(Request $request)
    {
        $doctorRoleId = Role::whereSlug('doctor')->first()->id;
        $customerRoleId = Role::whereSlug('customer')->first()->id;
        $validator = Validator::make($request->all(), [
            'doctor_id' => [
                'required',
                Rule::exists('users', 'id')
                    ->where('role_id', $doctorRoleId),
            ],
            'patient_id' => [
                'required',
                Rule::exists('users', 'id')
                    ->where('role_id', $customerRoleId),
            ],
            'meeting_time' => 'bail|required|date_format:Y-m-d\Th:i|after:now'
        ]);

        if ($validator->fails()) {
            return redirect(route('appointments.create'))->withErrors($validator)->withInput();
        }
        Appointment::create($request->all());
        return redirect()->route('appointments.index')->with(['message' => 'Appointment created']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        return view('appointments.show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = Auth::user();
        $isDoctor = $user->isRole('doctor');
        $doctors = Role::where('slug', 'doctor')->first()->users;
        $customers = Role::where('slug', 'customer')->first()->users;
        $appointment = Appointment::find($id);
        return view('appointments.edit', compact('appointment', 'user', 'isDoctor', 'doctors', 'customers'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Application|RedirectResponse|Response|Redirector
     */
    public function update(Request $request, $id)
    {
        $request->merge([
            'id' => $id
        ]);
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:appointments,id',
        ]);

        if ($validator->fails()) {
            return redirect(route('appointments.edit', $id))->withErrors($validator)->withInput();
        }

        unset($request['id']);
        Appointment::find($id)->update($request->all());
        return redirect()->route('appointments.index')->with(['message' => 'Appointment updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

    public function changeStatus(Request $request)
    {
        $appointment = Appointment::find($request->id);
        if (!$appointment) {
            return json_encode([
                'code' => 400,
                'status' => false,
                'message' => 'Appointment is not exist'
            ]);
        }

        if ($appointment->status != 0) {
            return json_encode([
                'code' => 400,
                'status' => false,
                'message' => 'Appointment has been accepted or declined'
            ]);
        }

        $appointment->status = $request->status;
        $appointment->save();
        return json_encode([
            'code' => 200,
            'status' => true,
            'message' => 'Appointment has been ' . ($request->status == 1 ? 'accepted' : 'declined')
        ]);
    }
}
