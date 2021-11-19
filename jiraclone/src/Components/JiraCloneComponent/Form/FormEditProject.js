import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { GET_ALL_PROJECT_CATEGORY_SAGA, UPDATE_PROJECT_SAGA } from '../../../redux/constants/JiraClone/JiraCloneConstant';
function FormEditProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);

    const dispatch = useDispatch();
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
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        });
        dispatch({
            type: 'SUBMIT_FORM',

            callBackSubmit: handleSubmit
        });
    }, []);
    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content);
    };
    return (
        <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Id</p>
                        <input disabled value={values.id} className="form-control" name='id' />
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Name</p>
                        <input value={values.projectName} className="form-control" name='projectName' />
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Category</p>
                        <select className='form-control' name='categoryId' value={values.categoryId}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value={item.id} key={index}>{item.projectCategoryName}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Description</p>
                        <Editor
                            name='description'
                            onEditorChange={handleEditorChange}
                            initialValue={values.description}
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
                </div>


            </div>
        </form>
    );
}
const EditProjectWithFormik = withFormik({

    enableReinitialize: true,
    mapPropsToValues: (propsFormik) => {
        const { id, projectName, creator, description, categoryId } = propsFormik.projectEdit;

        return {
            id: id,
            projectName: projectName,
            description: description,
            categoryId: categoryId,

        };
    },

    validationSchema: Yup.object().shape({

    }),


    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values
        });


    },

    displayName: 'BasicForm',
})(FormEditProject);

const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectEditReducer.projectEdit
    };
};
export default connect(mapStateToProps)(EditProjectWithFormik);