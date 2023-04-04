import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSWRConfig } from "swr"

const WritePost = ({ user }) => {
    const [imgPreview, setImgPreview] = useState(null);
    const { mutate } = useSWRConfig();

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
        mutate('api/post/', data);
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
                className="flex flex-col mr-4 gap-2" 
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
                                className='default-btn'
                                onClick={() => append(
                                    { name: '', qt: '', unity: '' })
                                }>
                                +
                            </button>
                            :
                            <button 
                                className='default-btn'
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
                    <div 
                        onClick={() => reset({image: ''})}
                        className='absolute top-0 z-10 ml-1 mt-1 remove-icon'
                        >
                        <XMarkIcon/>
                    </div>
                </div>}
                <div className='grid grid-cols-2'>
                    {!imgPreview && <label 
                        htmlFor='image' 
                        className='post-icon'
                        >
                        <PhotoIcon/>
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