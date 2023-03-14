import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import PostButton from "../../components/postButton";
import { AuthContext } from "../../contexts/authContext";
import { createPost } from "../../services/postsService";

const WriteComment = ({ parent_id, closePopup }) => {
    const { register, handleSubmit } = useForm({
        title: '',
        ingredients: [],
        description: '',
        file: [],
    });    

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const onSubmit = data => {
        commentMutation.mutate(data);
    }

    const commentMutation = useMutation(
        (data) => createPost({ 
            user_id: currentUser.id,
            parent_id,
            data
         }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['postComments', { post_id: parent_id }])
                closePopup && closePopup();
            }
         }
    );

    return(
        <form autoComplete="off" className=" flex flex-col bg-inherit" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    placeholder={'Comente algo ...'}
                    className={`placeholder:text-stone-500 rounded-md text-white align-middle outline-none h-10 bg-inherit text-xl py-1 pl-2 focus:placeholder:invisible focus:border-stone-500 hover:border-stone-600 transition-colors`}
                    {...register('title')}
                    />
            <div className="flex justify-end">
                <div className="mr-4 w-28">
                    <PostButton isValid={true} type='submit'/>
                </div>
            </div>
        </form>
    )
}

export default WriteComment;