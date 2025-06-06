
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LogOut, Calendar, Users, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { mockBookings, mockPendingRequests } from '../../utils/mockData';
import { toast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  user: { username: string; role: 'user' | 'admin' };
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [allBookings, setAllBookings] = useState(mockBookings);

  const handleApproveRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Approved",
      description: "The booking request has been approved and the user has been notified.",
    });
  };

  const handleDeclineRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Declined",
      description: "The booking request has been declined and the user has been notified.",
      variant: "destructive",
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    setAllBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
    toast({
      title: "Booking Cancelled",
      description: "The booking has been cancelled and the user has been notified.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-green-500 hover:bg-green-500';
      case 'pending': return 'bg-amber-500 hover:bg-amber-500';
      case 'cancelled': return 'bg-red-500 hover:bg-red-500';
      default: return 'bg-gray-500 hover:bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage meeting room bookings and requests</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-amber-600">{pendingRequests.length}</p>
                </div>
                <AlertCircle size={32} className="text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-blue-600">{allBookings.length}</p>
                </div>
                <Calendar size={32} className="text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">24</p>
                </div>
                <Users size={32} className="text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Today's Meetings</p>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <Clock size={32} className="text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="bookings">All Bookings</TabsTrigger>
            <TabsTrigger value="manage">Manage Rooms</TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="pending">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle size={20} />
                  Pending Approval Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No pending requests. All caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div 
                        key={request.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-amber-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{request.roomName}</h3>
                            <Badge className="bg-amber-500 hover:bg-amber-500">Pending</Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>User:</strong> {request.username}</p>
                            <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {request.startTime} - {request.endTime}</p>
                            <p><strong>Description:</strong> {request.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            <XCircle size={16} className="mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Bookings */}
          <TabsContent value="bookings">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={20} />
                  All Room Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{booking.roomName}</h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>User:</strong> {booking.username}</p>
                          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                          <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                        </div>
                      </div>
                      {booking.status === 'booked' && (
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Rooms */}
          <TabsContent value="manage">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Room Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>Room management features coming soon...</p>
                  <p className="text-sm mt-2">Add, edit, and configure meeting rooms</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
