import React, { useRef, useState } from 'react';


const DefaultValue = [
    { id: 1, taskname: "TASK 1" },
    { id: 2, taskname: "TASK 2" },
    { id: 3, taskname: "TASK 3" },
    { id: 4, taskname: "TASK 4" },
    { id: 5, taskname: "TASK 5" },
];
export default function DemoDragDrop() {
    const [ taskList, setTaskList ] = useState(DefaultValue);
    const tagDrag = useRef({});
    const handleDragStart = (e, task, index) => {
        tagDrag.current = task;
    };
    const handleDragEnter = (e, taskDragEnter, index) => {
        let taskListUpdate = [ ...taskList ];

        //lấy ra index thằng đang kéo
        let indexDrag = taskListUpdate.findIndex(task => task.id === tagDrag.current.id);

        // lấy index thằng bị kéo qua
        let indexDragEnter = taskListUpdate.findIndex(task => task.id === taskDragEnter.id);
        let temp = taskListUpdate[ indexDrag ];
        taskListUpdate[ indexDrag ] = taskListUpdate[ indexDragEnter ];
        taskListUpdate[ indexDragEnter ] = temp;
        setTaskList(taskListUpdate);
    };
    return (
        <div className='container'>
            <div className='text-center display-4'>
                Task List
            </div>
            <div className='row'>
                <div className='col-2'>

                </div>
                <div className='bg-dark p-5 col-8'>
                    {taskList.map((item, index) => {
                        return <div key={index}
                            onDragStart={(e) => {
                                handleDragStart(e, item, index);
                            }}
                            onDragEnter={(e) => {
                                handleDragEnter(e, item, index);
                            }}
                            draggable='true'
                            className='bg-success text-white mt-2 p-3'>
                            {item.taskname}
                        </div>;
                    })}
                </div>
                <div className='col-2'>

                </div>
            </div>


        </div>
    );
}
