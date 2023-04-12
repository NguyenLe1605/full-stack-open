import Input from "./Input"
const BlogForm = (props) => {
    const {onSubmit, blog, setBlog} = props
    const {setTitle, setAuthor, setUrl} = setBlog
    return (
        <form onSubmit={onSubmit}>
            <Input 
                type="text"
                value={blog.title}
                name="title"
                setState={setTitle}
            />

            <Input 
                type="text"
                value={blog.author}
                name="author"
                setState={setAuthor}
            />

            <Input 
                type="text"
                value={blog.url}
                name="url"
                setState={setUrl}
            />
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm