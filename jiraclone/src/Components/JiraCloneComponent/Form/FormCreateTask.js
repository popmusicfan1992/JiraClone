import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Select, Radio, Slider, InputNumber } from 'antd';
import { useState } from 'react';
import { number } from 'yup/lib/locale';
import { ClockCircleOutlined } from '@ant-design/icons';
import { CREATE_TASK_SAGA, GET_ALLPROJECT_CREATE_SAGA, GET_ALL_PRIORITY_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_STATUS_SAGA, GET_USER, GET_USER_BY_ID, GET_USER_SAGA } from '../../../redux/constants/JiraClone/JiraCloneConstant';
const { Option } = Select;

function FormCreateTask(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;
    const dispatch = useDispatch();
    //lấy dữ liệu từ redux
    const { arrProjectList } = useSelector(state => state.ProjectJiraReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrUserById } = useSelector(state => state.UserJiraCloneReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const userArr = arrUserById?.map((item, index) => {
        return { value: item.userId, label: item.name };

    });
    console.log(userArr);
    useEffect(() => {


        dispatch({
            type: GET_ALLPROJECT_CREATE_SAGA
        });
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        });
        dispatch({
            type: GET_ALL_PRIORITY_SAGA
        });

        dispatch({
            type: GET_STATUS_SAGA
        });
        dispatch({
            type: 'SUBMIT_FORM_CREATE_TASK',
            callBackSubmit: handleSubmit
        });


    }, []);
    const [ size, setSize ] = React.useState('default');
    const [ timeTracking, setTimeTracking ] = useState({
        timeTrackingSpent: 15,
        timeTrackingRemaining: 5
    });
    const handleSizeChange = e => {
        setSize(e.target.value);
    };
    return (
        <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
            <div className='form-group'>
                <p>project</p>
                <select name='projectId' className='form-control' onChange={(e) => {
                    console.log(e.target.value);
                    dispatch({
                        type: GET_USER_BY_ID,
                        projectId: e.target.value
                    });
                }}>
                    {arrProjectList.map((item, index) => {
                        return <option key={index} value={item.id}>{item.projectName}</option>;
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p>Task Name</p>
                <input name="taskName" className="form-control" onChange={handleChange} />

            </div>
            <div className='form-group'>
                <p>Status</p>
                <select name='statusId' className='form-control'>
                    {arrStatus.map((item, index) => {
                        return <option value={item.statusId} key={index}>{item.statusName}</option>;
                    })}
                </select>

            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>priority</p>
                        <select name="priorityId" className='form-control'>
                            {arrPriority.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>;
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select name='typeId' className='form-control'>
                            {arrTaskType.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>;
                            })}
                        </select>

                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            options={userArr}
                            placeholder="Please select"
                            optionFilterProp='label'
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values);
                            }}
                            style={{ width: '100%' }}
                        >

                        </Select>
                        <p className='mb-1 mt-2'>Original Estimate</p>
                        <input type='number' name='originalEstimate' size="large" min={1} max={100000} className='form-control' onChange={handleChange} />
                    </div>
                    <div className='col-6'>
                        <p>Time Tracking</p>

                        <div className='row'>
                            <div className='col-2 text-right'>
                                <ClockCircleOutlined style={{ width: 20, height: 20 }} />
                            </div>
                            <div className='col-10'>
                                <Slider defaultValue={timeTracking.timeTrackingSpent} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-6 text-left font-weight-bold'>
                                {timeTracking.timeTrackingSpent}h logged
                            </div>
                            <div className='col-6 text-right font-weight-bold'>
                                {timeTracking.timeTrackingRemaining}h remaining
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input className='form-control' type='number' name='timeTrackingSpent' size="large" min={1} max={100000} onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setFieldValue('timeTrackingSpent', e.target.value);
                                }} />
                            </div>
                            <div className='col-6 text-right'>
                                <p>Time remaining</p>
                                <input className='form-control' type='number' name='timeTrackingRemaining' size="large" min={1} max={100000} onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    setFieldValue('timeTrackingRemaining', e.target.value);
                                }} />
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div className='form-group'>
                <p>Reporter</p>
                <Select
                    mode="multiple"
                    size={size}
                    placeholder="Please select"
                    defaultValue={[ 'a10', 'c12' ]}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >

                </Select>

            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Task Description</p>
                <Editor
                    name='description'
                    onEditorChange={(content, editor) => {
                        setFieldValue('description', content);
                    }}
                    // initialValue={values.description}
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
            </div>

        </form>
    );
}
const frmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (propsFormik) => {
        const { arrStatus, arrProjectList, arrTaskType, arrPriority } = propsFormik;
        return {
            listUserAsign: [],
            taskName: '',
            description: "",
            statusId: arrStatus[ 0 ]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProjectList[ 0 ]?.id,
            typeId: arrTaskType[ 0 ]?.id,
            priorityId: arrPriority[ 0 ]?.priorityId

        };
    },
    validationSchema: Yup.object().shape({
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_TASK_SAGA,
            task: values
        });
        console.log(values);
    },
    displayName: 'Create Task',
})(FormCreateTask);
// const { arrProjectList } = useSelector(state => state.ProjectJiraReducer);
// const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
// const { arrPriority } = useSelector(state => state.PriorityReducer);
// const { userSearch } = useSelector(state => state.UserJiraCloneReducer);
// const { arrStatus } = useSelector(state => state.StatusReducer);
const mapStateToProps = (state) => {
    return {
        arrStatus: state.StatusReducer.arrStatus,
        arrProjectList: state.ProjectJiraReducer.arrProjectList,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority
    };
};
export default connect(mapStateToProps)(frmCreateTask);