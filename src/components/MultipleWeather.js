import Loader from "./Loader";
import { getFormatTime } from "../utils";
import { Fragment } from "react";

const MultipleWeather = (props) => {

    const { 
        isLoading, 
        multipleAPI,
    } = props;

    return (
        <>
            { isLoading ? (<Loader />) : ( 
                <div className="container my-5">
                    <div className="row">
                        <div className="col-12">
                            <h3>Multiple</h3>
                            {multipleAPI.data.list.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <p>City: {item.name}</p>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default MultipleWeather;
