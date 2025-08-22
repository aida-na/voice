"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitBranch, BarChart3, Settings, FileText } from "lucide-react"
import PromptLibrary from "@/components/prompt-library"
import DeploymentDashboard from "@/components/deployment-dashboard"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Healthcare Voice AI Management</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Documentation
            </Button>
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/phone-numbers")}>
              Phone Numbers
            </Button>
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/templates")}>
              Templates
            </Button>
            <Button size="sm">New Prompt</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <Tabs defaultValue="prompts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prompts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Prompt Library
            </TabsTrigger>
            <TabsTrigger value="deployments" className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Deployments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompts" className="space-y-6">
            <PromptLibrary />
          </TabsContent>

          <TabsContent value="deployments" className="space-y-6">
            <DeploymentDashboard />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Settings</CardTitle>
                  <CardDescription>Configure connections to DynamoDB and Databricks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage your data source connections and authentication settings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage team access and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Control who can create, edit, and deploy prompts.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
