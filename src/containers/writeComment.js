import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useCreatePost } from "./useCreatePost";

const WriteComment = ({ parent_post_id }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            ingredients: '',
            image: '',
        }
    });  

    const { user } = useUser();

    const queryClient = useQueryClient();
     
    const createCommentMutation = useCreatePost({
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
                <img 
                    className='user-img hover:cursor-pointer'
                    src={user?.profileImageUrl} 
                    alt='profileImage'
                    />
                <div className="w-full flex items-center pr-4">
                    <input
                        placeholder='Comente algo ...'
                        className='border-stone '
                        {...register('title')}
                    />
                    <button className={`fweet-btn w-28 col-start-2 justify-self-end
                        ${isValid ? 'btn-valid' : 'btn-invalid'}`}>
                        Fweet
                    </button>
                </div>
            </div>
        </form>
    )
}

export default WriteComment;