import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AuthContext } from "../contexts/authContext";
import { PostsContext } from "../contexts/postsContext";

const Write = () => {
    const { currentUser } = useContext(AuthContext);
    const { setPosts } = useContext(PostsContext);

    const { 
        register, 
        unregister, 
        handleSubmit, 
        reset,
        control,
        setFocus,
        formState: { isValid }
    } = useForm();    

    const { 
        fields: ingredientsArray, 
        append, 
        remove
     } = useFieldArray({
            control,
            name: 'ingredients'
        });
    
    const uploadPostImg = async (file) => {
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
        const { title, description, ingredients, file } = data;
        const fileUrl = file[0] ? await uploadPostImg(file[0]) : '';
        const postObj = {
            user_id: currentUser.id, 
            title,
            description,
            ingredients,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            file: fileUrl
        }
        axios.post('//localhost:5000/posts', 
        {...postObj, 
            ingredients: JSON.stringify(ingredients)})
        .then(setPosts(prev => {
            const posts = [...prev];
            posts.unshift(postObj);
            return posts;
        }));
        reset();
        setDescription(false);
    }
    
    const [description, setDescription] = useState(false);
    
    useEffect(() => {
        if(!description) {
            unregister('description');
        }
        else {
            setFocus('description');
        }
    }, [description])    

    return(
        <form 
            autoComplete='off' 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row py-2 border-b border-stone-700 bg-inherit" 
            >
            <div className='min-w-fit mx-3'>
                <img src={`http://localhost:5000/upload/user/${currentUser.profile_img}`} alt='' className='w-12 h-12 rounded-[40px]'/>
            </div>
            <div>
                <div className='flex flex-col box-border py-2'>
                    <input 
                        {...register('title', { required: true })} 
                        placeholder='Qual receita você está fazendo agora?'
                        className=' placeholder:text-stone-400 text-lg bg-inherit text-white' 
                        />
                    {description && 
                        <div className='h-14 w-[90%] mt-2 grid grid-flow-col grid-cols-6'>
                            <input 
                                {...register('description')} 
                                placeholder='Descrição' 
                                className='col-span-5 rounded-l-md border border-stone-700 hover:border-stone-600 focus:border-stone-600 pl-2 bg-inherit placeholder:text-stone-500'
                                />
                            <input 
                                type='button'
                                onClick={() => setDescription(false)} 
                                value='-'
                                className='hover:cursor-pointer text-sm bg-stone-700 border border-stone-700 active:border-stone-500 hover:bg-stone-600 transition-colors'
                                /> 
                        </div>
                    }
                    {ingredientsArray.length > 0 && ingredientsArray.map((ingredient, index) => (
                        <div key={ingredient.id} className='h-14 w-[90%] mt-2 grid grid-flow-col grid-cols-6'>
                            <input 
                                {...register(`ingredients.${index}.name`)} 
                                placeholder='Nome do ingrediente'
                                className='rounded-l-md border-t border-l border-b border-stone-700 hover:border-stone-600 focus:border-stone-600 pl-2 col-span-3 bg-inherit placeholder:text-stone-500' 
                                />
                            <input 
                                {...register(`ingredients.${index}.quantity`)} 
                                placeholder='Qtd'
                                className='pl-2 bg-inherit placeholder:text-stone-500 border-l border-t border-b border-stone-700 hover:border-stone-600 focus:border-stone-600' 
                                />
                            <input 
                                {...register(`ingredients.${index}.unity`)} 
                                placeholder='Uni'
                                className='pl-2 bg-inherit placeholder:text-stone-500 border border-stone-700 hover:border-stone-600 focus:border-stone-600' 
                                />
                            <input 
                                type='button'
                                onClick={() => remove(index)} 
                                value='-'
                                className='hover:cursor-pointer text-sm bg-stone-700 border border-stone-700 active:border-stone-500 hover:bg-stone-600 transition-colors'
                                /> 
                        </div>
                    ))}
                </div>
                <div className="grid grid-flow-col mt-2 mr-1 items-center justify-items-start">
                    <input 
                        type='button' 
                        value='Adicionar descrição' 
                        onClick={(e) => {e.preventDefault(); setDescription(true)}} 
                        className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600 hover:cursor-pointer'
                        />
                    <input 
                        type='button' 
                        value='Adicionar ingrediente'
                        onClick={(e) => {e.preventDefault(); append({ name: '', quantity: '', unity: '' })}} 
                        className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600 hover:cursor-pointer'
                        />
                    <label 
                        htmlFor='file' 
                        className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600 hover:cursor-pointer'
                        >
                        Adicionar imagem
                    </label>
                    <input id='file' type='file' {...register('file')} className='hidden'/>
                    <input 
                        type='submit' 
                        value='Fweet' 
                        className={`${isValid ? 'hover:cursor-pointer hover:bg-stone-600' : 'opacity-50'} justify-self-end  h-10 w-full py-1 px-5 text-lg transition ease-out duration-100 font-bold rounded-3xl bg-stone-500 `}
                        />
                </div>
            </div>
        </form>
    )
}

export default Write;