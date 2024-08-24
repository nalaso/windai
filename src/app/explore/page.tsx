"use client"
import Header from '@/components/header'
import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'

const page = () => {
    const [mode, setMode] = useState("latest")
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto pt-5">
                <h1 className='text-3xl font-bold'>
                    Explore
                </h1>
                <Tabs defaultValue="latest" className="w-full mb-8 mt-5">
                    <TabsList className="bg-white rounded-lg shadow-sm p-1">
                        <TabsTrigger value="latest" className="px-4 py-2 text-sm font-medium">Latest</TabsTrigger>
                        <TabsTrigger value="most-viewed" className="px-4 py-2 text-sm font-medium">Most Viewed</TabsTrigger>
                        <TabsTrigger value="most-liked" className="px-4 py-2 text-sm font-medium">Most Liked</TabsTrigger>
                    </TabsList>
                    <TabsContent value="latest">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Card key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="relative">
                                        <img src={`https://picsum.photos/seed/${item}/400/200`} alt="Card image" className="w-full h-48 object-cover" />
                                        <Avatar className="absolute -bottom-4 right-4 border-2 border-primary">
                                            <AvatarImage src={`https://i.pravatar.cc/40?img=${item}`} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mt-2">Creator Name</h3>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="most-viewed">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Similar card structure as above, but with different content */}
                        </div>
                    </TabsContent>
                    <TabsContent value="most-liked">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Similar card structure as above, but with different content */}
                        </div>
                    </TabsContent>
                </Tabs>
                <div className="flex justify-center mt-8">
                    <Button variant="outline" className="bg-primary text-white hover:bg-primary-dark transition-colors">
                        <div className="flex items-center gap-2">
                            <RefreshCcw />
                            <span>Load More</span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page