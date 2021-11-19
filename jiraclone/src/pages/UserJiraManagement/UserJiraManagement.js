import React, { useEffect } from 'react';
import { Input, Table, Button, Space, Popconfirm } from 'antd';
import { UserOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER_SAGA, GET_LIST_USER_SAGA, GET_USER_SAGA } from '../../redux/constants/JiraClone/JiraCloneConstant';
import FormCreateUser from '../../Components/JiraCloneComponent/Form/FormCreateUser';
import FormEditUser from '../../Components/JiraCloneComponent/Form/FormEditUser';
const { Search } = Input;
export default function UserJiraManagement() {
    const dispatch = useDispatch();
    const { userList } = useSelector(state => state.UserJiraCloneReducer);
    useEffect(() => {
        dispatch({
            type: GET_LIST_USER_SAGA,
            keyword: ''
        });
    }, []);
    const onSearch = (value) => {
        dispatch({
            type: GET_LIST_USER_SAGA,
            keyword: value
        });
    };
    const [ state, setState ] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            dataIndex: 'userId',
            key: 'userId',
            filteredValue: filteredInfo.name || null,
            sorter: (a, b) => a.userId - b.userId,
            sortOrder: sortedInfo.columnKey === 'userId' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            onFilter: (value, record) => record.phoneNumber.includes(value),
            sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
            sortOrder: sortedInfo.columnKey === 'phoneNumber' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            ellipsis: true,
            render: (text, record, index) => {
                return <>
                    <a className='mr-3' onClick={() => {
                        dispatch({
                            type: 'OPEN_EDIT_USER',
                            ComponentContentDrawer: <FormEditUser />,
                        });
                        dispatch({
                            type: "GET_EDIT_USER",
                            userEdit: record
                        });
                    }}><EditTwoTone /></a>
                    <Popconfirm placement="top" title={"Deleted User?"} onConfirm={() => {

                        dispatch({
                            type: DELETE_USER_SAGA,
                            userId: record.userId
                        });
                    }} okText="Yes" cancelText="No">
                        <a><DeleteTwoTone style={{ color: 'red' }} /></a>
                    </Popconfirm>

                </>;
            }
        },
    ];

    return (
        <div className='user_management_css mt-5'>
            <div className='text-primary' style={{ cursor: 'pointer', fontSize: 25 }} onClick={() => {
                dispatch({
                    type: 'OPEN_CREATE_USER',
                    ComponentContentDrawer: <FormCreateUser />,
                });
            }}>
                Create User
            </div>
            <form className='mt-3' onSubmit={(e) => { e.preventDefault(); }}>
                <Search
                    prefix={<UserOutlined />}
                    placeholder="Search User..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </form>
            <Space style={{ marginBottom: 16, marginTop: 30 }}>

            </Space>
            <Table columns={columns} dataSource={userList} onChange={handleChange} />
        </div>
    );
}
