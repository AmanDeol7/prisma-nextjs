import Link from 'next/link';
import {prisma} from '../../lib/db'

const page = async() => {
    const user = await prisma.user.findUnique({
      where: {
        email:"aman@gmail.com"
      },
      include:{
        posts:true
      }
    
    });

    return (
      <div className="p-4 flex flex-col gap-y-4">
        <h2>Home</h2>
  
        <ul className="flex flex-col gap-y-2">
          {user?.posts.map((post) => (
            <li key={post.id}><Link href={`/posts/${post.slug}`}>{post.content}</Link></li>
          ))}
        </ul>
        </div>
    )

}

export default page