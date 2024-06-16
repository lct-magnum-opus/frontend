import { CircleUser, PanelLeft, Plus } from 'lucide-react';
import { useAuth } from '@/app/providers/auth';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { useUser } from '@/store/user/useUser.ts';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/utils/utils.ts';
import { useChats } from '@/store/chat/getChats.ts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {useMemo} from 'react';

export function Header() {
  const { logout, testMode } = useAuth();
  const { data: user } = useUser();
  const { data: chats } = useChats();

  const reversedChats = useMemo(() => chats?.slice().reverse(), [chats]);

  return (
    <header className="sticky top-0 w-full block lg:hidden h-[60px] shadow-md">
      <div className="flex h-full px-4 justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="flex lg:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs px-0 py-1">
            <div className="flex flex-col px-2 pt-2 space-y-3">
              <h1 className="pl-3 font-semibold">Invest Advisor</h1>
              <SheetClose asChild>
                <Link
                  to={'/'}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-primary hover:bg-muted hover:text-primary font-medium text-sm'
                  )}>
                  Новый чат
                  <Plus className="h-4 w-4" />
                </Link>
              </SheetClose>
            </div>
            <nav className="flex flex-col items-start px-2 py-2 space-y-1 text-sm">
              {reversedChats?.map((item, index) => (
                <NavLink
                  to={`/c/${item.type === 'technopark' ? 't' : 'b'}/${item.id}`}
                  className={({ isActive }) =>
                    cn(
                      'w-full block rounded-md px-3 py-2.5 text-primary hover:bg-muted hover:text-primary whitespace-nowrap overflow-hidden overflow-ellipsis',
                      {
                        ['bg-muted text-primary']: isActive
                      }
                    )
                  }
                  key={index}>
                  <SheetClose>
                    {item.name
                      // @ts-ignore
                      ?.replaceAll('\\', '')}
                  </SheetClose>
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user && (
              <>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <Popover>
                    <PopoverTrigger>{user.full_name}</PopoverTrigger>
                    <PopoverContent>
                      <h3 className="text-md font-semibold mb-2">Информация о пользователе</h3>
                      <dl>
                        <dt className="font-semibold text-sm">ФИО</dt>
                        <dd className="text-sm mb-3">{user.full_name || '–'}</dd>

                        <dt className="font-semibold text-sm">Организация</dt>
                        <dd className="text-sm mb-3">{user.organization_name || '–'}</dd>

                        <dt className="font-semibold text-sm">ИНН</dt>
                        <dd className="text-sm mb-3">{user.tax_number || '–'}</dd>

                        <dt className="font-semibold text-sm">ОКВЭД</dt>
                        <dd className="text-sm mb-3">{user.industry || '–'}</dd>

                        <dt className="font-semibold text-sm">Должность</dt>
                        <dd className="text-sm mb-3">{user.position || '–'}</dd>

                        <dt className="font-semibold text-sm">Страна</dt>
                        <dd className="text-sm mb-3">{user.country || '–'}</dd>

                        <dt className="font-semibold text-sm">Город</dt>
                        <dd className="text-sm">{user.city || '–'}</dd>
                      </dl>
                    </PopoverContent>
                  </Popover>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem onClick={logout}>
              {testMode ? 'Авторизация' : 'Выход'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
