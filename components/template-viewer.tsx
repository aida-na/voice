"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Copy, Edit } from "lucide-react"

export default function TemplateViewer({ templateId, onBack }: { templateId: string; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("view")

  // This would be fetched from your API in a real application
  const templateContent = `Medicare Welcome Call Prompt Template
[Outbound]

Green text: Dynamic variables (changes per member/call)
Examples:
member_name = "Louis Smith"
date_of_birth = "May 15, 1972"
medication_list = ["Lisinopril 10mg", "Metformin 500mg"]
pharmacy_name = "HealthPlus Preferred Pharmacy"
pcp_name = "Dr. Sam Didon"
Blue text: Client configured variables (set during implementation; fixed/static across all member calls)

## ------------------------------------##
###### EDIT VALUES BEGINNING HERE #######

member_name = "Shawn Williams"
date_of_birth = "February 8, 1954"
customer_name = "Local AdvantagePlan"
customer_phone = "800-555-8342"
program_name = "Medicare Advantage"
transfer_call_number = "800-555-4862"

# The first sentence spoken to the caller
begin_sentence = " Hello!  This is an AI virtual agent,  from Member Services at Local AdvantagePlan. We're reaching out to welcome you to your new health plan. Are you interested in learning more about how the plan works and what benefits are included?"

agent_identity = "## You are an AI virtual agent from Member Services at Local AdvantagePlan. You are calling Shawn Williams, who is signed up with Local AdvantagePlan's Medicare Advantage. Your goal is to confirm the member is properly set up to use their new plan and ensure they are familiar with the benefits available to them."

agent_task = """
## Conversation Flow
1. Introduction and identity verification
   - Introduce yourself and your organization
   - State the the reason of this call 
   - Reassure them that the call won't take that long and confirm their interest in learning more 
   - If they are interested, explain that identity verification is required before discussing additional details 
   - Confirm their first and last name
  - If they are not interested politely let them know you're happy to reach out again another time
  - If verification fails, politely end the call by saying 'Goodbye'

2. Purpose statement
   - Clearly state the purpose of your call 
   - Mention the specific topics you'll be discussing and provide a time estimate for the call
   - Frame benefits in terms of value to the member
  
3. Execute Call Objectives
Execute one objective at a time, be concise and efficient
Listen for natural conversational cues to gauge understanding while moving from one objective to the next:
First, confirm receipt of their member ID card.
Next, ask if the member has created a web account yet, and offer to help if not. 
After that, walk them through their available benefits and ask if they'd like to hear more about any of them. 
Then, respond to the member's questions about their benefits, as able. 
Last, offer to send them a text message to sign-up.

4. Next Steps
- Offer clear options for next steps or further information
- Outline specific action steps
- Confirm the member's preference

5. Question handling
   - Answer questions within your knowledge scope and the topic scope
   - For unknown answers to questions in the topic of this conversation, offer to transfer to a specialist and if they accept say 'I'm transferring you to another agent, thank you' and never say 'Goodbye' at the end
   - Redirect to relevant information when possible
   - For all unrelated questions, politely state the topic is outside your scope of knowledge and redirect back to the call's topic

6. Conclusion
   - Summarize the conversation
   - Confirm next steps
   - Express appreciation for their time
   - End the call professionally by saying 'Goodbye' to hang up
"""
`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">Medicare Welcome Call Template</h2>
          <Badge variant="outline">Outbound</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">Outbound welcome call for new Medicare Advantage members</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Variables</h3>
              <p className="text-sm text-muted-foreground">12 variables (6 dynamic, 6 client)</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Used By</h3>
              <p className="text-sm text-muted-foreground">3 prompts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view">Formatted View</TabsTrigger>
              <TabsTrigger value="raw">Raw Text</TabsTrigger>
            </TabsList>
            <TabsContent value="view" className="mt-4">
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
                    <span className="bg-blue-100 px-1 mr-1">Blue text</span>: Client configured variables (fixed across
                    calls)
                  </p>
                </div>

                <h2>Variables</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3>Dynamic Variables</h3>
                    <ul>
                      <li>
                        <code className="bg-green-100 px-1">member_name</code>: "Shawn Williams"
                      </li>
                      <li>
                        <code className="bg-green-100 px-1">date_of_birth</code>: "February 8, 1954"
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>Client Variables</h3>
                    <ul>
                      <li>
                        <code className="bg-blue-100 px-1">customer_name</code>: "Local AdvantagePlan"
                      </li>
                      <li>
                        <code className="bg-blue-100 px-1">program_name</code>: "Medicare Advantage"
                      </li>
                      <li>
                        <code className="bg-blue-100 px-1">customer_phone</code>: "800-555-8342"
                      </li>
                    </ul>
                  </div>
                </div>

                <h2>Agent Identity</h2>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p>
                    You are an AI virtual agent from Member Services at{" "}
                    <span className="bg-blue-100 px-1">Local AdvantagePlan</span>. You are calling{" "}
                    <span className="bg-green-100 px-1">Shawn Williams</span>, who is signed up with{" "}
                    <span className="bg-blue-100 px-1">Local AdvantagePlan</span>'s{" "}
                    <span className="bg-blue-100 px-1">Medicare Advantage</span>. Your goal is to confirm the member is
                    properly set up to use their new plan and ensure they are familiar with the benefits available to
                    them.
                  </p>
                </div>

                <h2>Conversation Flow</h2>
                <ol>
                  <li>
                    <strong>Introduction and identity verification</strong>
                    <ul>
                      <li>Introduce yourself and your organization</li>
                      <li>State the reason of this call</li>
                      <li>
                        Reassure them that the call won't take that long and confirm their interest in learning more
                      </li>
                      <li>
                        If they are interested, explain that identity verification is required before discussing
                        additional details
                      </li>
                      <li>Confirm their first and last name</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Purpose statement</strong>
                    <ul>
                      <li>Clearly state the purpose of your call</li>
                      <li>Mention the specific topics you'll be discussing and provide a time estimate for the call</li>
                      <li>Frame benefits in terms of value to the member</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Execute Call Objectives</strong>
                    <p>Execute one objective at a time, be concise and efficient</p>
                    <ul>
                      <li>First, confirm receipt of their member ID card.</li>
                      <li>Next, ask if the member has created a web account yet, and offer to help if not.</li>
                      <li>
                        After that, walk them through their available benefits and ask if they'd like to hear more about
                        any of them.
                      </li>
                      <li>Then, respond to the member's questions about their benefits, as able.</li>
                      <li>Last, offer to send them a text message to sign-up.</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </TabsContent>
            <TabsContent value="raw" className="mt-4">
              <div className="border rounded-md p-4 min-h-[400px]">
                <pre className="text-sm font-mono whitespace-pre-wrap">{templateContent}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
