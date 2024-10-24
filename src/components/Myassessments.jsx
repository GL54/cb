import { useState, useEffect, useContext } from 'react';
import { Search, ChevronDown, Filter, Plus, MoreHorizontal, ChevronLeft, ChevronRight, Bell, Home, FileText, Settings, Menu, AArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead,TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Share, Download, FileText as FileTextIcon, Trash2 } from 'lucide-react';
import { AuthContext } from '../AuthContext';


export default function MyAssessment() {
  const { accessToken, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [assessments, setAssessments] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });

  useEffect(() => {
    console.log("accessToken: " + accessToken)
    const fetchAssessments = async () => {
      const response = await fetch('https://app.spiralreports.com/api/assessments/all?page=1&limit=10&orderBy=asc', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("data isss",data.data);
      setAssessments(data.data.results); // Adjusted to match your data structure
      setPagination({currentPage:data.data.page,totalPages:data.data.totalPages,pageSize:data.limit.toNumber()});
    };
    fetchAssessments();
  }, [accessToken]);

  // const filteredAssessments = assessments.filter((assessment) => {
  //   const matchesSearch = Object.values(assessment).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase()));
  //   const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
  //   const matchesCategory = categoryFilter === 'all' || assessment.tags.includes(categoryFilter); // Assuming tags are used for categories
  //   return matchesSearch && matchesStatus && matchesCategory;
  // });

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, currentPage: page }));
  };
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
                <Button onClick={logout} className="bg-red-600 hover:bg-red-700">
            <AArrowDown className="mr-2 h-4 w-4" /> Log out
          </Button>
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
                    <SelectValue placeholder="Status"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    {/* Add other categories as necessary */}
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
    <Table >
      <TableHeader>
        <TableRow >
          <TableHead className="w-[300px]">Assessment Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Evaluation Count</TableHead>
          {/* <TableHead className="text-left">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {assessments.map((assessment) => (
          <TableRow key={assessment._id}>
            <TableCell className="font-medium">{assessment.title}</TableCell>
            <TableCell>{assessment.description}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                assessment.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {assessment.status}
              </span>
            </TableCell>
            <TableCell>{assessment.createdBy}</TableCell>
            <TableCell>{assessment.evaluationCount}</TableCell>
      
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>

        <div className="flex items-center justify-between space-x-2 py-4">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold">{(pagination.currentPage
              - 1) * pagination.pageSize + 1}</span> to <span className="font-semibold">{Math.min(pagination.currentPage * pagination.pageSize, pagination.totalPages * pagination.pageSize)}</span> of{' '}
              <span className="font-semibold">{pagination.totalPages * pagination.pageSize}</span> results
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(pagination.currentPage - 1, 1))}
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Go to previous page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(pagination.currentPage + 1, pagination.totalPages))}
                disabled={pagination.currentPage === pagination.totalPages}
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
    );
  };
  
