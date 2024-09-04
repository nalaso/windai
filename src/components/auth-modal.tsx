'use client'
import { Github, LoaderCircle } from 'lucide-react'
import { useAuthModal } from "@/hooks/useAuthModal";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "./ui"
import { useState } from 'react';
import { signInGithub } from '@/actions/auth/sign-in';

const AuthModal = () => {
    const { isOpen, toggle } = useAuthModal();
    const [loading, setLoading] = useState(false)

    const handleSignIn = async () => {
        setLoading(true)
        await signInGithub()
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={toggle}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign in to WindAI</DialogTitle>
                        <DialogDescription>
                            Welcome back! Please sign in to continue
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                            <Button
                                className='w-full py-6'
                                variant="default"
                                type="submit"
                                onClick={()=>handleSignIn()}
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoaderCircle className="size-4 animate-spin" />
                                ) : (
                                    <>
                                        <Github className="mr-2 size-4" />
                                        GitHub
                                    </>
                                )}
                            </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AuthModal