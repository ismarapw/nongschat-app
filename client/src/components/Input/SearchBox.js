
function SearchBox ({searchHandler, placeholder}) {
    return (
        <div className='bg-slate-200 w-full rounded-lg'>
            <i class="ri-search-line text-xl ml-3"></i>
            <input onChange={searchHandler} placeholder={placeholder} className='px-4 py-2 bg-transparent outline-none text-sm w-5/6' />
        </div> 
    )
}

export default SearchBox;