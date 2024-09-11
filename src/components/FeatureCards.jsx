import footer1 from '../assets/images/footer/footer-icon-1.svg';
import footer2 from '../assets/images/footer/footer-icon-3.svg';
import footer3 from '../assets/images/footer/footer-icon-5.svg';
import footer4 from '../assets/images/footer/footer-icon-6.svg';

const features = [
    {
        icon: footer1,
        title: 'Daily Surprise Offers',
        text: 'Save up to 25% off.',
    },
    {
        icon: footer2,
        title: 'Affordable Prices',
        text: 'Get vendors direct price.',
    },
    // {
    //     icon: footer3,
    //     title: 'Heading 3',
    //     text: 'Some descriptive text for heading 3.',
    // },
    {
        icon: footer4,
        title: 'Direct Shipping',
        text: 'For all orders.',
    },
];

export function FeatureCards() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-wrap justify-center">
                {features.map((feature, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                            <img src={feature.icon} alt={`${feature.title} icon`} className="h-12 w-12 mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="text-gray-600">{feature.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}