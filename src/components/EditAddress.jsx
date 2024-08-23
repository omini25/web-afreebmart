import { useState } from 'react';

export function EditAddress({ onSubmit, initialAddress, onCancel}) {
    const [country, setCountry] = useState(initialAddress?.country || '');
    const [addressNumber, setAddressNumber] = useState(initialAddress?.address_number || '');
    const [street, setStreet] = useState(initialAddress?.street || '');
    const [city, setCity] = useState(initialAddress?.city || '');
    const [state, setState] = useState(initialAddress?.state || '');
    const [zipCode, setZipCode] = useState(initialAddress?.zip_code || '');
    const [isDefault, setIsDefault] = useState(initialAddress?.is_default || false);
    const usersId = initialAddress.id || '';

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const updatedAddressData = {
            country: country,
            address_number: addressNumber,
            street: street,
            city: city,
            state: state,
            zip_code: zipCode,
            is_Default: isDefault,

        };

        onSubmit(updatedAddressData, usersId);
    };


    return (
        <>
        <form onSubmit={handleFormSubmit} className="space-y-6 mx-3">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Add a new address</h2>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                            Country
                        </label>
                        <div className="mt-2">
                            <input
                                id="address"
                                name="country"
                                type="text"
                                autoComplete="address"
                                value="USA"
                                readOnly
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                            Address Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="address"
                                name="address"
                                type="text"
                                autoComplete="address number"
                                value={addressNumber}
                                onChange={(e) => setAddressNumber(e.target.value)}
                                placeholder={initialAddress?.address}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div className="col-span-full">
                        <label htmlFor="street"
                               className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                        </label>
                        <div className="mt-2">
                            <input
                                id="street"
                                name="street"
                                type="text"
                                autoComplete="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                placeholder={initialAddress?.street}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                                id="city"
                                name="city"
                                type="text"
                                autoComplete="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                        </label>
                        <div className="mt-2">
                            <input
                                id="state"
                                name="state"
                                type="text"
                                autoComplete="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                                id="postal-code"
                                name="zip_code"
                                type="text"
                                autoComplete="postal-code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-900/10 pb-4">


                <div className="mt-5 space-y-10">
                    <fieldset>
                        <div className="mt-6 space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="is-default"
                                        name="is_default"
                                        type="checkbox"
                                        checked={isDefault}
                                        onChange={(e) => setIsDefault(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="is-default" className="font-medium text-gray-900">
                                        Set as main address
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </div>


            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    Save
                </button>
            </div>
        </form>

        </>
    )
        ;
}