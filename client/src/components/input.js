const Input = ({ placeholder, name, register, type, border=true }) => {
    return(
        <input 
            id={name}
            type={type === 'password' ? 'password' : 'text'}
            placeholder={placeholder ? placeholder : 'Digite aqui ...'}
            {...register(name)}
            className={`placeholder:text-stone-500 rounded-md bg-inherit h-14
                    text-white align-middle outline-none py-1 text-xl 
                    ${border && 'border px-3'} border-stone-700 w-full
                    transition-colors focus:placeholder:invisible 
                    focus:border-stone-500 hover:border-stone-600 
                    `}
            />
    )
}

export default Input;