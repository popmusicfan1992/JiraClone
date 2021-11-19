import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined, BarsOutlined, SearchOutlined, PlusOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import FormEditProject from './Form/FormEditProject';
import FormCreateTask from './Form/FormCreateTask';
const { Header, Sider, Content } = Layout;

export default function SideBarJiraClone() {
    const dispatch = useDispatch();
    const [ state, setState ] = useState({
        collapsed: true,
    });

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    const showDrawer = () => {
        dispatch({
            type: 'OPEN_DRAWER'
        });
    };
    return (
        <div className='sidebar-jira'>
            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100%' }} >
                <div className='text-center' style={{ cursor: 'pointer' }}>
                    <BarsOutlined style={{ color: 'white', fontSize: '20px' }} onClick={toggle} />
                </div>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => {
                        dispatch({
                            type: 'OPEN_CREATE_TASK',
                            ComponentContentDrawer: <FormCreateTask />
                        });
                    }}>
                        Create Tasks
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined />}>
                        Search Issues
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>

    );
}
