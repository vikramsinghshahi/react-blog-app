import { Link } from "react-router-dom";

function Home()
{
    return (
        <main className="bg-gray-50">
            <div className="text-center p-12 bg-gray-300 h-5/6">
                <h2 className="text-5xl font-bold mb-10 text-gray-700">Welcome to Alt Blog</h2>
                <Link to="/articles">
                    <button className="btn btn-primary">View Articles</button>
                </Link>
            </div>
        </main>

    )
}

export default Home;