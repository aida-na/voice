"use client"

import { useRouter } from "next/navigation"
import PromptEditor from "@/components/prompt-editor"

export default function PromptPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return <PromptEditor promptId={params.id} onBack={handleBack} />
}
