import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link,useNavigate,usehistory } from 'react-router-dom';
export default function Homepage() {

     const [coins,setCoins]=useState([])
     const [filtercoins,setFilterCoins]=useState([])
     const navigate=useNavigate()
     useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
          .then(res => res.json())
          .then(data => {

            setCoins(data);
            setFilterCoins(data)
          }).catch(err => console.log(err));
      },);
     const handlechange=(coin)=>{

        setFilterCoins(coins.filter(coin1 =>
            coin1.name.toLowerCase().includes(coin.toLowerCase())))

     } 
  return (
    <div class='bg-black text-white'>
       
       <div className='fixed '>
    <h1 className=' text-2xl md:text-3xl text-white mt-4 '>Crypto Hunter</h1>
</div>

        <div className=''> <h1 className='text-2xl md:text-3xl font-bold text-center pt-4'>Search a currency</h1></div>
        <form class="flex items-center max-w-sm mx-auto mt-5" >   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           
        </div>
        <input type="text" id="simple-search" onChange={(e)=>handlechange(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>


<div class=' flex flex-col mt-6'>
    <div class='flex flex-col'>
        {
            filtercoins.map((coin) => {
                return (
                    <div key={coin.id}>
                       <div className='flex flex-row justify-center mt-5'>
                        <div className='w-12'>
                        <img src={coin.image} style={{height:"30px",width:"30px"}}/>
                        </div>
                        <div className='w-64 mx-5 '>
                        <button onClick={()=>navigate('/trade', { state: { coin:coin } })}>{coin.name}</button>
                        </div>
                        <div className='w-64 mx-5 md:mx-0'>
                            ${coin.current_price}
                        </div>
                        <div className='w-64'>
                        ${coin.total_volume}
                        </div>
                        <div className='w-64 mx-5 md:mx-0'>
                        {coin.price_change_percentage_24h < 0 ? (
                                            <span className="text-red-500">{coin.price_change_percentage_24h}%</span>
                                        ) : (
                                            <span className="text-green-500">{coin.price_change_percentage_24h}%</span>
                                        )}
                            </div>
                            <div class='w-64 invisible md:visible'>
    Mkt_Cap {coin.market_cap}
</div>

                        </div>

                    </div>
                );
            })
        }
    </div>
</div>

</div>

    
  )
}
