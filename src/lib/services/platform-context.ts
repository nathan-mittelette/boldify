import { createContext } from 'svelte';
import type { Platform } from '#lib/models/platform.model.js';

export const [getPlatformContext, setPlatformContext] = createContext<() => Platform>();
