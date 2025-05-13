"use client"

import { useRouter } from "next/navigation"
import PromptEditor from "@/components/prompt-editor"

export default function NewPromptPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return <PromptEditor onBack={handleBack} />
}
