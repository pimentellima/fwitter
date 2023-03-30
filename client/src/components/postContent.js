import { baseURL } from "../utils/urls";

const PostContent = (props) => {
    const {
        title,
        ingredients,
        description,
        file
    } = props;

    return (
        <div className="flex flex-col">
            <p className="text-xl my-1">{title}</p>
            {ingredients && ingredients.length > 0 && 
                <div className="flex flex-col">
                    <p className="font-medium mt-1">
                        {'Ingredientes: '}
                    </p>
                    {ingredients.map((ingredient, index) => (
                        <p key={index} className="inline">  {
                                ingredient.quantity + " " + 
                                ingredient.unity + " " + 
                                ingredient.name
                            }
                        </p>
                    ))}
                </div>
            }
            {description && 
                <div>
                    <p className="font-medium mt-2">
                        {'Descrição: '}
                    </p>
                    <p>{description}</p>
                </div>
            }
            {file && 
                <img 
                    className="rounded-xl max-h-[500px] mt-4" 
                    src={baseURL + '/upload/post/' + file} 
                    alt=''
                />
            }
        </div>
    )
}

export default PostContent;