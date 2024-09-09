export enum UserRole {
  admin = "super_admin",
}

export interface AdminUserData {
  id: number;
  name: string;
  email: string;
  remember_token: string | null;
  role: UserRole;
}
export interface AdminUser extends AdminUserData {
  role: UserRole;
}
export type User = {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  address?: string;
  phone_number?: string;
  profile_photo?: string;
  date_of_birth?: string;
  nick_name?: string;
  updated_at?: string;
  created_at?: string;
  user_id?: number;
  education_level?: Array<Option>;
  income_level?: Array<Option>;
  marital_status?: Array<Option>;
  children_option?: Array<Option>;
  interests_option?: Array<Option>;
  joining_motivation_options?: Array<Option>;
};

export type Option = {
  name: string;
  value: string;
  selected: boolean;
};
export type GetProfileResponse = {
  success: boolean;
  user_profile: User;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  admin: AdminUserData;
  role: UserRole;
  token: string;
};
