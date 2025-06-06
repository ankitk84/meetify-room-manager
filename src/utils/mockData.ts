
// Mock data for testing the application

export const mockRooms = [
  {
    id: '1',
    name: 'Executive Boardroom',
    location: 'Floor 10, East Wing',
    capacity: 12,
    equipment: ['4K Display', 'Video Conferencing', 'Whiteboard', 'Coffee Station'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Innovation Hub',
    location: 'Floor 5, Central',
    capacity: 8,
    equipment: ['Smart TV', 'Wireless Presentation', 'Standing Desks'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Collaboration Space',
    location: 'Floor 3, West Wing',
    capacity: 6,
    equipment: ['Interactive Display', 'Video Call Setup', 'Moveable Furniture'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Focus Room Alpha',
    location: 'Floor 7, North',
    capacity: 4,
    equipment: ['TV Screen', 'Phone Conference', 'Privacy Glass'],
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Creative Studio',
    location: 'Floor 2, South Wing',
    capacity: 10,
    equipment: ['Projector', 'Sound System', 'Flexible Seating', 'Art Supplies'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    name: 'Quick Sync Pod',
    location: 'Floor 4, Central Hub',
    capacity: 3,
    equipment: ['Monitor', 'Charging Station', 'Noise Isolation'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  }
];

export const mockBookings = [
  {
    id: '1',
    roomName: 'Executive Boardroom',
    date: '2024-06-07',
    startTime: '09:00',
    endTime: '10:30',
    status: 'booked' as const,
    username: 'user'
  },
  {
    id: '2',
    roomName: 'Innovation Hub',
    date: '2024-06-08',
    startTime: '14:00',
    endTime: '15:00',
    status: 'booked' as const,
    username: 'john.doe'
  },
  {
    id: '3',
    roomName: 'Focus Room Alpha',
    date: '2024-06-06',
    startTime: '11:00',
    endTime: '12:00',
    status: 'cancelled' as const,
    username: 'user'
  }
];

export const mockPendingRequests = [
  {
    id: '1',
    roomName: 'Executive Boardroom',
    date: '2024-06-10',
    startTime: '14:00',
    endTime: '16:00',
    username: 'jane.smith',
    description: 'Quarterly business review with stakeholders'
  },
  {
    id: '2',
    roomName: 'Innovation Hub',
    date: '2024-06-09',
    startTime: '10:00',
    endTime: '11:30',
    username: 'user',
    description: 'Product planning session for Q3'
  }
];
