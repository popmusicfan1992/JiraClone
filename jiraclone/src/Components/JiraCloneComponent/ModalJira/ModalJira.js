import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParse from 'react-html-parser';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import { Popconfirm, message, Button } from 'antd';
import { Input } from 'antd';

import { ADD_ASSIGNESS, CHANGE_TASK_MODAL, DELETED_COMMENT_SAGA, GET_ALL_PRIORITY_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_STATUS_SAGA, HANDLE_CHANGE_POST_API_UPDATE_TASK_SAGA, INSERT_COMMENT_SAGA, REMOVE_ASSIGNESS, REMOVE_TASK_SAGA, UPDATE_COMMENT_SAGA, UPDATE_STATUS_TASK_SAGA, USLOGIN } from '../../../redux/constants/JiraClone/JiraCloneConstant';
import { USER_LOGIN } from '../../../util/constanst/settingSystem';
const { Option } = Select;

const text = 'Are you sure to delete this task?';
const { TextArea } = Input;

export default function ModalJira(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetails } = useSelector(state => state.ProjectEditReducer);
    const { listComment } = useSelector(state => state.CommentReducer);
    const [ userComment, setUserComment ] = useState('');
    const usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
    const [ contentComment, setContentComment ] = useState('');
    const [ visible, setVisible ] = useState(false);
    const [ contentDes, setContentDes ] = useState('');
    const handleChange = (e) => {
        let { value, name } = e.target;
        dispatch({
            type: HANDLE_CHANGE_POST_API_UPDATE_TASK_SAGA,
            actionType: CHANGE_TASK_MODAL,
            value,
            name
        });
    };
    function confirm(taskId) {
        dispatch({
            type: REMOVE_TASK_SAGA,
            taskId,
            projectId: projectDetails.id,
        });
    }
    const renderComment = () => {

        return listComment?.map((comment, index) => {
            return <div className="lastest-comment">
                <div className="comment-item">
                    <div className="display-comment" style={{ display: 'flex' }}>
                        <div className="avatar">
                            <img src={comment.user.avatar} alt='123' />
                        </div>
                        <div style={{ width: '100%' }}>
                            <p style={{ marginBottom: 5 }}>
                                {comment.user.name}
                            </p>
                            {!comment.deleted ? <div>
                                <p style={{ marginBottom: 5 }}>
                                    {ReactHtmlParse(comment.contentComment)}
                                </p>
                                <div>
                                    <span style={{ color: '#929398', cursor: 'pointer' }} onClick={(e) => {
                                        e.preventDefault();
                                        dispatch({
                                            type: 'DISPLAY_COMMENT',
                                            index

                                        });
                                    }}>Edit</span>
                                    •
                                    <Popconfirm
                                        placement="rightBottom"
                                        title={'Deleted this comment?'}
                                        onConfirm={() => {
                                            dispatch({
                                                type: DELETED_COMMENT_SAGA,
                                                id: comment.id,
                                                taskId: comment.taskId
                                            });
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <span style={{ color: '#929398', cursor: 'pointer' }}>Delete</span>
                                    </Popconfirm>

                                </div>
                            </div> : <form >
                                <TextArea rows={2} defaultValue={comment.contentComment} onChange={(e) => {
                                    setContentComment(e.target.value);
                                }} />
                                <div className='mt-2'>
                                    <button type="submit" className='btn btn-primary' style={{ fontSize: 12 }} onClick={(e) => {
                                        e.preventDefault();
                                        dispatch({
                                            type: 'DISPLAY_COMMENT',
                                            index

                                        });
                                        dispatch({
                                            type: UPDATE_COMMENT_SAGA,
                                            id: comment.id,
                                            content: contentComment,
                                            taskId: comment.taskId
                                        });
                                    }}>Save</button>
                                    <button className='btn btn-light' style={{ fontSize: 12 }} onClick={(e) => {
                                        e.preventDefault();
                                        dispatch({
                                            type: 'DISPLAY_COMMENT',
                                            index

                                        });
                                    }}>Cancel</button>
                                </div>
                            </form>}
                        </div>

                    </div>
                </div>
            </div >;
        });

    };
    const renderDescription = () => {

        let des = ReactHtmlParse(taskDetailModal.description);
        return <div onClick={() => {
            setVisible(!visible);
        }}>
            {visible ? <div>

                <Editor
                    name='description'
                    onEditorChange={(content, editor) => {
                        setContentDes(content);
                    }}
                    initialValue={taskDetailModal.description}
                    init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <button className='btn btn-primary mt-2 mr-2' onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_UPDATE_TASK_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: contentDes
                    });
                }}>Save</button>
                <button className='btn btn-light mt-2'>Cancel</button>
            </div> : <div onClick={() => {
                setVisible(!visible);
            }}>
                {des}
            </div>}
        </div>;

    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_STATUS_SAGA
        });
        dispatch({
            type: GET_ALL_PRIORITY_SAGA
        });
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        });
    }, []);

    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100);
        return <div>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: percent }} aria-valuenow={timeTrackingSpent} aria-valuemin={timeTrackingRemaining} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{timeTrackingSpent}h logged</p>
                    <p className="estimate-time">{timeTrackingRemaining}h estimated</p>
                </div>
            </div>
            <div className='row'>
                <div className="col-6">
                    <input type="number" name='timeTrackingSpent' className='form-control' onChange={(e) => {
                        handleChange(e);
                    }} />
                </div>
                <div className='col-6'>
                    <input type="number" name='timeTrackingRemaining' className='form-control' onChange={(e) => {
                        handleChange(e);
                    }} />
                </div>
            </div>
        </div>;
    };

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">

            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select name='typeId' onChange={(e) => { handleChange(e); }} value={taskDetailModal.typeId}>
                                {arrTaskType.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.taskType}</option>;
                                })}
                            </select>
                            <span>{taskDetailModal.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane mr-2" />
                                <span style={{ paddingRight: 20, cursor: 'not-allowed' }} disable>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link mr-2" />
                                <span style={{ paddingRight: 20, cursor: 'not-allowed' }} disable>Copy link</span>
                            </div>
                            <Popconfirm
                                placement="topRight"
                                title={text}
                                onConfirm={() => {
                                    confirm(taskDetailModal.taskId);
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            </Popconfirm>

                            <button id='close_modal' type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description" onClick={() => {
                                        setVisible(!visible);
                                    }}>
                                        <p style={{ fontSize: 20, fontWeight: '500' }}>Description</p>
                                        <p>
                                            {renderDescription()}
                                        </p>
                                    </div>
                                    <div style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 18 }}>
                                        Jira Software (software projects) issue types:
                                    </div>
                                    <div className="title">
                                        <div className="title-item">
                                            <h3>BUG <i className="fa fa-bug" /></h3>
                                            <p>
                                                A bug is a problem which impairs or prevents the
                                                function of a product.
                                            </p>
                                        </div>
                                        <div className="title-item">
                                            <h3>STORY <i className="fa fa-book-reader" /></h3>
                                            <p>
                                                A user story is the smallest unit of work that needs to
                                                be done.
                                            </p>
                                        </div>
                                        <div className="title-item">
                                            <h3>TASK <i className="fa fa-tasks" /></h3>
                                            <p>A task represents work that needs to be done</p>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <form className="block-comment" style={{ display: 'flex' }} onSubmit={(e) => {
                                            e.preventDefault();
                                            dispatch({
                                                type: INSERT_COMMENT_SAGA,
                                                comment: {
                                                    taskId: taskDetailModal.taskId,
                                                    contentComment: userComment
                                                },

                                            });
                                            setUserComment('');

                                        }}>
                                            <div className="avatar">
                                                <img src={usLogin?.avatar} alt='123' />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" className='comment-input' value={userComment} placeholder="Add a comment ..." onChange={(e) => {
                                                    setUserComment(e.target.value);
                                                }} />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>Enter</span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </form>
                                        {renderComment()}

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name='statusId' className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {
                                            // dispatch({
                                            //     type: UPDATE_STATUS_TASK_SAGA,
                                            //     taskStatusUpdate: {
                                            //         taskId: taskDetailModal.taskId,
                                            //         statusId: e.target.value
                                            //     },
                                            //     projectId: taskDetailModal.projectId

                                            // });
                                            handleChange(e);
                                        }}>
                                            {arrStatus.map((status, index) => {
                                                return <option value={status.statusId} key={index}>{status.statusName}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row'>
                                            {taskDetailModal.assigness?.map((user, index) => {
                                                return <div className='col-6'>
                                                    <div className="item mt-2" style={{ display: 'flex', alignItems: 'center' }} key={index}>
                                                        <div className="avatar">
                                                            <img src={user.avatar} alt='123' />
                                                        </div>
                                                        <p className="name">
                                                            {user.name}
                                                            <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                dispatch({
                                                                    actionType: REMOVE_ASSIGNESS,
                                                                    type: HANDLE_CHANGE_POST_API_UPDATE_TASK_SAGA,
                                                                    userId: user.id
                                                                });
                                                            }} />
                                                        </p>
                                                    </div>
                                                </div>;
                                            })}

                                            <div className='col-6 my-3' style={{ cursor: 'pointer', color: 'blue' }}>

                                                <Select
                                                    options={projectDetails.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness.findIndex(user => user.id === mem.userId);
                                                        if (index !== -1) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }).map((user, index) => {
                                                        return { label: user.name, value: user.userId };
                                                    })}
                                                    style={{ width: '100%' }}
                                                    placeholder="Add more"
                                                    optionFilterProp="label"

                                                    onSelect={(value) => {
                                                        let userSelected = projectDetails.members.find(user => user.userId === value);
                                                        userSelected = { ...userSelected, id: value };
                                                        dispatch({
                                                            actionType: ADD_ASSIGNESS,
                                                            type: HANDLE_CHANGE_POST_API_UPDATE_TASK_SAGA,
                                                            userSelected
                                                        });

                                                    }}

                                                >
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={require('../../../assets/img/download (1).jfif').default} alt='123' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                                                <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className='form-control' defaultValue={taskDetailModal.priorityTask.priorityId} name='priorityId' onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option value={item.priorityId} key={index}>{item.priority}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name='originalEstimate' type="number" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                            handleChange(e);
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
}
