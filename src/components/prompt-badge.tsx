import React from 'react'
import { Badge } from './ui'
import { toast } from "sonner"

const PromptBadge = ({className, variant, prompt}:{className:string, variant:"default" | "secondary" | "destructive" | "outline" | null | undefined, prompt:string}) => {

    const copyPrompt = () => {
        navigator.clipboard.writeText(prompt)
        toast.info("Prompt copied to clipboard")
    }

  return (
    <Badge variant={variant} className={className} onClick={()=>copyPrompt()}>
        <span className="truncate mr-1">{prompt}</span>
    </Badge>
  )
}

export default PromptBadge