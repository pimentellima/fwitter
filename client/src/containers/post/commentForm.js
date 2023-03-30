import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from '../../components/input';
import PostButton from "../../components/postButton";
import UserImg from "../../components/userImg";
import { AuthContext } from "../../contexts/authContext";
import { useCreatePostMutation } from "../hooks/useCreatePostMutation";

const CommentForm = ({ parent_post_id, onClose = () => {} }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            parent_post_id,
            ingredients: '',
            description: '',
            file: '',
        }
    });  

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
     
    const createCommentMutation = useCreatePostMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['comments']);
            onClose();
            reset();
        }
    });

    const onSubmit = data => {
        createCommentMutation.mutate(data);
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

export default CommentForm;