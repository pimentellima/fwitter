const Input = ({ placeholder, name, register, type, border = true }) => {
    return(
        <input 
            id={name}
            type={type === 'password' ? 'password' : 'text'}
            placeholder={placeholder ? placeholder : 'Digite aqui ...'}
            {...register(name)}
            className={`placeholder:text-stone-500 rounded-md bg-inherit h-14
                        text-gray-300 align-middle outline-none py-1 pl-2 
                        ${border && 'border'} border-stone-700 w-full
                        transition-colors focus:placeholder:invisible 
                        focus:border-stone-500 hover:border-stone-600 
                        `}
            />
    )
}

export default Input;