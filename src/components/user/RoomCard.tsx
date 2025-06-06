
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock, Calendar } from 'lucide-react';
import BookingModal from './BookingModal';

interface Room {
  id: string;
  name: string;
  location: string;
  capacity: number;
  equipment: string[];
  image: string;
}

interface RoomCardProps {
  room: Room;
  selectedDate: string;
  selectedTime: string;
  username: string;
}

const RoomCard = ({ room, selectedDate, selectedTime, username }: RoomCardProps) => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <img 
            src={room.image} 
            alt={room.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500 hover:bg-green-500">Available</Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{room.name}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin size={16} />
            {room.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              <span>Capacity: {room.capacity} people</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {room.equipment.map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                onClick={() => setShowBookingModal(true)}
              >
                Book This Room
              </Button>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingModal
        room={room}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        initialDate={selectedDate}
        initialTime={selectedTime}
        username={username}
      />
    </>
  );
};

export default RoomCard;
