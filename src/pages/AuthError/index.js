import ImageAuth from '../../Image/components/error.jpg';
import { ImgAuth, BtnAuth, ErrorDiv } from "./PageAuth.styled.js";
import { Link } from 'react-router-dom';


const Page404 = () => {

    return (
        <ErrorDiv>
            <Link to="/login"><BtnAuth>back</BtnAuth></Link>
            <ImgAuth src={ImageAuth} alt="404" />
        </ErrorDiv>
    )
}

export default Page404;