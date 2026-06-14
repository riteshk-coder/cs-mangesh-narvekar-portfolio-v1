export interface Qualification {
  id: string;
  abbreviation: string;
  fullName: string;
  description: string;
  iconName: string;
  color: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  items: string[];
  description: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  details: ServiceDetail[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'responded' | 'archived';
}

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
