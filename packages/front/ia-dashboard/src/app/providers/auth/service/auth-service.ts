import axios, { AxiosError } from 'axios';
import TabLock from 'browser-tabs-lock';
import { Cache, CacheEntry } from './_internal/cache.ts';
import { login, LoginInput, LoginResponse } from '@/app/providers/auth/api/login.ts';
import { retryPromise } from '@/app/providers/auth/service/_internal/retryPromise.ts';
import { singleton } from '@/app/providers/auth/service/_internal/singleton.ts';
import { AuthenticationError } from '@/app/providers/auth/service/auth-error.ts';
import { AUTH_CACHE_KEY } from '@/app/providers/auth/service/cache-key.ts';
import { API_URL } from '@/store/config.ts';

const LOCK_KEY = `ia:lock`;

const lock = new TabLock();

export class AuthService {
  cache = new Cache();
  client = axios.create({ baseURL: API_URL });

  public isAuthenticated() {
    return !!this._getCacheEntry();
  }

  public getEntry() {
    const entry = this._getCacheEntry();

    if (!entry) {
      return null;
    }

    return entry;
  }

  public async login(email: string, password: string) {
    return this._login({
      email,
      password
    });
  }

  public logout() {
    this._removeCacheEntry();
  }

  private _login = singleton(async (data: LoginInput) => {
    if (await retryPromise(() => lock.acquireLock(LOCK_KEY, 5000), 10)) {
      try {
        window.addEventListener('pagehide', this._releaseLockOnPageHide);

        const response = await login(this.client, data);

        if (response.data) {
          return this._setCacheEntry(response.data);
        } else {
          this._removeCacheEntry();
        }
      } catch (error: unknown) {
        this._removeCacheEntry();
        console.log(error);

        if (error instanceof AxiosError && error.code === AxiosError.ERR_NETWORK) {
          throw new Error('Network error');
        }

        throw new AuthenticationError('Request token error');
      } finally {
        await lock.releaseLock(LOCK_KEY);
        window.removeEventListener('pagehide', this._releaseLockOnPageHide);
      }
    }

    return null;
  });

  private _setCacheEntry(data: LoginResponse) {
    const entry: CacheEntry = {
      body: {
        token: data.token
      }
    };

    this.cache.set(AUTH_CACHE_KEY, entry);

    return entry;
  }

  private _getCacheEntry() {
    return this.cache.get(AUTH_CACHE_KEY);
  }

  private _removeCacheEntry() {
    this.cache.remove(AUTH_CACHE_KEY);
  }

  private _releaseLockOnPageHide = async () => {
    await lock.releaseLock(LOCK_KEY);

    window.removeEventListener('pagehide', this._releaseLockOnPageHide);
  };
}
