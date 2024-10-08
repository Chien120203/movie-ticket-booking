import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <>
            <div className="flex items-center justify-center w-screen h-screen gap-14">
                <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                    <h1 className="font-bold text-blue-600 text-9xl">404</h1>
                    <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Oops!</span> Page{" "}
                    </p>
                    <p className="mb-8 text-center text-gray-500 md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Link
                        to="/"
                        className="px-5 py-2 rounded-md text-blue-100 bg-blue-600 hover:bg-blue-700"
                    >
                        Go home
                    </Link>
                </div>
                <div className="mt-4 w-72">
                    <img
                        src="https://picsum.photos/200"
                        className="w-full"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
};
