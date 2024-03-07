import { MagnifyingGlass } from "react-loader-spinner";
import "./loader.css"; 

const LoaderComp = () => {
    return (
        <div className="loader-container"> 
            <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#3498db"
            />
        </div>
    );
};  
export default LoaderComp;
