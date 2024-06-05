import React, {useEffect,useState}  from "react"; 
import ".././styles/CurrentCount.css";
const Currentcount = () => {
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
        const last = mlresults[mlresults.length - 1]
        content = <p>In: {last.bee_in} Out: {last.bee_out} </p>;
    }

    return (
        <div class ="currentgrouped">
            <div class="currentbox">
                <h1>Most Recent:</h1>
                <h1 className="currentp1">{content}</h1>
            </div>
        </div>
    )
}

export default Currentcount