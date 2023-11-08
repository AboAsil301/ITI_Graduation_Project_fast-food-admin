import Image404 from '../../Image/components/404.jpg';
import { Img404, Btn404 } from "./Page404.styled.js";
import { Link } from 'react-router-dom';


const Page404 = () => {
    return (
        <div className='container d-flex justify-content-center'>
            <Link to="/panel/dashboard"><Btn404>back</Btn404></Link>
            <Img404 src={Image404} alt="404" />
        </div>
    )
}

export default Page404;