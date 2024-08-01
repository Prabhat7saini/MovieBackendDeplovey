const yup = require('yup');

const commentSchema = yup.object().shape({
    text: yup.string()
        .required(' commnet is required')
        .matches(/^[A-Za-z]+$/, 'comment can only contain alphabetic characters'),

   
    rating:yup.string().required('rating is required')
   
    
});


module.exports = {
    commentSchema,
};