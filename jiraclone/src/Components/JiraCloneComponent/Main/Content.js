import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_COMMENT_SAGA, GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/JiraClone/JiraCloneConstant';
import { DragDropContext, Droppable, provided, Draggable } from 'react-beautiful-dnd';
import { Popconfirm, message, Button } from 'antd';

export default function Content(props) {
    const { projectDetails } = props;
    const dispatch = useDispatch();
    const handleOver = (result) => {
        let { source, destination } = result;
        console.log(result);
        if (!destination) {
            return;
        }
        dispatch({
            type: UPDATE_STATUS_TASK_SAGA,
            taskStatusUpdate: {
                "taskId": result.draggableId,
                "statusId": destination.droppableId
            },
            projectId: projectDetails.id
        });

    };
    const renderCardTaskList = () => {

        return <DragDropContext onDragEnd={handleOver}>
            {projectDetails.lstTask?.map((item, index) => {
                return <Droppable droppableId={item.statusId} key={index}>
                    {(provided) => {
                        return <div
                            className="card" style={{ width: '17rem', height: 'auto' }} key={index}>
                            <div className="card-header">

                                {item.statusName}
                            </div>

                            <ul className="list-group list-group-flush" ref={provided.innerRef}{...provided.droppableProps} key={index}>

                                {item.lstTaskDeTail.map((task, index) => {

                                    return <Draggable key={task.taskId.toString()} index={index} draggableId={task.taskId.toString()} >
                                        {(provided) => {
                                            return <li ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}
                                                key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() => {
                                                    dispatch({
                                                        type: GET_TASK_DETAIL_SAGA,
                                                        taskId: task.taskId

                                                    });
                                                    dispatch({
                                                        type: GET_COMMENT_SAGA,
                                                        taskId: task.taskId
                                                    });
                                                }}>
                                                {task.taskTypeDetail.id == 1 ? <i className="fa fa-bug text-danger"></i> : <i className="fa fa-bookmark" />}

                                                <p className='font-weight-bold'>
                                                    {task.taskName}
                                                </p>
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left">
                                                        <p>{task.priorityTask.priority}</p>
                                                        {/* <i className="fa fa-bookmark" />
                                    <i className="fa fa-arrow-up" /> */}
                                                    </div>
                                                    <div className="block-right">
                                                        <div className="avatar-group" style={{ display: 'flex' }}>
                                                            {task.assigness.map((mem, index) => {
                                                                return <div className="avatar" key={index}>
                                                                    <img src={mem.avatar} alt />
                                                                </div>;
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>;
                                        }}

                                    </Draggable>;
                                })}
                                {provided.placeholder}
                            </ul>

                        </div>;

                    }}

                </Droppable>;
            })};
        </DragDropContext>;
    };
    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}

        </div>

    );
}
