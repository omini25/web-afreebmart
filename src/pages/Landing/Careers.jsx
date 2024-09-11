import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import carerhero from "../../assets/images/landing/carer.jpg"
import abouthero from "../../assets/images/landing/about.jpg";


export function Careers() {
    return (
        <>
            <Header/>

            <div className="bg-white">
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-24">
                    <div className="mx-auto max-w-7xl px-6   lg:px-8">
                        <div
                            className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
                            {/* Text content */}
                            <div>
                                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Join Afreebmart: Grow With Us
                                </h1>
                                <div className="mt-6 max-w-xl">
                                    <p className="text-lg leading-8 text-gray-600">
                                        Welcome to Afreebmart Careers, where we believe in cultivating talent and fostering
                                        a culture of growth and innovation. As a leading player in revolutionizing the
                                        agricultural food industry, we're on a mission to connect suppliers, vendors, and
                                        consumers directly, paving the way for a fresher and more sustainable future. If
                                        you're passionate about making a meaningful impact and being part of a collaborative
                                        team, explore our current opportunities below and embark on a rewarding career
                                        journey with Afreebmart.
                                    </p>
                                </div>
                            </div>
                            {/* Image */}
                            <div className="mt-10 sm:mt-16 lg:mt-0">
                                <img
                                    src={carerhero}
                                    alt=""
                                    className="aspect-[6/5] w-full max-w-lg rounded-2xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">

                    <h4 className="text-2xl font-bold mb-2">Why Choose Afreebmart?</h4>

                    <h2 className="text-2xl font-bold mb-2">Innovative Environment</h2>
                    <p className="mb-4">
                        We thrive on creativity and encourage out-of-the-box thinking. Your ideas and contributions are
                        valued and can shape the future of our industry.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">Career Growth</h2>
                    <p className="mb-4">
                        Afreebmart is committed to your professional development. We offer continuous learning
                        opportunities, mentorship programs, and career advancement paths.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">Diverse and Inclusive Culture</h2>
                    <p className="mb-4">We embrace diversity in all its forms and foster an inclusive environment where
                        everyone feels respected, valued, and empowered.</p>


                    <h2 className="text-2xl font-bold mb-2">Impactful Work</h2>
                    <p className="mb-4">

                        Join us in making a difference. Your work at Afreebmart directly impacts vendors, suppliers,
                        consumers, and the environment, contributing to a more sustainable and efficient food ecosystem.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">How To Apply</h2>
                    <p className="mb-4">
                        To apply for a position or express your interest in working with us, please send your resume and
                        a cover letter highlighting your relevant experience, skills, and enthusiasm for joining
                        Afreebmart to info@afreebmart.com. Be sure to specify the position you're applying for in the
                        subject line of your email.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">Join Us in Transforming the Future of Food</h2>
                    <p className="mb-4">
                        At Afreebmart, we're not just offering jobs; we're inviting you to be part of a mission-driven
                        organization that is reshaping the way we think about food and sustainability. Join us in
                        creating a brighter and fresher future for generations to come. We look forward to welcoming you
                        to the Afreebmart family! </p>

                </div>
            </div>

            <Footer/>
        </>
    )
}