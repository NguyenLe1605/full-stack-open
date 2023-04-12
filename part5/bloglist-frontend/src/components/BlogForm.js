import Input from "./Input"
const BlogForm = (props) => {
    const {onSubmit, blog, setBlog} = props
    const {setTitle, setAuthor, setUrl} = blog
    return (
        <form onSubmit={onSubmit}>
            <Input 
                type="text"
                value={blog.title}
                name="title"
                setState
            />
        </form>
    )
}

export default BlogForm