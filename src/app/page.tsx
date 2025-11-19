"use client"
 import {useState} from 'react'
//  import {Suspense} from 'react'
 import { Button } from '@/components/ui/button'  
 import { Input } from '@/components/ui/input'  


import {useTRPC} from "@/trpc/client"
import {useMutation} from "@tanstack/react-query"

 
 const Page =  () => {
    const [value,setValue]=useState("")

  const trpc=useTRPC()
  const invoke =useMutation(trpc.invoke.mutationOptions({
    onSuccess:()=>{
      // taost.success("background job")
    }

  })) 

   return (
 
    <div>
      <Input  value={value} onChange={(e)=> setValue(e.target.value)}/>
      <Button disabled={invoke.isPending} onClick={()=> invoke.mutate({value:value})}>invoke</Button>
      test 
      </div>
   )
 }
 
 export default Page;
 