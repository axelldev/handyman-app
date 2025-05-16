export interface Task {
  id: number;
  title: string;
  description: string;
  isUrgent: boolean;
  locationId: number;
  imageUri: string | null;
}
