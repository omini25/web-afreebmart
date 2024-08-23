import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";



export default function NotFound() {

    return (
        <>

            <div className="flex min-h-full flex-col">
                <Header />

                <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
                    <p className="text-base font-semibold leading-8 text-primary">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page or Product not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page or product you’re looking for.</p>
                    <div className="mt-10">
                        <a href="/" className="text-sm font-semibold leading-7 text-primary">
                            <span aria-hidden="true">&larr;</span> Back to home
                        </a>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
}
