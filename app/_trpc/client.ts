import { createTRPCReact } from "@trpc/react-query";
import { AppRouterType } from '@/trpc';

export const trpc = createTRPCReact<AppRouterType>({})