import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import abouthero from "../../assets/images/landing/about.jpg";



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

                <div className="bg-white">
                    <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-24">
                        <div className="mx-auto max-w-7xl px-6   lg:px-8">
                            <div
                                className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
                                {/* Text content */}
                                <div>
                                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        Afreebmart
                                    </h1>
                                    <div className="mt-6 max-w-xl">
                                        <p className="text-lg leading-8 text-gray-600">
                                            Afreebmart is more than just a grocery store; it's a movement towards a fresher,
                                            more connected way of sourcing and enjoying food. Our tagline, "Sow, Grow,
                                            Share: Freshness for All," encapsulates our mission to bring suppliers, vendors,
                                            and consumers together on a platform that prioritizes transparency, quality, and
                                            community.
                                        </p>
                                    </div>
                                </div>
                                {/* Image */}
                                <div className="mt-10 sm:mt-16 lg:mt-0">
                                    <img
                                        src={abouthero}
                                        alt=""
                                        className="aspect-[6/5] w-full max-w-lg rounded-2xl object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="mx-auto mt-12 max-w-7xl px-6  lg:px-8 xl:mt-16 ">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl leading-8 text-gray-600">
                                    We are on a mission to eliminate all barriers and connect you directly with
                                    the source of your food. Our primary objective is to empower suppliers and vendors
                                    by providing them with a platform to showcase their products and connect with
                                    consumers without the interference of middlemen. By doing so, we aim to reduce
                                    costs, increase visibility for agro-food sellers, and ensure that you receive the
                                    freshest and highest-quality food items.
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
                            Join the Afreebmart community today and be part of a movement that supports local
                            agriculture, promotes sustainability, and brings fresh, healthy food options to your table.
                            Sow, grow, and share with us at Afreebmart - where freshness is for all!
                        </p>
                    </div>
                </div>


            </main>


            <Footer/>
        </div>
    )
}
