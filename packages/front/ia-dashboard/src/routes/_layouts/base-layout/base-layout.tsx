import { Outlet, ScrollRestoration } from 'react-router-dom';
import { AsideNav } from '../aside-nav';
import { Header } from '@/routes/_layouts/header';
import s from './base-layout.module.css';

export function BaseLayout() {
  return (
    <div
      className={
        'grid max-h-[100svh] h-[100svh] w-full lg:grid-cols-[260px_1fr]'
      }>
      <AsideNav />

      <div className={'grid grid-rows-[min-content_1fr] lg:grid-rows-1 h-full overflow-y-hidden'}>
        <Header />

        <main className={s.baseLayout}>
          <ScrollRestoration />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
