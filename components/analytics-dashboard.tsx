import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart3, PieChart, LineChart, Download, Calendar, Filter } from "lucide-react"

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 7 days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Calls</CardTitle>
            <CardDescription>Across all deployments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Task completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Avg. Call Duration</CardTitle>
            <CardDescription>Time per conversation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2:45</div>
            <p className="text-xs text-muted-foreground">-0:12 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="prompts">Prompt Comparison</TabsTrigger>
          <TabsTrigger value="clients">Client Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Call Performance Over Time</CardTitle>
                  <CardDescription>Success rate and call volume</CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select deployment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Deployments</SelectItem>
                    <SelectItem value="demo">Demo Lines</SelectItem>
                    <SelectItem value="dev">Dev Lines</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <LineChart className="h-16 w-16 mb-2" />
                <p>Performance chart would render here</p>
                <p className="text-xs">Shows success rate and call volume over time</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Success Factors</CardTitle>
                <CardDescription>What contributes to successful calls</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <PieChart className="h-12 w-12 mb-2" />
                  <p>Success factors chart would render here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Failure Analysis</CardTitle>
                <CardDescription>Common reasons for unsuccessful calls</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mb-2" />
                  <p>Failure analysis chart would render here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Version Comparison</CardTitle>
              <CardDescription>Compare performance across prompt versions</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mb-2" />
                <p>Prompt comparison chart would render here</p>
                <p className="text-xs">Shows success rates across different prompt versions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Performance</CardTitle>
              <CardDescription>Performance metrics by client</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mb-2" />
                <p>Client performance chart would render here</p>
                <p className="text-xs">Shows metrics broken down by client</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
