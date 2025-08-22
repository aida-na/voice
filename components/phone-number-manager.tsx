"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Phone, Plus, Edit2, Trash2 } from "lucide-react"

// Mock data for phone numbers
const phoneNumbersData = [
  {
    id: "1",
    number: "+1 (555) 123-4567",
    label: "Memorial Hospital Demo",
    status: "Active",
    deployment: "Memorial Hospital - Med Adherence v2.3",
  },
  {
    id: "2",
    number: "+1 (555) 234-5678",
    label: "City Clinic Demo",
    status: "Active",
    deployment: "City Clinic - Appointment v1.5",
  },
  {
    id: "3",
    number: "+1 (555) 345-6789",
    label: "Health Partners Demo",
    status: "Inactive",
    deployment: "Health Partners - Discharge v1.0",
  },
  {
    id: "4",
    number: "+1 (555) 456-7890",
    label: "Memorial Hospital Dev",
    status: "Active",
    deployment: "Memorial Hospital - Med Adherence v2.4-beta",
  },
  {
    id: "5",
    number: "+1 (555) 567-8901",
    label: "City Clinic Dev",
    status: "Active",
    deployment: "City Clinic - Appointment v2.0-test",
  },
  { id: "6", number: "+1 (555) 678-9012", label: "Unassigned", status: "Available", deployment: "None" },
]

export default function PhoneNumberManager() {
  const [phoneNumbers, setPhoneNumbers] = useState(phoneNumbersData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [newPhoneLabel, setNewPhoneLabel] = useState("")

  const handleAddPhoneNumber = () => {
    if (newPhoneNumber && newPhoneLabel) {
      const newPhone = {
        id: (phoneNumbers.length + 1).toString(),
        number: newPhoneNumber,
        label: newPhoneLabel,
        status: "Available",
        deployment: "None",
      }
      setPhoneNumbers([...phoneNumbers, newPhone])
      setNewPhoneNumber("")
      setNewPhoneLabel("")
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Phone Number Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Phone Number
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Phone Number</DialogTitle>
              <DialogDescription>
                Add a new phone number to your account for use with voice AI agents.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+1 (555) 123-4567"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  placeholder="e.g., Memorial Hospital Demo"
                  value={newPhoneLabel}
                  onChange={(e) => setNewPhoneLabel(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPhoneNumber}>Add Phone Number</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phone Number</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current Deployment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phoneNumbers.map((phone) => (
              <TableRow key={phone.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    {phone.number}
                  </div>
                </TableCell>
                <TableCell>{phone.label}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      phone.status === "Active" ? "default" : phone.status === "Available" ? "outline" : "secondary"
                    }
                  >
                    {phone.status}
                  </Badge>
                </TableCell>
                <TableCell>{phone.deployment}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
