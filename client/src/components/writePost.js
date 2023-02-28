import { useState, useEffect, useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/authContext';
import moment from 'moment';
import axios from 'axios';
import { DateTime } from 'luxon';

const WritePost = ({ fetchData }) => {
    const { user } = useContext(AuthContext);

    const { 
        register, 
        unregister, 
        handleSubmit, 
        reset,
        control,
        setFocus,
        formState: { isValid }
    } = useForm();    

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post('//localhost:5000/upload/post', formData);
            return res.data;
        } 
        catch(err) {
            console.error(err);
        }
    }

    const onSubmit = async (data) => {
        const { id: user_id, name: user_name, username: user_username } = user;
        const { title, description, ingredients, file } = data;
        const fileUrl = file[0] ? await upload(file[0]) : '';

        try {
            await axios.post('//localhost:5000/posts', {
                user_id, 
                user_name,
                user_username,
                title,
                description,
                ingredients: JSON.stringify(ingredients),
                date: moment().format("YYYY-MM-DD HH:mm:ss"),
                file: fileUrl
            })
        }
        catch (err) {
            console.log(err);
        };
        reset();
        fetchData();
    }

    const { 
        fields: ingredientFieldsArray, 
        append, 
        remove
     } = useFieldArray({
            control,
            name: 'ingredients'
        });

    const [description, setDescription] = useState(false)

    useEffect(() => {
        if(!description) {
            unregister('description');
        }
        else {
            setFocus('description');
        }
    }, [description])    

    return(
        <form autoComplete='off' className="grid grid-flow-col grid-cols-10 py-2 pl-4 border-b border-stone-700 bg-inherit" onSubmit={handleSubmit(onSubmit)}>
            <img className='w-12 rounded-[40px]' src={`http://localhost:5000/upload/user/${user.img ? user.img : 'default.jpg'}`}/>
            <div className='col-span-9'>
                <div className='flex flex-col pl-3 box-border'>
                    <input {...register('title', { required: true })} className='py-2 placeholder:text-stone-400 text-lg bg-inherit text-white' placeholder='Qual receita você está fazendo agora?'/>
                    {description && 
                        <div className='h-14 w-[90%] mt-2 grid grid-flow-col grid-cols-6'>
                            <input id='description' {...register('description')} placeholder='Descrição' className='col-span-5 rounded-l-md border border-stone-700 hover:border-stone-600 focus:border-stone-600 pl-2 bg-inherit placeholder:text-stone-500'/>
                            <button onClick={() => setDescription(false)} className='text-sm bg-stone-700 border border-stone-700 active:border-stone-500 hover:bg-stone-600 transition-colors'>-</button> 
                        </div>
                    }
                    {ingredientFieldsArray.length > 0 && ingredientFieldsArray.map((field, index) => (
                        <div key={field.id} className='h-14 w-[90%] mt-2 grid grid-flow-col grid-cols-6'>
                            <input {...register(`ingredients.${index}.name`)} className='rounded-l-md border-t border-l border-b border-stone-700 hover:border-stone-600 focus:border-stone-600 pl-2 col-span-3 bg-inherit placeholder:text-stone-500 ' placeholder='Nome do ingrediente'/>
                            <input {...register(`ingredients.${index}.quantity`)} className='pl-2 bg-inherit placeholder:text-stone-500 border-l border-t border-b border-stone-700 hover:border-stone-600 focus:border-stone-600' placeholder='Qtd'/>
                            <input {...register(`ingredients.${index}.unity`)} className='pl-2 bg-inherit placeholder:text-stone-500 border border-stone-700 hover:border-stone-600 focus:border-stone-600' placeholder='Uni'/>
                            <button onClick={() => remove(index)} className='text-sm bg-stone-700 border border-stone-700 active:border-stone-500 hover:bg-stone-600 transition-colors'>-</button> 
                        </div>
                    ))}
                </div>
                <div className="grid grid-flow-col mt-2 ml-2 mr-2 items-center justify-items-start">
                    <button onClick={(e) => {e.preventDefault(); setDescription(true)}} className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600'>Adicionar descrição</button>
                    <button onClick={(e) => {e.preventDefault(); append({ name: '', quantity: '', unity: '' })}} className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600'>Adicionar ingrediente</button>
                    <label htmlFor='file' className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600 hover:cursor-pointer'>Adicionar imagem</label>
                    <input id='file' type='file' {...register('file')} className='hidden'/>
                    <input type='submit' value='Fweet' className={`${isValid ? 'submit-button' : 'submit-button-invalid'} justify-self-end`}/>
                </div>
            </div>
        </form>
    )
}

export default WritePost;