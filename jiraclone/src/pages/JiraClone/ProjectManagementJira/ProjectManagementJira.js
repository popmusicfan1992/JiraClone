import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Space, Tag, Popover, AutoComplete } from 'antd';
import ReactHtmlParse from 'react-html-parser';
import { EditTwoTone, DeleteTwoTone, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_USER_SAGA, REMOVE_USER_FROM_PROJECT_SAGA } from '../../../redux/constants/JiraClone/JiraCloneConstant';
import FormEditProject from '../../../Components/JiraCloneComponent/Form/FormEditProject';
import { Popconfirm, message, Avatar, Image } from 'antd';
import { NavLink } from 'react-router-dom';


function cancel(e) {
    message.error('Click on No');
}

export default function ProjectManagementJira() {

    const projectList = useSelector(state => state.ProjectJiraReducer.projectList);
    const userSearch = useSelector(state => state.UserJiraCloneReducer.userSearch);
    const [ value, setValue ] = useState('');
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_LIST_PROJECT_SAGA
        });
    }, []);
    const [ state, setState ] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });
    const handleChange = (pagination, filters, sorter) => {

        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };
    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };
    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => b.id - a.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetails/${record.id}`}>{text}</NavLink>;
            },
            sorter: (a, b) => a.projectName.length - b.projectName.length,
            sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',

            filters: [
                { text: 'Dự án web', value: 'Dự án web' },
                { text: 'Dự án di động', value: 'Dự án di động' },
                { text: 'Dự án phần mềm', value: 'Dự án phần mềm' },
            ],
            filteredValue: filteredInfo.categoryName || null,
            onFilter: (value, record) => record.categoryName.includes(value),
            sorter: (a, b) => a.categoryName.length - b.categoryName.length,
            sortOrder: sortedInfo.columnKey === 'categoryName' && sortedInfo.order,
            ellipsis: true,
            render: (text, record, index) => {
                let jsxContent = ReactHtmlParse(text);
                return <div key={record}>
                    {jsxContent}
                </div>;
            }
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            ellipsis: true,
            render: (text, record, index) => {

                return <Tag color="#2db7f5">{text.name}</Tag>;
            }
        },
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                return <div>

                    {record.members.slice(0, 3).map((item, index) => {

                        return <Popover placement="top" title={'User'} trigger="click" content={() => {
                            return <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>avatar</th>
                                        <th>name</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {record.members.map((item, index) => {

                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} alt={123} style={{ width: 30, height: 30, borderRadius: '50%' }} /></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Popconfirm placement="right" title={'Are you sure remove user from project!'} onConfirm={() => {
                                                    dispatch({
                                                        type: REMOVE_USER_FROM_PROJECT_SAGA,
                                                        userProject: {
                                                            projectId: record.id,
                                                            userId: item.userId
                                                        }
                                                    });
                                                }} okText="Yes" cancelText="No">
                                                    <button className='btn btn-danger' ><DeleteOutlined />
                                                    </button>
                                                </Popconfirm>
                                            </td>
                                        </tr>;
                                    })}
                                </tbody>
                            </table>;

                        }}>
                            <Avatar style={{ cursor: 'pointer' }} src={item.avatar} />
                        </Popover>;

                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="bottom" title={'ADD USER'} trigger="click" content={() => {
                        return <AutoComplete
                            options={userSearch?.map((item, index) => {
                                return { label: item.name, value: item.userId };
                            })} style={{ width: '100%' }}
                            onSelect={(valueSelect, option) => {
                                setValue(option.label);
                                dispatch({
                                    type: ADD_USER_SAGA,
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": valueSelect
                                    }
                                });
                            }}
                            value={value}
                            onChange={(value) => {
                                setValue(value);

                            }}
                            onSearch={(value) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current);
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({
                                        type: GET_USER_SAGA,
                                        keyword: value
                                    });
                                }, 300);

                            }}
                            placeholder="input here"
                        />;
                    }}>
                        <Button>+</Button>
                    </Popover>
                </div>;

            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {

                return (
                    <div>
                        <a className='mr-3' onClick={() => {
                            dispatch({
                                type: 'OPEN_FORM_EDIT',
                                ComponentContent: <FormEditProject />
                            });
                            dispatch({
                                type: 'EDIT_PROJECT',
                                projectEdit: record
                            });
                        }}><EditTwoTone /></a>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => {
                                dispatch({
                                    type: DELETE_PROJECT_SAGA,
                                    projectId: record.id
                                });

                            }}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a><DeleteTwoTone style={{ color: 'red' }} /></a>
                        </Popconfirm>

                    </div>

                );
            },
        },


    ];
    return (
        <div className='mt-5 project_management_css'>
            <h3>Project Management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={projectList} key={columns.length} rowKey={'id'} onChange={handleChange} />
        </div>
    );
};
