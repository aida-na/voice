"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, PlusCircle, Copy, Edit, Archive, Clock, CheckCircle2, Users } from "lucide-react"

// Mock data
const basePrompts = [
  {
    id: "bp1",
    name: "Medication Adherence",
    description: "Reminds patients to take their medication and checks for side effects",
    campaignType: "Medication",
    versions: 3,
    lastUpdated: "2 days ago",
  },
  {
    id: "bp2",
    name: "Appointment Scheduling",
    description: "Helps patients schedule follow-up appointments",
    campaignType: "Scheduling",
    versions: 5,
    lastUpdated: "1 week ago",
  },
  {
    id: "bp3",
    name: "Post-Discharge Follow-up",
    description: "Checks on patients after hospital discharge",
    campaignType: "Follow-up",
    versions: 2,
    lastUpdated: "3 days ago",
  },
]

const clientPrompts = [
  {
    id: "cp1",
    name: "Memorial Hospital - Medication",
    basePrompt: "Medication Adherence",
    client: "Memorial Hospital",
    versions: 2,
    lastUpdated: "1 day ago",
    status: "Active",
  },
  {
    id: "cp2",
    name: "City Clinic - Appointment",
    basePrompt: "Appointment Scheduling",
    client: "City Clinic",
    versions: 3,
    lastUpdated: "5 days ago",
    status: "Active",
  },
  {
    id: "cp3",
    name: "Health Partners - Discharge",
    basePrompt: "Post-Discharge Follow-up",
    client: "Health Partners",
    versions: 1,
    lastUpdated: "2 weeks ago",
    status: "Draft",
  },
]

export default function PromptLibrary() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Prompt Library</h2>
        <div className="flex items-center gap-2">
        </div>
      </div>

      <Tabs defaultValue="base">
        <TabsList>
          <TabsTrigger value="base">Base Prompts</TabsTrigger>
          <TabsTrigger value="client">Client Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="base" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {basePrompts.map((prompt) => (
              <Card key={prompt.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{prompt.name}</CardTitle>
                    <Badge variant="outline">{prompt.campaignType}</Badge>
                  </div>
                  <CardDescription>{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    Last updated {prompt.lastUpdated}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    {prompt.versions} versions
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Adapt
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => (window.location.href = `/prompts/${prompt.id}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="border-dashed flex flex-col items-center justify-center p-6">
              <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm font-medium">Create New Base Prompt</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => (window.location.href = "/prompts/new")}
              >
                Add Prompt
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="client" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientPrompts.map((prompt) => (
              <Card key={prompt.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{prompt.name}</CardTitle>
                    <Badge variant={prompt.status === "Active" ? "default" : "secondary"}>{prompt.status}</Badge>
                  </div>
                  <CardDescription>Based on: {prompt.basePrompt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    Client: {prompt.client}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="mr-1 h-4 w-4" />
                    Last updated {prompt.lastUpdated}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    {prompt.versions} versions
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="border-dashed flex flex-col items-center justify-center p-6">
              <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm font-medium">Create New Client Prompt</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => (window.location.href = "/prompts/new")}
              >
                Add Prompt
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
