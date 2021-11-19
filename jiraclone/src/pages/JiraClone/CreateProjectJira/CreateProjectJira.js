import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { CREATE_PROJECT_CATEGORY_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/JiraClone/JiraCloneConstant';
function CreateProjectJira(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        });
    }, []);
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
    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content);
    };
    return (
        <div className='create-project-jira mt-4'>
            <h3>CreateProject</h3>
            <form className='container' onSubmit={handleSubmit} >
                <div className='form-group'>
                    <p>Name</p>
                    <input name='projectName' className='form-control' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <p>Decription</p>
                    <Editor
                        name='description'
                        onEditorChange={handleEditorChange}
                        init={{
                            height: 500,
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
                <div className='form-group'>
                    <select className='form-control' name='categoryId' onChange={handleChange}>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>;
                        })}
                    </select>
                    <button className='btn btn-outline-primary mt-4' type='submit'>Create Project</button>
                </div>
            </form>
        </div>
    );
}
const CreateProjectWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (propsFormik) => {

        return {
            projectName: '',
            description: '',
            categoryId: propsFormik.arrProjectCategory[ 0 ]?.id,

        };
    },

    validationSchema: Yup.object().shape({

    }),


    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch({
            type: CREATE_PROJECT_CATEGORY_SAGA,
            newProject: values
        });
    },

    displayName: 'BasicForm',
})(CreateProjectJira);

const mapStateToProps = (state) => {
    return {
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
    };
};
export default connect(mapStateToProps)(CreateProjectWithFormik);
