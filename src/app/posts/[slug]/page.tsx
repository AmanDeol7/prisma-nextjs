import {prisma} from "../../../lib/db"
const page = async({params}) => {
    const post = await prisma.post.findUnique({
        where: { 
            slug: (params.slug)
        }
    })
  return (
    <>
    <h1 className="text-2xl font-bold justify-center items-center text-center"> {post?.title} </h1>
    <p className="texl-lg text-center mt-5">{post?.content}</p>

    </>
  )
}

export default page