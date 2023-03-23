import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import PostButton from "../../components/postButton";
import UserImg from "../../components/userImg";
import Input from '../../components/input';
import { AuthContext } from "../../contexts/authContext";
import { createPost } from "../../services/singleService";

const CreateCommentForm = ({ onClose, parent_id }) => {
    const { register, handleSubmit, reset } = useForm({
        title: '',
        ingredients: [],
        description: '',
        file: [],
    });    

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const commentMutation = useMutation(
        (data) => createPost({ 
            user_id: currentUser.id,
            parent_id,
            data
         }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['postComments', { 
                    parent_id 
                }])
                queryClient.invalidateQueries(['homePosts'])
                queryClient.invalidateQueries(['profilePosts'])
                reset();
                onClose && onClose();
            }
         }
    );

    const onSubmit = data => {
        commentMutation.mutate(data);
    }

    return(
        <form 
            autoComplete="off" 
            className="flex flex-col bg-inherit py-2" 
            onSubmit={handleSubmit(onSubmit)}
            >
            <div className="flex flex-row my-2">
                <div className="w-20 flex justify-center">  
                    <div className='w-12 h-12'>
                        <UserImg clickable={false} user={currentUser}/>
                    </div>
                </div>
                <div className="w-full flex items-center pr-4">
                    <Input 
                        placeholder='Comente algo ...'
                        name='title'
                        border={false}
                        register={register}
                        />
                    <div className="flex w-24">
                        <PostButton isValid={true} type='submit'/>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateCommentForm;