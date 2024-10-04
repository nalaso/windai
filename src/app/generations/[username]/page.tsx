"use client";
import { getUIProfile, getUIs } from '@/actions/ui/get-uis';
import Header from '@/components/header';
import PromptBadge from '@/components/prompt-badge';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, CardContent, CardFooter, Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { timeAgo } from '@/lib/time';
import { Eye, Heart, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarDays, User, LayoutGrid, MessageSquare } from "lucide-react"
import { getUser } from '@/actions/user';
import { toast } from 'sonner';

interface User {
    id: string;
    name: string | null;
    username: string;
    createdAt: Date;
    imageUrl: string | null;
    uiCount: number;
    subPromptCount: number;
}

interface UI {
    id: string;
    userId: string;
    prompt: string;
    img: string;
    createdAt: Date;
    likesCount: number;
    viewCount: number;
    forkedFrom: string | null;
    user: {
        username: string;
        imageUrl: string | null;
    }
}

export default function MinimalistProfilePage({ params }: { params: { username: string } }) {
    const [mode, setMode] = useState<string>("ownUI");
    const [uis, setUis] = useState<UI[]>([]);
    const [start, setStart] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false)
    const [maxReached, setMaxReached] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const limit = 9;
    const router = useRouter();
    const { username } = params;

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true)
            const userObj = await getUser(username);
            if (!userObj) {
                toast.warning("User not found")
            }
            setUser(userObj);
        };
        fetchUser();
    }, [])

    useEffect(() => {
        if (!user) return

        const fetchUIs = async () => {
            setIsLoading(true)
            const fetchedUIs = await getUIProfile(user?.id, start, limit, mode);
            if (fetchedUIs.length === 0) {
                setMaxReached(true)
            }
            if (start === 0) {
                setUis(fetchedUIs);
            } else {
                setUis((prevUis) => [...prevUis, ...fetchedUIs]);
            }
            setIsLoading(false)
        };

        fetchUIs();
    }, [mode, start, user]);

    const handleTabChange = (value: string) => {
        setMaxReached(false)
        setUis([])
        setMode(value);
        setStart(0);
    };

    const handleLoadMore = () => {
        if (!maxReached) {
            setStart((prevStart) => prevStart + limit);
        }
    };

    useEffect(() => {
        if (isLoading) return
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            if (bottom && !isLoading) {
                handleLoadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    return (
        <div>
            <Header />
            <div className="flex items-start justify-center bg-gray-50 p-4 pt-10">
                <Card className="w-full max-w-2xl bg-white shadow-lg">
                    <CardContent className="p-8">
                        <div className="flex flex-col space-y-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
                                <Avatar onClick={()=>router.push(`/generations/${user?.username}`)} className="h-32 w-32 border-2 border-gray-200">
                                    <AvatarImage src={user?.imageUrl || ""} alt={"A"} />
                                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col space-y-3 text-center sm:text-left">
                                    <h2 className="text-3xl font-semibold text-gray-800">{user?.name}</h2>
                                    <p className="text-lg text-gray-600 flex items-center justify-center sm:justify-start">
                                        <User className="mr-2 h-5 w-5" />
                                        @{user?.username}
                                    </p>
                                    <p className="text-base text-gray-500 flex items-center justify-center sm:justify-start">
                                        <CalendarDays className="mr-2 h-5 w-5" />
                                        Joined {user?.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    <div className='border-t border-gray-200 pt-8'>
                                        <ul className="space-y-6">
                                            <li className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-xl font-medium text-gray-700">UI Generated</span>
                                                </div>
                                                <span className="text-3xl font-semibold text-gray-800">{user?.uiCount}</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-xl font-medium text-gray-700">Subprompts</span>
                                                </div>
                                                <span className="text-3xl font-semibold text-gray-800">{user?.subPromptCount}</span>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="max-w-7xl mx-auto pt-5">
                <Tabs defaultValue={mode} className="w-full mb-4" onValueChange={handleTabChange}>
                    <div className='flex justify-between py-2 '>
                        <TabsList className="bg-gray-300 rounded-lg shadow-sm p-2 px-1 h-10">
                            <TabsTrigger value="ownUI" className="px-4 py-2 text-sm font-medium">User UIs</TabsTrigger>
                            <TabsTrigger value="likedUI" className="px-4 py-2 text-sm font-medium">Liked UIs</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value={mode}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {uis && uis.map((ui) => (
                                <Card key={ui.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div onClick={() => router.push(`/ui/${ui.id}`)} className="relative cursor-pointer">
                                        <img src={ui.img} alt={ui.prompt} className="w-full h-48 object-cover" />
                                    </div>
                                    <CardContent className="p-2 flex items-center">
                                        <div className="flex items-start flex-grow min-w-0 relative">
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Avatar onClick={()=>router.push(`/generations/${ui?.user?.username}`)} className="border-2 border-primary h-5 w-5">
                                                        <AvatarImage src={ui.user.imageUrl ?? ""} />
                                                        <AvatarFallback>{ui.user.username.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{ui.user.username}</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger className='rounded-full font-semibold ml-2 flex-1 text-ellipsis overflow-hidden whitespace-nowrap'>
                                                    <PromptBadge
                                                        variant={"secondary"}
                                                        className="rounded-full font-semibold flex text-ellipsis overflow-hidden whitespace-nowrap"
                                                        prompt={ui.prompt}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{ui.prompt}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <div className="flex items-center whitespace-nowrap ml-2 flex-shrink-0">
                                            <Badge
                                                variant={"secondary"}
                                                className="flex items-center rounded-s-full font-semibold px-2"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                <p className="text-xs text-gray-600">{ui.viewCount}</p>
                                            </Badge>
                                            <Badge
                                                variant={"secondary"}
                                                className="flex items-center rounded-e-full font-semibold px-2"
                                            >
                                                <Heart className="h-4 w-4 mr-1" />
                                                <p className="text-xs text-gray-600">{ui.likesCount}</p>
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-gray-600 whitespace-nowrap ml-2 flex-shrink-0">
                                            {timeAgo(ui.createdAt)}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                            {
                                isLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                    <Card key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                                        <div className="relative">
                                            <div className="w-full h-48 bg-gray-200" />
                                        </div>
                                        <CardContent className="p-2 flex items-center">
                                            <div className="flex items-center flex-grow min-w-0 relative">
                                                <div className="w-5 h-5 bg-gray-200 rounded-full" />
                                                <div className="w-20 h-5 bg-gray-200 rounded-full ml-2" />
                                            </div>
                                            <div className="w-16 h-5 bg-gray-200 rounded-full" />
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                    </TabsContent>
                </Tabs>
            </div >
        </div>
    )
}