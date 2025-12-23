import LInk from 'next/link'
import {formatDuration,intervalToDuration} from 'data-fns'

import { Button } from '@/components/ui/button';
import {useAuth}

interface Props {
    points: number;
    msBeforeNext:number
}

export const Usage=({points,msBeforeNext}:Props)=>{
    const {has}=useAuth();
    const hasProAccess =has?.({plan "pro"})
    return (
        <div className='rounded-t-xl bg-background border border-b-0 p-2.5'>
            <div className='flex items-center gap-x-2'>
                <div>
                    <p className='text-sm'>
                        {points} {hasProAccess ? "" : "free" }credits remaining
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        Resets in{" "}
                        {formatDuration(
                            intervalToDuration({
                                start: new Date(),
                                end: new Date(Date.now() + msBeforeNext)
                            }),
                            {format: ['months','days','hours']}
                        )}
                    </p>
                </div>
                {!hasProAccess &&(

                    <Button
                            aschild
                            size='sm'
                            variant='tertiary'
                            className='ml-auto'
                    >
                            <Link hrefd='/pricing'>
                                <CrownIcon/> Upgrade
                            </LInk>
                    </Button>
                )}
            </div>
        </div>
    )
}