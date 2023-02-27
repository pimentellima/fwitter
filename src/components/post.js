const Post = ({ post }) => {
    const postObj = JSON.parse(post.data)

    return (
        <div className="grid grid-flow-row grid-cols-10 py-2 pl-4 border-b border-stone-700" key={post.id}>
            <div className="col-span-1">img</div>
                <div className="col-span-9 flex flex-col">
                    <div className="flex max-w-full gap-2 items-center">
                        <p className="font-bold">{post.user_name}</p>
                        <div className="flex flex-row text-sm text-stone-400 gap-1">
                            <p >{post.user_username}</p>
                            <p >{"· " + post.date}</p>
                        </div>
                    </div>
                    <h1 className="mt-1">{postObj.user_name}</h1>
                    <p>{postObj.title}</p>
                    {postObj.ingredients && postObj.ingredients.length > 0 && 
                        <div>
                            <p className="font-medium mt-1">{'Ingredientes: '}</p>
                            {postObj.ingredients.map((ingredient, index) => (
                                <p key={index} className="inline">{ingredient.quantity + " " + ingredient.unity + " " + ingredient.name}</p>
                            ))}
                        </div>
                    }
                    {postObj.description && 
                        <div>
                            <p className="font-medium mt-2">{'Descrição: '}</p>
                            <p>{postObj.description}</p>
                        </div>
                    }
            </div>
        </div>
    )
}

export default Post;