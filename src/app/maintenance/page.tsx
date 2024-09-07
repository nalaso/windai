import { Bot } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MAINTENANCE() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Bot className="w-12 h-12 mx-auto mb-4 text-primary" />
          <CardTitle className="text-2xl font-bold">WindAI System Upgrade</CardTitle>
          <CardDescription>We&apos;re enhancing our AI capabilities to serve you better.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Estimated Completion</h3>
          <p className="text-4xl font-bold text-primary mb-4">2 Hours</p>
          <p className="text-muted-foreground">
            Our team is working diligently to bring you an improved AI experience.
          </p>
        </CardContent>
        {/* <CardFooter className="flex justify-center">
          <Button onClick={()=>}>
            Notify Me When Ready
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  )
}