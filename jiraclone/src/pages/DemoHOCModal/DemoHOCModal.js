import React from 'react';
import { useDispatch } from 'react-redux';
import SlideDown from '../../Components/Modal/SlideDown';
import Login from '../Login/Login';
import Register from '../Register/Register';
export default function DemoHOCModal() {

    const SlideDownComponent = new SlideDown(Register); 
    const dispatch = useDispatch();


    return (
        <div className='text-center mt-5'>

            <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId" onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <Login />
                });
            }}>
                Đăng nhập
            </button>
            <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId" onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <Register />
                });
            }}>
                Đăng Ký
            </button>
            {SlideDownComponent}



        </div >
    );
}
