import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form'

const FweetForm = ({ sendData }) => {
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
        title: '',
        file: [],
        description: '',
        ingredients: []
    });    

    const onSubmit = async (data) => {
        sendData(data);
        reset();
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
        <form autoComplete='off' className="col-span-9 flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col pl-3 box-border pb-3 border-b border-stone-700'>
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
            <div className="grid grid-flow-col mt-2 mx-2 items-center justify-items-start">
                <button onClick={(e) => {e.preventDefault(); setDescription(true)}} className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600'>Adicionar descrição</button>
                <button onClick={(e) => {e.preventDefault(); append({ name: '', quantity: '', unity: '' })}} className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600'>Adicionar ingrediente</button>
                <label htmlFor='file' className='text-stone-50 p-2 rounded-2xl transition-colors text-sm hover:bg-stone-700 active:bg-stone-600 hover:cursor-pointer'>Adicionar imagem</label>
                <input id='file' type='file' {...register('file')} className='hidden'/>
                <input type='submit' value='Fweet' className={`${isValid ? 'hover:cursor-pointer hover:bg-stone-600' : 'opacity-50 '} justify-self-end py-1 px-5 text-lg transition ease-out duration-100 font-bold rounded-3xl bg-stone-500 `}/>
            </div>
        </form>
    )
}

export default FweetForm;