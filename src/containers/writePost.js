import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import RemoveIcon from '../assets/remove.svg';
import { useCreatePostMutation } from '../server/api/create-post';

const WritePost = () => {
    const [imgPreview, setImgPreview] = useState(null);
    const createPostMutation = useCreatePostMutation();
    const { user } = useUser();

    const { 
        register, 
        handleSubmit, 
        reset,
        control,
        watch,
        formState: { isValid }
    } = useForm({
        defaultValues: {
            title: '',
            ingredients: [{ name: '', qt: '', unity: '' }],
            image: '',
        }
    });  

    const { 
        fields: ingredients, 
        append, 
        remove
     } = useFieldArray({
            control,
            name: 'ingredients'
        });

    const imgWatch = watch('image');

    useEffect(() => {
        if(imgWatch && imgWatch.length) {
            const url = URL.createObjectURL(imgWatch[0]);
            setImgPreview(url);
        }
        else setImgPreview('');
    }, [imgWatch]);

    const onSubmit = (data) => {
        const { ingredients, ...other } = data;
        createPostMutation.mutate({
            ...other,
            ingredients: JSON.stringify(ingredients)
        });
    }

    return(
        <div className='flex flex-row py-3 border-b border-stone-700'>
            <img 
                className='user-img hover:cursor-pointer'
                src={user?.profileImageUrl} 
                alt='profileImage'
                />
            <form 
                autoComplete='off' 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mr-6 gap-1" 
                >
                <input 
                    {...register('title', { required: true })} 
                    placeholder='Que receita você está fazendo agora?'
                    className='text-lg mb-4 text-white' 
                    />
                {ingredients.map((ingredient, index) => (
                    <div 
                        key={ingredient.id} 
                        className='h-14 grid grid-flow-col grid-cols-6'
                        >
                        <input 
                            {...register(`ingredients.${index}.name`)} 
                            placeholder='Nome do ingrediente'
                            className='border-stone col-span-3'
                            />
                        <input 
                            {...register(`ingredients.${index}.qt`)} 
                            placeholder='Qtd'
                            className='border-stone' 
                            />
                        <input 
                            {...register(`ingredients.${index}.unity`)} 
                            placeholder='Uni'
                            className='border-stone' 
                            />
                        {index === 0 ?
                            <button 
                                className='square-btn'
                                onClick={() => append(
                                    { name: '', qt: '', unity: '' })
                                }>
                                +
                            </button>
                            :
                            <button 
                                className='square-btn'
                                onClick={() => remove(index)}>
                                -
                            </button>
                        }
                    </div>
                ))}
                {imgPreview && <div className='relative mt-3 mr-5'>
                    <img 
                        className='rounded-xl w-full' 
                        src={imgPreview} 
                        alt=''
                    />
                    <img 
                        className='absolute top-0 z-10 ml-1 mt-1 remove-icon'
                        onClick={() => reset({image: ''})}
                        src={RemoveIcon}
                        alt=''
                        />
                </div>}
                <div className='mt-2 grid grid-cols-2'>
                    {!imgPreview && <label 
                        htmlFor='image' 
                        className='p-2 rounded-2xl text-sm justify-self-start
                            transition-colors hover:bg-stone-700 
                            active:bg-stone-600 hover:cursor-pointer'
                        >
                        Adicionar imagem
                    </label>}
                    <input 
                        id='image' 
                        type='file' 
                        className='hidden' 
                        {...register('image')}
                        />
                    <button className={`fweet-btn w-28 col-start-2 justify-self-end
                        ${isValid ? 'btn-valid' : 'btn-invalid'}`}>
                            Fweet
                    </button>
                </div>
            </form>
        </div>
    )
}

export default WritePost;