<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response    
     */
    public function index()
    {
        $tasks = Task::orderBY('created_at', 'DESC')->get();
        return api_response(true, null, 200, 'success', 'successfully fetched all tasks', $tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request->all();
        try {
            $this->validate($request, [
                'programTime' => 'required',
                'event' => 'required',
                'message' => 'required',
                'actualTime' => 'required',
            ]);

            $task = new Task();
            $task->programTime = date("H:i:s", strtotime($request['programTime']));
            $task->event = $request['event'];
            $task->message = $request['message'];
            $task->actualTime = date("H:i:s", strtotime($request['actualTime']));;

            if ($task->save()) {
                return api_response(true, null, 200, 'success', 'successfully saved task', $task);
            } else {
                return api_response(false, null, 200, 'success', 'successfully saved task', $task);
            }
        } catch (\Exception $exception) {
            return api_response(false, $exception->getMessage(), 200, 'error', 'error saving task', null);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        //
    }
}
