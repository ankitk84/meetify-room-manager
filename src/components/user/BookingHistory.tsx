
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Booking {
  id: string;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'booked' | 'pending' | 'cancelled';
  username: string;
}

interface BookingHistoryProps {
  bookings: Booking[];
}

const BookingHistory = ({ bookings }: BookingHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-green-500 hover:bg-green-500';
      case 'pending': return 'bg-amber-500 hover:bg-amber-500';
      case 'cancelled': return 'bg-red-500 hover:bg-red-500';
      default: return 'bg-gray-500 hover:bg-gray-500';
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={20} />
          Your Booking History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No bookings yet. Start by booking your first meeting room!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBookings.map((booking) => (
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
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingHistory;
