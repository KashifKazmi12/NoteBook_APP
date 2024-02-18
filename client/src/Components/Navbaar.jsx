import React from 'react'
import Logo from "../img/Logo (1).webp"
import User from "../img/user.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'


const navigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'About', to: '/about' },
  { name: 'Weather', to: '/weather' },
  { name: 'Calendar', to: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbaar = (props) => {
  const location = useLocation();
  const navigate = useNavigate()
  return (
    <div>
      <Disclosure as="nav" className={!props.nightMode ? `bg-purple-800` : `bg-gray-800`}>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-20 py-1">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to={'/'}><div className="logo w-14 h-14 bg-orange-800 flex content-center items-center rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-100%"><img src={Logo} className=" border rounded-full mx-auto" alt="" /></div></Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          // ...
                          className={classNames(
                            location.pathname === item.to
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={location.pathname === item.to ? 'page' : ''}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button onClick={props.myNightMode}
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Enable Light Mode</span>

                    {props.nightMode ? <MoonIcon className="h-6 w-6 text-white" aria-hidden="true" /> : <SunIcon className="h-6 w-6 text-orange-300" aria-hidden="true" />}
                  </button>

                  {/* <button style={{height:"45px"}}><img style={{height:"100%"}} src={addNote} alt="Add Notes" /></button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div><div className="logo w-10 h-10 bg-orange-800 flex content-center items-center rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">{localStorage.getItem('token') ? <img src={User} className=" border rounded-full mx-auto" alt="" /> : <i style={{ fontWeight: 'bolder', fontSize: '20px', color: 'white' }} className="fa-solid fa-bars-staggered fa-flip-both m-auto"></i>}</div></div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {/* <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item> */}
                        {/* <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item> */}

                        {!localStorage.getItem("token") && <>
                          <Menu.Item>
                            {({ active }) => (
                              <div onClick={() => { navigate("/login") }} className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                Login
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div onClick={() => { navigate("/signup") }} className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                Signup
                              </div>
                            )}
                          </Menu.Item>
                        </>
                        }
                        {localStorage.getItem("token") && <Menu.Item>
                          {({ active }) => (
                            <div onClick={() => { localStorage.removeItem('token'); navigate("/login") }} className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                              Sign out
                            </div>
                          )}
                        </Menu.Item>}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 w-full">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.to}>
                    <Disclosure.Button
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        location.pathname === item.to ? 'bg-gray-900 text-white w-full' : 'text-gray-300 hover:bg-gray-700 hover:text-white w-full',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={location.pathname === item.to ? 'page' : ''}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </div>
  )
}

export default Navbaar
