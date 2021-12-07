import '../stylesheets/loader.css';

function FullPageLoader()
{
    return (
        <div className="flex justify-center p-5 h-screen items-center">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
export default FullPageLoader;