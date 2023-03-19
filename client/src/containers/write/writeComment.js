import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import PostButton from "../../components/button/postButton";
import UserImg from "../../components/img/userImg";
import { AuthContext } from "../../contexts/authContext";
import { createPost } from "../../services/postsService";
import { baseURL } from "../../utils/constants";

const WriteComment = ({ closePopup, parent_id }) => {
    const { register, handleSubmit, reset } = useForm({
        title: '',
        ingredients: [],
        description: '',
        file: [],
    });    

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const onSubmit = data => {
        commentMutation.mutate(data);
        reset();
    }

    const commentMutation = useMutation(
        (data) => createPost({ 
            user_id: currentUser.id,
            parent_id,
            data
         }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['postComments', { parent_id }])
                queryClient.invalidateQueries(['posts'])
                closePopup && closePopup();
            }
         }
    );

    return(
        <form 
            autoComplete="off" 
            className=" flex flex-col bg-inherit py-2" 
            onSubmit={handleSubmit(onSubmit)}
            >
            <div className="flex flex-row py-2">
                <div className='w-20 flex justify-center'>
                    <div className="w-12 h-12">  
                        <UserImg clickable={false} user={currentUser}/>
                    </div>
                </div>
                <input 
                    placeholder={'Comente algo ...'}
                    className={`w-full placeholder:text-stone-500 rounded-md 
                            text-white align-middle outline-none h-12 
                            bg-inherit text-xl py-1 pl-2 
                            focus:placeholder:invisible focus:border-stone-500 
                            hover:border-stone-600 transition-colors`}
                    {...register('title')}
                    />
                <div className="w-24 flex items-center">
                    <PostButton isValid={true} type='submit'/>
                </div>
            </div>
        </form>
    )
}

export default WriteComment;