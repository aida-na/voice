"use client"

import { useRouter } from "next/navigation"
import TemplateViewer from "@/components/template-viewer"

export default function TemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleBack = () => {
    router.push("/templates")
  }

  return <TemplateViewer templateId={params.id} onBack={handleBack} />
}
