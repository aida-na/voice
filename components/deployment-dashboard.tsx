import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, AlertCircle, CheckCircle, Clock, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data
const demoDeployments = [
  {
    id: "d1",
    name: "Memorial Hospital - Med Adherence v2.3",
    promptVersion: "v2.3",
    lineId: "demo-line-1",
    phoneNumber: "+1 (555) 123-4567",
    callDirection: "Outbound",
    status: "Active",
    lastDeployed: "1 day ago",
    calls: 24,
    successRate: 92,
  },
  {
    id: "d2",
    name: "City Clinic - Appointment v1.5",
    promptVersion: "v1.5",
    lineId: "demo-line-2",
    phoneNumber: "+1 (555) 234-5678",
    callDirection: "Inbound",
    status: "Active",
    lastDeployed: "3 days ago",
    calls: 18,
    successRate: 88,
  },
  {
    id: "d3",
    name: "Health Partners - Discharge v1.0",
    promptVersion: "v1.0",
    lineId: "demo-line-3",
    phoneNumber: "+1 (555) 345-6789",
    callDirection: "Outbound",
    status: "Paused",
    lastDeployed: "1 week ago",
    calls: 5,
    successRate: 80,
  },
]

const devDeployments = [
  {
    id: "d4",
    name: "Memorial Hospital - Med Adherence v2.4-beta",
    promptVersion: "v2.4-beta",
    lineId: "dev-line-1",
    phoneNumber: "+1 (555) 456-7890",
    callDirection: "Outbound",
    status: "Active",
    lastDeployed: "12 hours ago",
    calls: 8,
    successRate: 75,
  },
  {
    id: "d5",
    name: "City Clinic - Appointment v2.0-test",
    promptVersion: "v2.0-test",
    lineId: "dev-line-2",
    phoneNumber: "+1 (555) 567-8901",
    callDirection: "Inbound",
    status: "Active",
    lastDeployed: "2 days ago",
    calls: 12,
    successRate: 83,
  },
]

export default function DeploymentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Deployments</h2>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          New Deployment
        </Button>
      </div>

      <Tabs defaultValue="demo">
        <TabsList>
          <TabsTrigger value="demo">Demo Lines</TabsTrigger>
          <TabsTrigger value="prod">Production Lines</TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {demoDeployments.map((deployment) => (
              <Card key={deployment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{deployment.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={deployment.callDirection === "Outbound" ? "outline" : "secondary"}>
                        {deployment.callDirection}
                      </Badge>
                      <Badge variant={deployment.status === "Active" ? "default" : "secondary"}>
                        {deployment.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>Line ID: {deployment.lineId}</CardDescription>
                  <div className="mt-1 text-sm text-muted-foreground flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {deployment.phoneNumber}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Prompt Version</div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                        {deployment.promptVersion}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Last Deployed</div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        {deployment.lastDeployed}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Performance</div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm">
                          <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                          {deployment.calls} calls
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          {deployment.successRate}% success
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Select defaultValue="current">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">{deployment.promptVersion} (Current)</SelectItem>
                        <SelectItem value="previous">Previous Version</SelectItem>
                        <SelectItem value="new">New Version</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Update
                    </Button>
                  </div>
                  <div>
                    {deployment.status === "Active" ? (
                      <Button variant="outline" size="sm">
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Activate
                      </Button>
                    )}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Change Number
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Phone Number</DialogTitle>
                        <DialogDescription>Assign a different phone number to this deployment.</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Select defaultValue={deployment.id}>
                          <SelectTrigger id="phoneNumber" className="mt-2">
                            <SelectValue placeholder="Select phone number" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={deployment.id}>{deployment.phoneNumber} (Current)</SelectItem>
                            <SelectItem value="pn1">+1 (555) 678-9012 (Available)</SelectItem>
                            <SelectItem value="pn2">+1 (555) 789-0123 (Available)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>


        <TabsContent value="prod" className="space-y-4 mt-4">
          <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
            <Phone className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Production Lines</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Production lines are for client-facing deployments. Promote a demo line to production when it's ready for
              client use.
            </p>
            <Button>
              <Play className="mr-2 h-4 w-4" />
              Promote Demo to Production
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
