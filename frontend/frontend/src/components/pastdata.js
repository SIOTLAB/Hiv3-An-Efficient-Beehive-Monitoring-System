import React, {useEffect,useState}  from "react";  
import ".././styles/PastData.css";
/*import { oldData } data, once we have the data*/
const PastData = () => {
    const [mlresults, setMlResults] = useState([]);

    const MLResults = async () => {
        fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/ml_info')
            .then(response => response.json())
            .then(data => setMlResults(data))
            .then(error => console.error('Error Fetching Data:', error));
        }
    useEffect(() => {
        MLResults()
    }, [])

    let content;

    if(mlresults === null) {
        content = <p>Loading...</p>;
    }
    else if(mlresults.length === 0)
    {
        content = <p>No data avaliable.</p>;
    }
    else
    {
        const recentResults = mlresults.slice(-20).reverse();
        content = (
            <ul>
                {recentResults.map((result, index) => (
                    <li key={index}>
                       In: {result.bee_in} Out: {result.bee_out}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className ="pastgrouped">
            <h1 className="pasttitle">Past Data</h1>
            <div className="pastbox">
                {content}
            </div>
        </div>
    )
}

export default PastData