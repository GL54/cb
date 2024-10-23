import  { useState } from 'react'
import { Search, ChevronDown, Filter, Plus, MoreHorizontal, ChevronLeft, ChevronRight, Bell, Home, FileText, Settings, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Share, Download, FileText as FileTextIcon, Trash2 } from 'lucide-react'

// Mock data for assessments
const mockAssessments = [
  { id: 1, name: 'Cybersecurity Maturity Assessment', category: 'IT', status: 'Completed', date: '2023-06-15', score: '4.2/5' },
  { id: 2, name: 'Employee Engagement Survey', category: 'HR', status: 'In Progress', date: '2023-06-10', score: '-' },
  { id: 3, name: 'GDPR Compliance Checklist', category: 'Legal', status: 'Completed', date: '2023-06-05', score: '3.8/5' },
  { id: 4, name: 'Customer Satisfaction Survey', category: 'CX', status: 'Completed', date: '2023-06-01', score: '4.5/5' },
  { id: 5, name: 'IT Infrastructure Assessment', category: 'IT', status: 'Not Started', date: '2023-06-20', score: '-' },
]

export default function MyAssessments() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = Object.values(assessment).some(
      value => value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || assessment.category === categoryFilter
    // Implement date filtering logic here if needed
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="flex flex-col min-h-screen text-black bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600 mr-8">SpiralReports</h1>
              <nav className="hidden md:flex space-x-1">
                <Button variant="ghost" className="text-black hover:text-red-600 hover:bg-red-50">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button variant="ghost" className="text-black hover:text-red-600 hover:bg-red-50">
                  <FileText className="mr-2 text-black h-4 w-4" />
                  My Assessments
                </Button>
                <Button variant="ghost" className="text-black hover:text-red-600 hover:bg-red-50">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-red-100 text-red-600 rounded-full px-3 py-1">
                <span className="mr-2 text-sm font-medium">Credits: 500</span>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-200 p-1">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="text-black hover:text-red-600 hover:bg-red-50">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center text-black hover:text-red-600 hover:bg-red-50">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">John Doe</span>
                    <Settings className="ml-2 text-black h-4 w-4" />
                    <ChevronDown className="ml-1 text-black h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden text-black hover:text-red-600 hover:bg-red-50">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Assessments</h2>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" /> New Assessment
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search assessments..."
                    className="pl-10 pr-4 py-2 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2 w-full md:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="CX">Customer Experience</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last90days">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" /> More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Assessment Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell className="font-medium">{assessment.name}</TableCell>
                    <TableCell>{assessment.category}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        assessment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        assessment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {assessment.status}
                      </span>
                    </TableCell>
                    <TableCell>{assessment.date}</TableCell>
                    <TableCell>{assessment.score}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Share className="h-4 w-4 mr-2" />
                              Share Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileTextIcon className="h-4 w-4 mr-2" />
                              Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between space-x-2 py-4">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold">1</span> to <span className="font-semibold">5</span> of{' '}
            <span className="font-semibold">50</span> results
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Go to previous page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-black">
              © 2023 SpiralReports. All rights reserved.
            </div>
            <nav className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-black hover:text-red-600 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-sm text-black hover:text-red-600 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-sm text-black hover:text-red-600 transition-colors duration-300">Contact Us</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}