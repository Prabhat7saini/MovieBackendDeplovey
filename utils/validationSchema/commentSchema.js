const yup = require('yup');

const commentSchema = yup.object().shape({
    text: yup.string()
        .required(' commnet is required'),
        
   
    rating:yup.string().required('rating is required')
   
    
});


module.exports = {
    commentSchema,
};