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
        return api_response(true, null, 200, 'success', 'successfully fetched all tasks', $tasks, null);
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
                'wallColour' => 'required',
                'clockFaceColour' => 'required',
                'hourLabelsColour' => 'required',
            ]);
            
            $request['wallColour'] = 'black';
            $request['clockFaceColour'] = 'red';
            $request['hourLabelsColour'] = 'white';
            //array of colors
            $arr = array("#0000ff", "red", "#ffff00", "#008000", 'black', '#808080', '#800080', 'white', '#008080', '#ffffff');
        
            // Use array_rand function to returns random key
            $random = array_rand($arr);
        
            //check if new value equals old wall  value
            if ($arr[$random] ==  $request['wallColour']) {
                $wallColour = $arr[$random + 1];
            } else {
                $wallColour = $arr[$random];
            }
        
            // check if new value equals old wall  value
            if ($arr[$random] ==  $request['clockFaceColour']) {
                $clockFaceColour = $arr[$random + 1];
            } else {
                $clockFaceColour = $arr[$random];
            }
        
            //check if new value equals old wall  value
            if ($arr[$random] ==  $request['hourLabelsColour']) {
                $hourLabelsColour = $arr[$random + 1];
            } else {
                $hourLabelsColour = $arr[$random];
            }

            $colors= [$wallColour,$clockFaceColour,$hourLabelsColour];

            $task = new Task();
            $task->programTime = date("H:i:s", strtotime($request['programTime']));
            $task->event = $request['event'];
            $task->message = $request['message'];
            $task->actualTime = date("H:i:s", strtotime($request['actualTime']));;

            if ($task->save()) {
                return api_response(true, null, 200, 'success', 'successfully saved task', $task, $colors);
            } else {
                return api_response(false, null, 200, 'success', 'successfully saved task', $task, null);
            }
        } catch (\Exception $exception) {
            return api_response(false, $exception->getMessage(), 200, 'error', 'error saving task', null, null);
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
