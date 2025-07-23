export interface Nickname {
  id: number;
  name: string; // 사라질 닉네임
  otherName: string; // 본캐 닉네임
  union: number;
  badge: number;
  date: string;
}

export type FormValues = {
  name: string;
  date: string;
  otherName?: string;
  union?: number;
  badge?: number;
};
