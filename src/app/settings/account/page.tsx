"use client"
import { signOutGithub } from "@/actions/auth/sign-out"
import { Badge, Button } from "@/components/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const {data} = useSession()
  const user = data?.user
  const router = useRouter()

  const handleSignOut = async () => {
    await signOutGithub();
    router.push("/")
 }

  if (!user) {
    return <div>Please sign in to view your account details.</div>
  }

  return (
    <div className="space-y-6">
        <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
          <CardDescription>View and manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.imageUrl || ""} alt={user.name || "User"} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <Label className="font-bold">Name</Label>
              <Badge variant={"outline"} className="m-1">{user.name}</Badge>
            </div>
            <div>
              <Label className="font-bold">Email</Label>
              <Badge variant={"outline"} className="m-1">{user.email}</Badge>
            </div>
            <div>
              <Label className="font-bold">Username</Label>
              <Badge variant={"outline"} className="m-1">@{user.username}</Badge>
            </div>
            <div>
              <Label className="font-bold">ID</Label>
              <Badge variant={"outline"} className="m-1">@{user.id}</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t border-gray-200 pt-6">
        <Button onClick={()=>handleSignOut()} variant="outline" className="text-red-600">
            Signout
        </Button>
        </CardFooter>
      </Card>
    </div>
  )
}