import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import RemoveButton from "../../components/button/removeButton";
import PostButton from "../../components/button/postButton";
import UserImg from "../../components/img/userImg";
import { AuthContext } from "../../contexts/authContext";
import { createPost } from "../../services/postsService";

const WritePost = () => {
    const { currentUser } = useContext(AuthContext);
    const [description, setDescription] = useState(false);
    const queryClient = useQueryClient();
    const [imgPreview, setImgPreview] = useState(null);
    
    const { 
        register, 
        unregister,
        handleSubmit, 
        reset,
        control,
        watch,
        setFocus,
        formState: { isValid }
    } = useForm({
        defaultValues: {
            title: '',
            ingredients: [],
            description: '',
            post_img: ''            
        }
    });  

    const imgWatch = watch('post_img');

    useEffect(() => {
        if(!description) {
            unregister('description');
        }
        if(description) {
            setFocus('description');
        }
    }, [description]);

    useEffect(() => {
        if(imgWatch && imgWatch.length) {
            const url = URL.createObjectURL(imgWatch[0]);
            setImgPreview(url);
        }
        else setImgPreview('');
    }, [imgWatch]);

    const { 
        fields: ingredientsArr, 
        append, 
        remove
     } = useFieldArray({
            control,
            name: 'ingredients'
        });

    const createMutation = useMutation(
        data => createPost({ data, user_id: currentUser.id, parent_id: null}), 
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                reset();
                setDescription(false);
            }
    });
    
    const onSubmit = (data) => {
        createMutation.mutate(data);
    }

    return(
        <form 
            autoComplete='off' 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row py-2 bg-inherit" 
            >
            <div className='min-w-fit mx-3'>
                <div className='w-12 h-12'>
                    <UserImg clickable={true} user={currentUser}/>
                </div>
            </div>
            <div>
                <div className='flex flex-col box-border py-2'>
                    <input 
                        {...register('title', { required: true })} 
                        placeholder='Que receita você está fazendo agora?'
                        className='placeholder:text-stone-400 
                                    text-lg bg-inherit text-white' 
                        />
                    {description && 
                        <div className='h-14 w-[90%] mt-2 grid 
                                        grid-flow-col grid-cols-6'>
                            <input 
                                className='col-span-5 rounded-l-md border pl-2
                                        border-stone-700 
                                        hover:border-stone-600
                                        focus:border-stone-600 
                                        placeholder:text-stone-500 bg-inherit'
                                {...register('description')} 
                                placeholder='Descrição' 
                                />
                            <input 
                                type='button'
                                onClick={() => setDescription(false)} 
                                value='-'
                                className='hover:cursor-pointer text-sm 
                                        bg-stone-700 border border-stone-700 
                                        active:border-stone-500 
                                        hover:bg-stone-600 transition-colors'
                                /> 
                        </div>
                    }
                    {ingredientsArr.length > 0 && 
                        ingredientsArr.map((ingredient, index) => (
                            <div 
                                key={ingredient.id} 
                                className='h-14 w-[90%] mt-2 
                                        grid grid-flow-col grid-cols-6'
                                >
                                <input 
                                    {...register(`ingredients.${index}.name`)} 
                                    placeholder='Nome do ingrediente'
                                    className='border-t border-l border-b 
                                                rounded-l-md border-stone-700
                                                 hover:border-stone-600 
                                                 focus:border-stone-600 pl-2
                                                  col-span-3 bg-inherit 
                                                  placeholder:text-stone-500' 
                                    />
                                <input 
                                    {...register(`ingredients.${index}.qt`)} 
                                    placeholder='Qtd'
                                    className='placeholder:text-stone-500 
                                            border-l border-t border-b 
                                            border-stone-700 bg-inherit 
                                            hover:border-stone-600 pl-2
                                            focus:border-stone-600' 
                                    />
                                <input 
                                    {...register(`ingredients.${index}.unity`)} 
                                    placeholder='Uni'
                                    className='placeholder:text-stone-500 
                                            border hover:border-stone-600 
                                            border-stone-700 pl-2 bg-inherit 
                                            focus:border-stone-600' 
                                    />
                                <input 
                                    type='button'
                                    onClick={() => remove(index)} 
                                    value='-'
                                    className='hover:cursor-pointer text-sm 
                                        bg-stone-700 border border-stone-700 
                                        active:border-stone-500 
                                        hover:bg-stone-600 transition-colors'
                                    /> 
                            </div>
                    ))}
                    {imgPreview && <div className='relative mt-5 mr-5'>
                        <img 
                            className='rounded-xl w-full' 
                            src={imgPreview} 
                            alt=''
                        />
                        <div className='absolute top-0 z-10 ml-1 mt-1'>
                            <RemoveButton 
                                onClick={() => reset({ post_img: '' })}
                                />
                        </div>
                    </div>
                    }
                </div>
                <div className="grid grid-flow-col mt-2 mr-1 
                                items-center justify-items-start">
                    <input 
                        type='button' 
                        value='Adicionar descrição' 
                        onClick={(e) => {
                            e.preventDefault(); 
                            setDescription(true)
                        }} 
                        className='text-stone-50 p-2 rounded-2xl text-sm
                                    hover:cursor-pointer transition-colors 
                                    hover:bg-stone-700 active:bg-stone-600'
                        />
                    <input 
                        type='button' 
                        value='Adicionar ingrediente'
                        onClick={(e) => {
                            e.preventDefault(); 
                            append({ name: '', qt: '', unity: '' })
                        }} 
                        className='transition-colors text-sm p-2 rounded-2xl
                                hover:bg-stone-700 hover:cursor-pointer
                                active:bg-stone-600 text-stone-50'
                        />
                    <label 
                        htmlFor='post_img' 
                        className='text-stone-50 p-2 rounded-2xl text-sm 
                                    transition-colors hover:bg-stone-700 
                                    active:bg-stone-600 hover:cursor-pointer'
                        >
                        Adicionar imagem
                    </label>
                    <input 
                        id='post_img' 
                        type='file' 
                        className='hidden' 
                        {...register('post_img')}
                        />
                    <PostButton isValid={isValid} type={'submit'}/>
                </div>
            </div>
        </form>
    )
}

export default WritePost;