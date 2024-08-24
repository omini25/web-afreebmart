
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";



const values = [
    {
        name: 'Direct Connection',
        description:
            'We facilitate direct connections between suppliers, vendors, and consumers, promoting transparency and trust.',
    },
    {
        name: 'Quality Assurance',
        description:
            'We uphold strict quality standards to ensure that every product you purchase meets our freshness criteria.',
    },
    {
        name: 'Cost Efficiency',
        description:
            'By eliminating unnecessary markups, we offer cost-effective solutions, making fresh food accessible to all.',
    },
    {
        name: 'Community Empowerment',
        description:
            'Our feature that enables group buying fosters collaboration and support among users, benefiting local communities.',
    },
    {
        name: 'User-Friendly Experience',
        description:
            'Our platform is designed for ease of use, with intuitive navigation and secure payment options.',
    },

]

export default function AboutPage() {

    return (
        <div className="bg-white">

            <Header />
            <main className="isolate">
                {/* Hero section */}
                <div className="relative isolate -z-10">

                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                        Welcome To Afreebmart - Sow, Grow, Share: Freshness For All!
                                    </h3>
                                    <h6>About Us</h6>
                                    <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">

                                        Afreebmart is more than just a grocery store; it's a movement towards a fresher, more connected way of sourcing and enjoying food. Our tagline, "Sow, Grow, Share: Freshness for All," encapsulates our mission to bring suppliers, vendors, and consumers together on a platform that prioritizes transparency, quality, and community.
                                    </p>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl leading-8 text-gray-600">
                                    At Afreebmart, we believe in eliminating barriers and connecting you directly with the source of your food. Our primary objective is to empower suppliers and vendors by providing them with a platform to showcase their products and connect with consumers without the interference of middlemen. By doing so, we aim to reduce costs, increase visibility for agro-food sellers, and ensure that you receive the freshest and highest-quality food items.
                                </p>

                            </div>

                        </div>
                    </div>
                </div>


                {/* Values section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose
                            Afreebmart?</h2>

                    </div>
                    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {values.map((value) => (
                            <div key={value.name}>
                                <dt className="font-semibold text-gray-900">{value.name}</dt>
                                <dd className="mt-1 text-gray-600">{value.description}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mx-auto max-w-2xl lg:mx-0 mt-12">
                        <h5 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Join Us</h5>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Join the Afreebmart community today and be part of a movement that supports local agriculture, promotes sustainability, and brings fresh, healthy food options to your table. Sow, grow, and share with us at Afreebmart - where freshness is for all!
                        </p>
                    </div>
                </div>


            </main>

            <Footer/>
        </div>
    )
}
