"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import { createPost } from "@/actions/actions"
const formSchema = z.object({
  title: z.string(),
  content: z.string()
});


export default function MyForm() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  async function onSubmit({formData} : {formData: FormData}) {
    try {
        await createPost(formData)
        console.log("Post created")
        toast.success("Post created successfully")
    }
    catch (error) {
        toast.error("Error creating post")
  }
  }
  return (
    <Form {...form}>
      <form action={createPost} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                placeholder="Enter Title"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Title of Post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input 
                placeholder="Enter Description"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is Description of Post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}