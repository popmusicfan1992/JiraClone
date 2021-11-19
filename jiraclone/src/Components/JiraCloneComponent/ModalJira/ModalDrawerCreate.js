import React, { useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from 'antd/lib/layout/layout';
const { Option } = Select;

export default function ModalCreate() {
    const { visible, ComponentContent, callBackSubmit, title } = useSelector(state => state.DrawerReducer);
    const dispatch = useDispatch();




    const onClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER'
        });
    };
    return (
        <div>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

            >
                {ComponentContent}

                <Footer style={{ textAlign: 'right' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={callBackSubmit} type="primary">
                        Submit
                    </Button>
                </Footer>
            </Drawer>
        </div>
    );
}
