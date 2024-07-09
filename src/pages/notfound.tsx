import { Link } from 'react-router-dom';

function Notfound() {
    return (
        <div className="flex items-center justify-center h-screen sm-[250px] md-[250px] ">
        <div className="card bg-neutral text-neutral-content w-[550px] shadow-inner">
            <div className="card-body items-center text-center justify-self-start">
                <h2 className="card-title text-9xl">404! </h2>
                <h2 className="card-title text-4xl">Page Not Found</h2>
                <Link to={'/'} className='btn border-neutral-600 mt-5'>Return to home page</Link>
                <i className='fa-regular fa-face-angry '></i>
            </div>
        </div>
    </div>  
    
    )
}

export default Notfound
