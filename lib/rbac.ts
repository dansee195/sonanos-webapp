import type { Role } from '@prisma/client';

const roleRank: Record<Role, number> = {
  owner: 3,
  admin: 2,
  member: 1,
};

export function hasRole(userRole: Role | null | undefined, min: Role) {
  if (!userRole) return false;
  return roleRank[userRole] >= roleRank[min];
}

