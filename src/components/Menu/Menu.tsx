'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

export default function Header() {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <header
      className="w-full bg-white text-black font-inter mb-12 border border-bottom border-gray-200"
      id="inicio"
      data-testid="menu"
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            data-testid="logo"
            className="flex items-center gap-2 font-semibold text-base"
          >
            <Image
              src="/logo.svg"
              alt="Cursos - Permaneo"
              width={51}
              height={63}
              className="h-10"
            />
            Grupo Parmeneo
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 mt-1">
          <Link
            href="/"
            data-testid="menu-home"
            className={cn(
              'text-base font-medium hover:text-violet-500 transition-colors after:content-[""] after:block after:w-full after:h-1 after:bg-transparent after:mt-1 after:rounded-ss-md after:rounded-br-sm',
              {
                'font-bold after:bg-violet-500': pathname === '/',
              },
            )}
          >
            Início
          </Link>
          <Link
            href="/course/favorites"
            data-testid="menu-favorites"
            className={cn(
              'text-base font-medium hover:text-violet-500 transition-colors after:content-[""] after:block after:w-full after:h-1 after:bg-transparent after:mt-1 after:rounded-ss-md after:rounded-br-sm',
              {
                'font-bold after:bg-violet-500':
                  pathname === '/course/favorites',
              },
            )}
          >
            Favoritos
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden outline-0">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] sm:w-[350px] px-4 pt-4"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <SheetHeader className="px-0">
              <VisuallyHidden>
                <DialogTitle>Menu</DialogTitle>
                <DialogDescription>Escolha uma opção</DialogDescription>
              </VisuallyHidden>

              <div className="flex justify-between items-center mb-2 mt-4">
                <Link
                  href="/"
                  data-testid="logo"
                  className="flex items-center gap-2 font-semibold text-base"
                >
                  <Image
                    src="/logo.svg"
                    alt="Cursos - Permaneo"
                    width={51}
                    height={63}
                    className="h-10"
                  />
                  Grupo Parmeneo
                </Link>
              </div>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className={cn(
                    'text-lg font-medium hover:text-violet-500 transition-colors py-2 border-b border-gray-100',
                    {
                      'text-violet-500 font-bold': pathname === '/',
                    },
                  )}
                >
                  Início
                </Link>
                <Link
                  href="/course/favorites"
                  onClick={handleLinkClick}
                  className={cn(
                    'text-lg font-medium hover:text-violet-500 transition-colors py-2 border-b border-gray-100',
                    {
                      'text-violet-500 font-bold':
                        pathname === '/course/favorites',
                    },
                  )}
                >
                  Favoritos
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
