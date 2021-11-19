import React, { Fragment, useState, useEffect } from "react";
import { Route } from 'react-router-dom';
import { Button } from "antd";
import { Layout } from 'antd';


const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    const [ size, setSize ] = useState({ height: window.innerHeight });
    useEffect(() => {
        window.onresize = () => {
            setSize({
                height: window.innerHeight
            });
        };
    }, []);
    let { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ height: size.height }} >

                <Sider width='60%' style={{ backgroundImage: 'url(./img/bg-01.jpg)', backgroundSize: '100%' }} />
                <Content>
                    <Component {...propsRoute} />
                </Content>



            </Layout>

        </Fragment>;
    }} />;
};