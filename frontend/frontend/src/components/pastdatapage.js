import React from "react";  
import ".././styles/pastdatapage.css";
/*import { oldData } data, once we have the data*/
const PastDatapage = () => {

    return (
        <div class="data">
            <div class="datatable">
                <h1 classs="datatitle">Data Table</h1>
                <div class="dtable"></div>
            </div>
            <div class ="pastgrouped">
                <h1 class="pasttitle">Recently Added</h1>
                <div class="pastbox">
                </div>
            </div>
        </div>
    )
}

export default PastDatapage