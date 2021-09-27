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
            
            //array of colors
            $wallColors= array("#0000ff", "#ff0000", "#ffff00", "#008000", '#000000', '#808080', '#800080','#008080', '#ffffff');
            $clockFaceColors= array("#ffffff", "#ff0000", "#008000");
            $hourLabelsColours = array("#000000", "#ffff00", "#0000ff");
        
            // Use array_rand function to returns random key
            $wallRandom = array_rand($wallColors);

            // dd($wallRandom);

            
            //check if new value equals old wall  value
            if ($wallColors[$wallRandom] ==  $request['wallColour']) {
                $wallColour = $wallRandom == 8 ? $wallColors[$wallRandom - 1] : $wallColors[$wallRandom + 1];;
            } else {
                $wallColour = $wallColors[$wallRandom];
            }

            // dd($wallColour);

            
            
            $clockFaceRandom = array_rand($clockFaceColors);
            // check if new value equals old wall  value

            if ($clockFaceColors[$clockFaceRandom] ==  $request['clockFaceColour']) {
                $clockFaceColour = $clockFaceRandom == 2 ? $clockFaceColors[$clockFaceRandom - 1] : $clockFaceColors[$clockFaceRandom + 1];
            } else {
                $clockFaceColour = $clockFaceColors[$clockFaceRandom];
            }
            

        
            $hourLabelRandom = array_rand($hourLabelsColours);
            //check if new value equals old wall  value
            if ($hourLabelsColours[$hourLabelRandom] ==  $request['hourLabelsColour']) {
                $hourLabelsColour = $hourLabelRandom == 2 ? $hourLabelsColours[$hourLabelRandom - 1] : $hourLabelsColours[$hourLabelRandom + 1];
            } else {
                $hourLabelsColour = $hourLabelsColours[$hourLabelRandom];
            }


            $colors = [
                'wallColour' => $wallColour,
                'clockFaceColour' => $clockFaceColour,
                'hourLabelsColour' => $hourLabelsColour
            ];


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
