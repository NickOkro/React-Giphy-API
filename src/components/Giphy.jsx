import React, {useEffect, useState} from "react";
import axios from 'axios';
import Loader from "./Loader";
import Error from "./Error";
import Pagiantion from "./Pagiantion";
const Giphy = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");

    const [itemsPerPage, setItemPerPage] = useState(15);
    const [currentPage,setCurrentPage] = useState(1);

    let lastItemIndex = itemsPerPage * currentPage;
    let firstItemIndex = lastItemIndex - itemsPerPage;
    let slicedData = data.slice(firstItemIndex,lastItemIndex);
    useEffect(() => {
            const fetchData = async () => {
                setIsError(false);
                setIsLoading(true);
                try {
                    const result = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: 'QDS24qjsurxTibmUHAAImXKrNygWtba5',
                        limit: 99
                    }
                })
                setData(result.data.data);
                } catch (error) {
                    setIsError(true);
                }
                setIsLoading(false);
            }
            fetchData();
        
    }, [])

    const changePage = (page) => {
        setCurrentPage(page)
    }

    const renderGifs = () => {
        if(isLoading){
            return <Loader/>
        }
        else {
            return (
                <>
                {
                    slicedData.length > 0 ?
                    slicedData.map(gif => {
                        return <div key={gif.id} className="gif">
                            <img src={gif.images.fixed_height.url} alt={gif.title} />
                        </div>
                    })
                    :
                    <div><h1 >No Gifs :&#40;</h1></div>
                }
                </>
            )
        }
    }

    const handleSearchChange = event => {
        setSearch(event.target.value)
    }

    const handleSearchClick = async event => {
        event.preventDefault()
        setCurrentPage(1)
        setIsLoading(true)
            try {
                const results = await axios("https://api.giphy.com/v1/gifs/search",
                {
                    params:{
                        api_key:"QDS24qjsurxTibmUHAAImXKrNygWtba5",
                        q:search,
                }}
                )
                setData(results.data.data);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
    }

    

    return (
        <section className="m-2">
            <form className="container search-form">
                <input 
                type="text" 
                className="search-inp form-control" 
                placeholder="search"
                onChange={handleSearchChange}
                value={search}/>
                <button 
                onClick={handleSearchClick}
                type="submit" 
                className="search-btn btn btn-primary mx-2" >
                    Search
                </button>
            </form>
            <Pagiantion totalItems={data} currentPage={currentPage} itemsPerPage={itemsPerPage} changePage={changePage}/>
            <div className="container gifs">
                {
                    isError ? <Error/> : 
                    renderGifs()
                }
            </div>
        </section>
        )
}

export default Giphy;