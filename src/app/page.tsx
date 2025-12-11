"use client"
 import {useState} from 'react'
//  import {Suspense} from 'react'
 import { Button } from '@/components/ui/button'  
 import { Input } from '@/components/ui/input' 

 import {toast} from 'sonner' 


import {useTRPC} from "@/trpc/client"
import {useMutation, useQuery} from "@tanstack/react-query"

 
 const Page =  () => {
    const [value,setValue]=useState("")

  const trpc=useTRPC()
  const {data:messages} =useQuery(trpc.messages.getMany.queryOptions());
  const createMessage =useMutation(trpc.messages.create.mutationOptions({
    onSuccess:()=>{
      toast.success("Message created")
    }

  })) 

   return (
 
    <div>
      <Input  value={value} onChange={(e)=> setValue(e.target.value)}/>
      <Button disabled={createMessage.isPending} onClick={()=> createMessage.mutate({value:value})}>invoke</Button>
      {JSON.stringify({messages,null:2})}
      </div>
   )
 }
 
 export default Page;
 