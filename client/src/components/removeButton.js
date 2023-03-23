import RemoveIcon from '../assets/remove.svg'

const RemoveButton = ({ onClick }) => {
    return (
        <img 
            className='rounded-full bg-opacity-60
                hover:cursor-pointer hover:bg-opacity-40 bg-black
                transition ease-in duration-150 p-2 h-9 w-9'
            onClick={onClick}
            src={RemoveIcon}
            alt=''
            />
    )
}

export default RemoveButton;