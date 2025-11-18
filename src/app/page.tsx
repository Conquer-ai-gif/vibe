"use client"
//  import React  from 'react'
//  import {Suspense} from 'react'
 import { Button } from '@/components/ui/button'

import {useTRPC} from "@/trpc/client"
import {useMutation} from "@tanstack/react-query"

 
 const Page =  () => {
  const trpc=useTRPC()
  const invoke =useMutation(trpc.invoke.mutationOption({
    onSuccess:()=>{
      taost.success("background job")
    }

  }))

   return (
 
    <div>
      <Button disabled={invoke.isPending} onClick={()=> invoke.mutate({text:"john"})}>invoke</Button>
      test
      </div>
   )
 }
 
 export default Page;
 