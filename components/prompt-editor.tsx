"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Play, History, ArrowLeft, CheckCircle2, Plus } from "lucide-react"

export default function PromptEditor({ promptId, onBack }: { promptId?: string; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("edit")
  const [promptContent, setPromptContent] = useState(`# Voice AI Agent Prompt

## Agent Identity
You are a healthcare assistant calling on behalf of {client_name}. Your name is {agent_name}.

## Purpose
Your purpose is to {purpose}.

## Conversation Flow
1. Introduce yourself and verify the patient's identity
2. Explain the reason for your call: {call_reason}
3. Ask about {question_topic}
4. Provide information about {information_topic}
5. Schedule a follow-up if needed
6. Thank the patient for their time

## Guidelines
- Be empathetic and patient
- Speak clearly and at a moderate pace
- If the patient has questions you cannot answer, offer to connect them with a healthcare provider
- Do not diagnose medical conditions
- Maintain patient confidentiality

## Response Format
Keep responses conversational, brief, and focused on the patient's needs.`)

  // Mock data for a sample prompt
  const promptData = {
    id: promptId || "new",
    name: promptId ? "Medication Adherence v2.3" : "New Prompt",
    type: "base", // base, client, or experimental
    description: "Reminds patients to take their medication and checks for side effects",
    variables: [
      { name: "client_name", description: "Name of the healthcare provider" },
      { name: "agent_name", description: "Name of the AI agent" },
      { name: "purpose", description: "Primary purpose of the call" },
      { name: "call_reason", description: "Specific reason for the call" },
      { name: "question_topic", description: "Topic to ask the patient about" },
      { name: "information_topic", description: "Information to provide to the patient" },
    ],
    versions: promptId
      ? [
          { version: "v2.3", date: "2 days ago", author: "Sarah Chen" },
          { version: "v2.2", date: "1 week ago", author: "Mike Johnson" },
          { version: "v2.1", date: "2 weeks ago", author: "Sarah Chen" },
        ]
      : [],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">{promptData.name}</h2>
          {promptId && (
            <Badge variant="outline">
              {promptData.type === "base"
                ? "Base Prompt"
                : promptData.type === "client"
                  ? "Client Prompt"
                  : "Experimental"}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
          <Button variant="outline">
            <Play className="mr-2 h-4 w-4" />
            Test
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Prompt Name</Label>
                <Input id="name" defaultValue={promptData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={promptData.description} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Prompt Type</Label>
                <Select defaultValue={promptData.type}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Base Prompt</SelectItem>
                    <SelectItem value="client">Client Prompt</SelectItem>
                    <SelectItem value="experimental">Experimental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="callDirection">Call Direction</Label>
                <Select defaultValue="outbound">
                  <SelectTrigger id="callDirection">
                    <SelectValue placeholder="Select call direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outbound">Outbound</SelectItem>
                    <SelectItem value="inbound">Inbound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Base Template</Label>
                <Select>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Template</SelectItem>
                    <SelectItem value="medicare">Medicare Welcome Call</SelectItem>
                    <SelectItem value="medication">Medication Adherence Reminder</SelectItem>
                    <SelectItem value="appointment">Appointment Scheduling</SelectItem>
                    <SelectItem value="benefits">Benefits Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {promptData.type === "client" && (
                <div className="space-y-2">
                  <Label htmlFor="basePrompt">Base Prompt</Label>
                  <Select defaultValue="bp1">
                    <SelectTrigger id="basePrompt">
                      <SelectValue placeholder="Select base prompt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bp1">Medication Adherence</SelectItem>
                      <SelectItem value="bp2">Appointment Scheduling</SelectItem>
                      <SelectItem value="bp3">Post-Discharge Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prompt Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="mt-4">
                  <Textarea
                    className="min-h-[400px] font-mono"
                    value={promptContent}
                    onChange={(e) => setPromptContent(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <div className="border rounded-md p-4 min-h-[400px] prose max-w-none">
                    <div className="flex justify-between items-center mb-4">
                      <h1>Medicare Welcome Call Prompt Template</h1>
                      <Badge variant="outline">Outbound</Badge>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md mb-4">
                      <p className="text-sm font-medium text-yellow-800 mb-1">Variable Legend:</p>
                      <p className="text-sm text-yellow-700">
                        <span className="bg-green-100 px-1 mr-1">Green text</span>: Dynamic variables (changes per
                        member/call)
                      </p>
                      <p className="text-sm text-yellow-700">
                        <span className="bg-blue-100 px-1 mr-1">Blue text</span>: Client configured variables (fixed
                        across calls)
                      </p>
                    </div>

                    <h2>Agent Identity</h2>
                    <p>
                      You are a healthcare assistant calling on behalf of{" "}
                      <span className="bg-blue-100 px-1">{"{customer_name}"}</span>. Your name is{" "}
                      <span className="bg-green-100 px-1">{"{agent_name}"}</span>.
                    </p>

                    <h2>Purpose</h2>
                    <p>
                      Your purpose is to welcome <span className="bg-green-100 px-1">{"{member_name}"}</span> to their
                      new <span className="bg-blue-100 px-1">{"{program_name}"}</span> plan.
                    </p>

                    <h2>Conversation Flow</h2>
                    <ol>
                      <li>Introduce yourself and verify the patient's identity</li>
                      <li>
                        Explain the reason for your call: <span className="bg-blue-100 px-1">{"{call_reason}"}</span>
                      </li>
                      <li>
                        Ask about <span className="bg-green-100 px-1">{"{question_topic}"}</span>
                      </li>
                      <li>
                        Provide information about <span className="bg-blue-100 px-1">{"{information_topic}"}</span>
                      </li>
                      <li>Schedule a follow-up if needed</li>
                      <li>Thank the patient for their time</li>
                    </ol>

                    <h2>Guidelines</h2>
                    <ul>
                      <li>Be empathetic and patient</li>
                      <li>Speak clearly and at a moderate pace</li>
                      <li>
                        If the patient has questions you cannot answer, offer to connect them with a healthcare provider
                      </li>
                      <li>Do not diagnose medical conditions</li>
                      <li>Maintain patient confidentiality</li>
                    </ul>

                    <h2>Response Format</h2>
                    <p>Keep responses conversational, brief, and focused on the patient's needs.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Use {"{variable_name}"} for dynamic content</div>
              <Button variant="outline" size="sm">
                Format
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Dynamic Variables</span>
                  <Badge variant="outline" className="bg-green-50">
                    Member-specific
                  </Badge>
                </div>
                {promptData.variables.slice(0, 3).map((variable, index) => (
                  <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                    <div className="flex items-center justify-between">
                      <Label className="font-mono text-sm bg-green-100 px-1">{"{" + variable.name + "}"}</Label>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{variable.description}</p>
                  </div>
                ))}

                <div className="flex justify-between items-center mb-2 mt-6">
                  <span className="text-sm font-medium">Client Variables</span>
                  <Badge variant="outline" className="bg-blue-50">
                    Client-specific
                  </Badge>
                </div>
                {promptData.variables.slice(3).map((variable, index) => (
                  <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                    <div className="flex items-center justify-between">
                      <Label className="font-mono text-sm bg-blue-100 px-1">{"{" + variable.name + "}"}</Label>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{variable.description}</p>
                  </div>
                ))}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Dynamic Variable
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Client Variable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {promptId && (
            <Card>
              <CardHeader>
                <CardTitle>Version History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promptData.versions.map((version, index) => (
                    <div key={index} className="flex items-start justify-between pb-4 border-b last:border-0">
                      <div>
                        <div className="flex items-center">
                          {index === 0 && <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />}
                          <span className="font-medium">{version.version}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">By {version.author}</p>
                        <p className="text-xs text-muted-foreground">{version.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
