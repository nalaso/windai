'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { Github, LoaderCircle } from 'lucide-react'

import { useAuthModal } from "@/hooks/useAuthModal";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "./ui"

const AuthModal = () => {
    const { isOpen, toggle } = useAuthModal();

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={toggle}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign in to V1</DialogTitle>
                        <DialogDescription>
                            Welcome back! Please sign in to continue
                        </DialogDescription>
                    </DialogHeader>
                    <div className="  py-4">
                        <SignIn.Root>
                            <Clerk.Loading>
                                {(isGlobalLoading: boolean) => (
                                    <SignIn.Step name="start">
                                        <Clerk.Connection name="github" asChild>
                                            <Button
                                                className='w-full py-6'
                                                variant="default"
                                                type="button"
                                                disabled={isGlobalLoading}
                                            >
                                                <Clerk.Loading scope="provider:github">
                                                    {(isLoading: boolean) =>
                                                        isLoading ? (
                                                            <LoaderCircle className="size-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <Github className="mr-2 size-4" />
                                                                GitHub
                                                            </>
                                                        )
                                                    }
                                                </Clerk.Loading>
                                            </Button>
                                        </Clerk.Connection>
                                    </SignIn.Step>
                                )}
                            </Clerk.Loading>
                        </SignIn.Root>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AuthModal