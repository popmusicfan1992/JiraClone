import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, FacebookFilled, TwitterCircleFilled, LockTwoTone, MailTwoTone } from '@ant-design/icons';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { jiraCloneSigninAction } from '../../../redux/action/JiraCloneAction';
import { NavLink } from 'react-router-dom';
function LoginJira(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{ height: '100%' }}>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                <div className='text-center'>
                    <h3>Login Jira Clone</h3>

                    <Input onChange={handleChange} prefix={<MailTwoTone className="site-form-item-icon" />} placeholder="Email" name='email' />
                    <span className='text-danger w-100'>{errors.email}</span>
                    <Input
                        onChange={handleChange}
                        name='password'
                        className='mt-2'
                        prefix={<LockTwoTone className="site-form-item-icon" />}
                        type="password"

                        placeholder="Password"
                    />
                    <span className='text-danger w-100'>{errors.password}</span>

                    <Button size='large' style={{ width: '100%', marginTop: 20, background: '#6675df' }} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <NavLink to={'/signup'} style={{ marginTop: 100, color: 'blueviolet', cursor: 'pointer' }}>Don't have an account</NavLink>



                </div>

            </div>

        </form>
    );
}
const LoginJiraWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required').email('email invalid!'),
        password: Yup.string().min(6, 'password have min 6 charater!').required('password is required').max(12, 'password have max 12 character')
    }),
    // Custom sync validation
    // validate: values => {
    //     const errors = {};

    //     if (!values.name) {
    //         errors.name = 'Required';
    //     }

    //     return errors;
    // },


    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(jiraCloneSigninAction(values.email, values.password));

    },

    displayName: 'BasicForm',
})(LoginJira);
export default connect()(LoginJiraWithFormik);
