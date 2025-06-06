
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Clock, Users, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Room {
  id: string;
  name: string;
  location: string;
  capacity: number;
  equipment: string[];
  image: string;
}

interface BookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  initialDate: string;
  initialTime: string;
  username: string;
}

const BookingModal = ({ room, isOpen, onClose, initialDate, initialTime, username }: BookingModalProps) => {
  const [date, setDate] = useState(initialDate);
  const [startTime, setStartTime] = useState(initialTime);
  const [endTime, setEndTime] = useState('10:00');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock availability check - in real app this would be an API call
  const checkAvailability = () => {
    // Simulate some rooms being unavailable at certain times
    const unavailableTimes = ['14:00', '15:00', '16:00'];
    return !unavailableTimes.includes(startTime);
  };

  const handleBooking = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isAvailable = checkAvailability();
      
      if (isAvailable) {
        toast({
          title: "Booking Confirmed!",
          description: `${room.name} has been booked for ${date} from ${startTime} to ${endTime}`,
        });
        onClose();
      } else {
        toast({
          title: "Room Not Available",
          description: "This time slot is already booked. You can request admin approval.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleRequestAdmin = async () => {
    setLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Request Submitted",
        description: "Your booking request has been sent to admin for approval.",
      });
      onClose();
      setLoading(false);
    }, 1000);
  };

  const isAvailable = checkAvailability();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Book {room.name}
          </DialogTitle>
          <DialogDescription>
            Complete the details below to book your meeting room
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Details */}
          <div className="space-y-4">
            <img 
              src={room.image} 
              alt={room.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-gray-500" />
                <span>{room.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-gray-500" />
                <span>Up to {room.capacity} people</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Equipment Available:</p>
              <div className="flex flex-wrap gap-1">
                {room.equipment.map((item, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Meeting Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your meeting..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Availability Status */}
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              isAvailable 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              {isAvailable ? (
                <>
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Room available for selected time</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">Room not available - admin approval required</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              {isAvailable ? (
                <Button 
                  onClick={handleBooking}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                >
                  {loading ? 'Booking...' : 'Book Now'}
                </Button>
              ) : (
                <Button 
                  onClick={handleRequestAdmin}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  {loading ? 'Requesting...' : 'Request Admin Approval'}
                </Button>
              )}
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
