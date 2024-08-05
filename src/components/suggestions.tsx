import { MoveUpRight } from "lucide-react"
import { Badge } from "./ui"

const Suggestions = () => {
  const suggestions = [
    "login page for netflix",
    "product detail card for sneakers",
    "ecommerce checkout page",
    "dashboard for sales data",
    "Instagram App UI clone"
  ]
  return (
    <div className="flex gap-2">
      {suggestions.map((suggestion, index) => (
        <Badge variant={"secondary"} key={index} className="p-1 rounded-md cursor-pointer whitespace-nowrap">
          {suggestion}
          <MoveUpRight size={14} />
        </Badge>
      ))}
    </div>
  )
}

export default Suggestions