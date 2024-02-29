import { TailSpin } from "react-loader-spinner";
import "./loader.css"; 

const LoaderComp = () => {
    return (
        <div className="loader-container"> 
            <TailSpin
                height={40}
                width={40}
                color="#666"
                ariaLabel="tail-spin-loading"
                radius={1}
                visible={true}
            />
        </div>
    );
};  
export default LoaderComp;
