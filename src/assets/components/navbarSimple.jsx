import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Workshop', href: '#', current: true },
    { name: 'Explorer', href: '#', current: false },
    { name: 'Competition', href: '#', current: false },
    { name: 'Produtos', href: '#', current: false },
    { name: 'Sobre nós', href: '#', current: false },
]
const selected = classNames( 'text-tier-orange font-bold hover:bg-tier-blue hover:text-white')
const unselected = classNames('text-black hover:bg-tier-blue hover:text-white')
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    return (
        <Disclosure as="nav" className="bg-off-white border-b-8 border-b-tier-orange">
            <div className="mx-auto px-2 md:px-6 lg:px-16  ">
                <div className="relative flex h-22 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center cursor-pointer justify-center rounded-md p-2 text-gray-400 hover:bg-tier-blue hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 text-gray-500 md:hidden group-data-open:hidden"
                            >
                                <img
                                    src="/three_bar.svg"
                                    alt="Abrir menu"
                                    className="h-6 w-6"
                                />
                            </button>
                           
                            <XMarkIcon aria-hidden="true" className="hidden size-11  group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-between h-12">
                        <div className="flex shrink-0 items-center">
                            {/* Logo para mobile */}
                            <img
                                src="/logo.svg"
                                alt="Logo Mobile"
                                className="block md:hidden h-12 w-auto"
                            />

                            {/* Logomarca para desktop */}
                            <img
                                src="/logomarca.svg"
                                alt="Logo Desktop"
                                className="hidden md:block h-18 w-auto"
                            />
                        </div>

                        <div className="hidden md:ml-6 md:flex items-end h-14 ">
                            <div className="flex space-x-4 items-end ">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? selected : unselected,
                                            'rounded-md px-3 py-2 text-base',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                   </div>
            </div>
            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? selected: unselected,
                                'block rounded-md px-3 py-2 text-base',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
