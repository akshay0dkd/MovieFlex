import React from 'react'

function MovieCard({ Loading, AllmovieData }) {
    return (
        <div>

            {Loading ? <div className='flex justify-center'>
                <img className='py-20 w-16' src="https://i.gifer.com/ZZ5H.gif" alt="loading......" />
            </div>
                :
                <div className='flex flex-wrap px-4 lg:px-10'>
                    {AllmovieData.map((item, index) => {
                        const { Title, Year, Poster } = item;
                        return (
                            <div key={index} className="p-2 sm:w-full md:w-1/4">
                                <div className="bg-[#392938] shadow-lg p-3 border-2 border-gray-600 rounded-2xl hover:-translate-y-1">
                                    <img className='mb-2 rounded-lg w-full' src={Poster} alt=" Opps....Poster does'nt found" />
                                    <h2 className='font-bold text-white text-xl'>{Title}</h2>
                                    <h2 className='mb-2 text-white text-lg'>{Year}</h2>
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
