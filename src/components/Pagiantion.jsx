import React from 'react'

export default function Pagiantion({totalItems, currentPage, itemsPerPage, changePage}) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalItems.length/itemsPerPage); i++) {
        pages.push(i);
        console.log(pages)
    }

  return (   
    <nav className='container pagination justify-content-center'>
        <ul>
            {
                pages.map(page => {
                    if(page===currentPage) return <li className='btn-danger btn page-btn'>{page}</li>
                    else return <li onClick={() => changePage(page)} className='btn page-btn btn-light'>{page}</li>
                })
            }
        </ul>
    </nav>
  )
}
