import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, FacebookFilled, TwitterCircleFilled, MailOutlined, PhoneFilled, LockFilled, } from '@ant-design/icons';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SIGN_UP_SAGA } from '../../../redux/constants/JiraClone/JiraCloneConstant';
import { useEffect } from 'react';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
function FormCreateUser(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'SUBMIT_FORM',
            callBackSubmit: handleSubmit
        });
    }, []);
    const { title } = useSelector(state => state.DrawerReducer);
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <form className='container' style={{ height: '100%' }} onSubmit={handleSubmit} onChange={handleChange}>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                <div className='text-center'>
                    <h3>{title}</h3>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" name='name' onChange={handleChange} />
                    <span className='text-danger w-100'>{errors.name}</span>

                    <Input prefix={<MailOutlined />} placeholder="Email" name='email' className='mt-4' onChange={handleChange} />
                    <span className='text-danger w-100'>{errors.email}</span>
                    <Input
                        name='phoneNumber'
                        className='mt-4'
                        prefix={<PhoneFilled />}
                        type="tel"
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                    <span className='text-danger w-100'>{errors.phone}</span>
                    <Input type='password' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="PassWord" name='passWord' className='mt-4' onChange={handleChange} />
                    <span className='text-danger w-100'>{errors.password}</span>
                    <Input type='password' prefix={<LockFilled className="site-form-item-icon" />} placeholder="Confirm PassWord" name='passwordConfirmation' className='mt-4' onChange={handleChange} />
                    <span className='text-danger w-100'>{errors.passwordConfirmation}</span>
                    <div className='mt-5'>
                        {/* <Button type="primary" shape="circle" icon={<FacebookFilled />} size={'large'} style={{ marginRight: 40, backgroundColor: '#3b5998' }} />

                        <Button type="primary" shape="circle" icon={<TwitterCircleFilled />} size={'large'} /> */}
                    </div>


                </div>

            </div>

        </form>
    );
}
const CreateUserWithFormik = withFormik({

    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        name: '',
        phoneNumber: ''
    }),
    validationSchema: Yup.object().shape({

        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('email invalid!'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        passWord: Yup.string().min(6, 'password have min 6 charater!').required('password is required').max(12, 'password have max 12 character'),
        passwordConfirmation: Yup.string()
            .oneOf([ Yup.ref('passWord'), null ], 'Passwords must match')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch({
            type: SIGN_UP_SAGA,
            user: values,
            push: 'createuser'
        });
        props.dispatch({
            type: 'CLOSE_DRAWER'
        });

    },

    displayName: 'Create User',
})(FormCreateUser);
export default connect()(CreateUserWithFormik);