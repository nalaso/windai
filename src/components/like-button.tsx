import { Button } from "./ui"
import { Heart } from "lucide-react"

const LikeButton = ({liked, toggleLikeClick}:{liked:boolean, toggleLikeClick: ()=> void}) => {
  return (
    <Button variant={"ghost"} onClick={()=>toggleLikeClick()} className="rounded-md" size={"icon"}>
        <Heart size={18} color={liked?"#e2475e":"black"} className="text-gray-600" fill={liked?"#e2475e":"white"} />
    </Button>
  )
}

export default LikeButton