import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const features = [
    {
        name: 'Market Expansion',
        description:
            'Seamlessly expand your reach and showcase your products to a diverse audience eager for top-notch food items.',
    },
    {
        name: 'Revenue Growth',
        description:
            'Experience a surge in sales and revenue as you tap into a thriving marketplace with high demand for quality products.',

    },
    {
        name: 'Streamlined Management',
        description:
            'Effortlessly manage your inventory, orders, and payments through our intuitive seller dashboard, designed for your convenience.',

    },
    {
        name: 'Strategic Promotion',
        description:
            'Benefit from targeted marketing initiatives that spotlight your brand, driving traffic and boosting your sales potential.',

    },

    {
        name: 'Tailored Shipping Solutions',
        description:
            'Enjoy flexible shipping options tailored to your business needs, ensuring efficient and reliable delivery to your customers.',

    },

    {
        name: 'Quality Assurance',
        description:
            'Rest easy knowing that your products are held to rigorous quality standards, guaranteeing customer satisfaction with every purchase.',

    },
    {
        name: 'Dedicated Support',
        description:
            'Access dedicated support from our team, ready to assist you with any inquiries or challenges you may encounter along the way.',

    },
]

export function VendorGuide() {
    return (
        <>

            <Header/>

            <div className="relative isolate pt-7">

                <div className="py-24 sm:py-32 lg:pb-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                SELL WITH AFREEBMART – YOUR GATEWAY TO A THRIVING MARKET!
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Discover the power of Afreebmart's seller platform, designed to elevate your business
                                and connect you with a vast network of food-loving customers. Here's why partnering with
                                us is the right choice for your brand:
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 text-center">
                            {features.map((feature) => (
                                <div key={feature.name}
                                     className="flex flex-col border-2 border-gray-300 rounded-lg py-4 px-3">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 justify-center">
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Join forces with Afreebmart today and unlock a world of opportunities to grow your business and
                    captivate a loyal customer base. Sign up now to embark on a journey towards success with Afreebmart's dynamic seller community!
                </p>
            </div>

            <Footer/>
        </>
    )
}