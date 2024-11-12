import { Prisma,PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: "Post 1",
        content: "This is the content of post 1",
        slug: "post-1",
        author: {
            connectOrCreate: {
                where:  {
                    email:"aman@gmail.com"
                },
                create: {
                    email:"aman@gmail.com",
                    hashedPassword:"fdssfsdfsdf",

                }
            }
        }
        


    }
]
async function main() {
    console.log(`Start seeding ...`)
    for (const p of initialPosts) {
        const post = await prisma.post.create({
            data: p,
        })
        console.log(`Created post with id: ${post.id}`)
    }
    console.log(`Seeding finished.`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })