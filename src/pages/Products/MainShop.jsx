import { Fragment, useEffect, useState, useMemo } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import Footer from "../../components/Footer.jsx"
import Header from "../../components/Header.jsx"
import SingleProduct from "../../components/SingleProduct.jsx"
import { server } from "../../Server.js"
import axios from "axios"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MainShop() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedPriceRange, setSelectedPriceRange] = useState('')
    const [sortOption, setSortOption] = useState('popularity')


    useEffect(() => {
        fetchCategories()
        fetchAllProducts()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${server}/categories`)
            // Ensure we're setting the state with the array of categories
            setCategories(response.data.categories || [])
        } catch (error) {
            console.error('Error fetching categories:', error)
            setCategories([]) // Set to empty array in case of error
        }
    }

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`${server}/products`)
            if (Array.isArray(response.data.products)) {
                setAllProducts(response.data.products)
            } else {
                console.error('Unexpected API response structure:', response.data)
                setAllProducts([]) // Set to empty array if response is not as expected
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            setAllProducts([]) // Set to empty array in case of error
        }
    }

    const filters = useMemo(() => [
        {
            id: 'category',
            name: 'Category',
            options: categories.map(cat => ({ value: cat.category_name
                , label: cat.category_name })), // Use category name for value and label
        },
        {
            id: 'price',
            name: 'Price',
            options: [
                { value: '0-50', label: '$0 - $50' },
                { value: '50-100', label: '$50 - $100' },
                { value: '100-200', label: '$100 - $200' },
                { value: '200-1000000', label: '$200+' },
            ],
        },
    ], [categories]) // Recalculate when categories change

    const sortOptions = [
        // { name: 'Most Popular', value: 'popularity' },
        // { name: 'Best Rating', value: 'rating' },
        { name: 'Newest', value: 'newest' },
        { name: 'Price: Low to High', value: 'price_asc' },
        { name: 'Price: High to Low', value: 'price_desc' },
    ]

    const handleCategoryChange = (categoryName) => {
        setSelectedCategory(prevCategory => prevCategory === categoryName ? '' : categoryName) // Update with categoryName
    }

    const handlePriceChange = (range) => {
        setSelectedPriceRange(prevRange => prevRange === range ? '' : range)
    }

    const handleSortChange = (option) => {
        setSortOption(option)
    }

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...allProducts]

        // Apply category filter
        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory)
        }

        // Apply price filter
        if (selectedPriceRange) {
            const [min, max] = selectedPriceRange.split('-').map(Number)
            result = result.filter(product => product.price >= min && product.price <= max)
        }

        // Apply sorting
        switch (sortOption) {
            case 'popularity':
                result.sort((a, b) => b.popularity - a.popularity)
                break
            case 'rating':
                result.sort((a, b) => b.rating - a.rating)
                break
            case 'newest':
                result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                break
            case 'price_asc':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price_desc':
                result.sort((a, b) => b.price - a.price)
                break
            default:
                break
        }

        return result
    }, [allProducts, selectedCategory, selectedPriceRange, sortOption])

    return (
        <div className="bg-white">
            <Header />


            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4">
                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.name} className="border-t border-gray-200 pb-4 pt-4">
                                                {({ open }) => (
                                                    <fieldset>
                                                        <legend className="w-full px-2">
                                                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                                                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                      className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                      aria-hidden="true"
                                  />
                                </span>
                                                            </Disclosure.Button>
                                                        </legend>
                                                        <Disclosure.Panel className="px-4 pb-2 pt-4">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`${section.id}-${optionIdx}-mobile`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-secondary"
                                                                        />
                                                                        <label
                                                                            htmlFor={`${section.id}-${optionIdx}-mobile`}
                                                                            className="ml-3 text-sm text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </fieldset>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    {/*<div className="border-b border-gray-200 pb-10 pt-8">*/}
                    {/*    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Group Products</h1>*/}
                    {/*    <p className="mt-4 text-base text-gray-500">*/}
                    {/*        Buy a product cheaper with friends and family. Create or Join a Group, Add, Buy.*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    <div className="flex items-center justify-between pt-12">
                        <button
                            type="button"
                            className="inline-flex items-center lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="text-sm font-medium text-gray-700">Filters</span>
                            <FunnelIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                        </button>

                        <div
                            className="lg:block lg:ml-auto"> {/* Added hidden class and lg:ml-auto for right alignment */}
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort by
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
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
                                    <Menu.Items
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({active}) => (
                                                        <a
                                                            href="#"
                                                            onClick={() => handleSortChange(option.value)}
                                                            className={classNames(
                                                                option.value === sortOption ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>

                    <div className="pb-24 pt-6 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <aside>
                            <h2 className="sr-only">Filters</h2>

                            <div className="hidden lg:block">
                                <form className="space-y-10 divide-y divide-gray-200">
                                    {filters.map((section, sectionIdx) => (
                                        <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                                            <fieldset>
                                                <legend
                                                    className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                                <div className="space-y-3 pt-6">
                                                    {section.options.map((option) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`${section.id}-${option.value}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                checked={
                                                                    section.id === 'category'
                                                                        ? selectedCategory === option.value
                                                                        : selectedPriceRange === option.value
                                                                }
                                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-secondary"
                                                                onChange={() => section.id === 'category'
                                                                    ? handleCategoryChange(option.value)
                                                                    : handlePriceChange(option.value)
                                                                }
                                                            />
                                                            <label htmlFor={`${section.id}-${option.value}`}
                                                                   className="ml-3 text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        </aside>

                        <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                            <h2 id="product-heading" className="sr-only">
                                Products
                            </h2>

                            <div
                                className="grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                                {filteredAndSortedProducts.map((product) => (
                                    <SingleProduct key={product.id} productId={product.id}
                                                   productName={product.product_name}/>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>

                <Footer/>
            </div>
        </div>
    )
}