const Input = ({ placeholder, name, register, border = true }) => {
    return(
        <input 
            id={name}
            placeholder={placeholder ? placeholder : 'Digite aqui ...'}
            className={`placeholder:text-stone-500 rounded-md text-gray-300 align-middle outline-none h-14 bg-inherit ${border && 'border'} border-stone-700 py-1 pl-2 focus:placeholder:invisible focus:border-stone-500 hover:border-stone-600 transition-colors`}
            {...register(name)}
            />
    )
}

export default Input;