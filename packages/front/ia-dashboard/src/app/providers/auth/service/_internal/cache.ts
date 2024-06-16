export interface CacheAuthData {
  token: string;
}

export interface CacheEntry {
  body: CacheAuthData;
}

export type MaybePromise<T> = Promise<T> | T;

export interface ICache {
  set<T = CacheEntry>(key: string, entry: T): MaybePromise<void>;
  get<T = CacheEntry>(key: string): MaybePromise<T | undefined>;
  remove(key: string): MaybePromise<void>;
  allKeys?(): MaybePromise<string[]>;
}

const AUTH_CACHE_PREFIX = 'ia:';

export class Cache implements ICache {
  static getKey(key: string) {
    return `${AUTH_CACHE_PREFIX}${key}`;
  }

  public set<T = CacheEntry>(key: string, entry: T) {
    localStorage.setItem(Cache.getKey(key), JSON.stringify(entry));
  }

  public get<T = CacheEntry>(key: string): T | undefined {
    const json = window.localStorage.getItem(Cache.getKey(key));

    if (!json) {
      return;
    }

    try {
      return JSON.parse(json) as T;
    } catch (e) {
      return;
    }
  }

  public remove(key: string) {
    localStorage.removeItem(Cache.getKey(key));
  }

  public allKeys() {
    return Object.keys(window.localStorage).filter((key) => key.startsWith(AUTH_CACHE_PREFIX));
  }
}
