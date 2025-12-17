'use client'

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {Fragment } from '@/generated/prisma/client'

import {ResizableHandle,ResizablePanel,ResizablePanelGroup} from '@/components/ui/resizable'
import { MessagesContainer } from "../components/messages-container";
import { Suspense } from "react";
import { ProjectHeader } from "../components/project-header";

interface Props {
    projectId: string;
}

 export const ProjectView=({projectId}:Props)=>{
    

    const trpc = useTRPC()
    const {data:project}=useSuspenseQuery(trpc.projects.getOne.queryOptions({
        id:projectId,
    }))

    
    return(
        <div className='h-screen'>
            <ResizablePanelGroup direction ='horizontal'>
                <ResizablePanel
                    defaultSize ={35}
                    minSize={20}
                    className='flex flex-col min-h-0'
                >
                 <Suspense fallback={<p>loading project..</p>}>
                 <ProjectHeader
                  projectId={projectId}
                />
                </Suspense>
                
                <Suspense fallback={<p>loading messages...</p>}>
                  <MessagesContainer 

                  projectId={projectId}
                  activeFragment={activeFragment}
                  setActiveFragment={setActiveFragment}
                  />
                </Suspense>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel
                     defaultSize ={65}
                     minSize={50}
                     className=""
                >
                  todo preview
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )

 }