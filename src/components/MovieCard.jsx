import React from 'react'

function MovieCard({ Loading, AllmovieData }) {
    return (
        <div>

            {Loading ? <div className='flex justify-center '>
                <img className=' w-16 py-20' src="https://i.gifer.com/ZZ5H.gif" alt="loading......" />
            </div>
                :
                <div className=' flex flex-wrap px-4 lg:px-10 '>
                    {AllmovieData.map((item, index) => {
                        const { Title, Year, Poster } = item;
                        return (
                            <div key={index} className="p-2 md:w-1/4 sm:w-full">
                                <div className="bg-[#392938] p-3 rounded-2xl shadow-lg hover:-translate-y-1 border-2 border-gray-600">
                                    <img className='rounded-lg w-full mb-2' src={Poster} alt="" />
                                    <h2 className='text-xl text-white font-bold'>{Title}</h2>
                                    <h2 className='text-lg text-white mb-2'>{Year}</h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default MovieCard
