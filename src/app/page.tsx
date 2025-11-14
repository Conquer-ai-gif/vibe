 import React  from 'react'
 import {Suspense} from 'react'
 import { Button } from '@/components/ui/button'

 import {trpc,getQueryClient} from '@/trpc/server'
 import { dehydrate,HydrationBoundary } from '@tanstack/react-query'

import {Client} from './client'
 
 const Page = async () => {

  const queryClient = getQueryClient();
   void queryClient.prefetchQuery(trpc.createAI.queryOptions({text:"hello world"}))

   return (
     <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading...</p>}>
            <Client/>
            <Button>click me </Button>   
        </Suspense>
     </HydrationBoundary>
   )
 }
 
 export default Page;
 