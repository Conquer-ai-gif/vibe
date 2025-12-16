import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import { useState } from 'react';
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {TextareaAutosize } from 'react-textarea-autosize'
import { ArrowUpIcon,Loader2Icon } from 'lucide-react';
import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query'

import {cn} from '@/lib/utils'
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import {Form,FormField} from '@/components/ui/form'

interface Props {
    projectId: string;
}

const formSchema =z.object({
      value:z.string()
        .min(1,{message:'Value is required'})
        .max(10000,{message:'Value is too long'}),
})

export const MessageForm=({projectId}:Props)=>{
    const [isFocused,setIsFocused] = useState(false);
    const showUsage=false

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            value:"",
        },
    });

    const onSubmit = (value:z.infer<typeof formSchema>)=>{
        console.log(values)
    }

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(   
                    "relative border p-4 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
                    isFocused && "shadow-xs",
                    showUsage && "rpunded-t-none",
                )}
            >
                <FormField 
                    control={form.control}
                    name="value"
                    render={({field})=>(
                        <TextareaAutoSize 
                            {...field}
                            onFocus={()=> setIsFocused(true)}
                            onBlur={()=> setIsFocused(false)}
                            minRows={2}
                            maxRows={8}
                            className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                            placeholder='what will you like to build'
                            onKeyDown={(e)=>{
                                if(e.key ==="Enter"  && (e.ctrlKey || e.metakey)) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)(e);
                                }
                            }}
                        />
                    )}
                />
                <div className="flex gap-x-2items-end justify-between pt-2">
                    <div className="text-[10px] text-muted-foreground font-mono">

                    </div>
                </div>
            </form>
        </Form >
    )
}