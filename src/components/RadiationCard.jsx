import React from 'react';

const RadiationCard = ({ data }) => {
    const {
        Temperature = 'N/A',
        Humidity = 'N/A',
        Cps = 'N/A',
        uSv = 'N/A',
    } = data || {};

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-[70%] overflow-hidden">
            <div className="p-12">
                <h2 className="text-4xl font-bold text-center mb-6">Radiation Data</h2>
                <h3 className='text-xl text-center mb-6'>Data update every 5 second</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-xl font-semibold text-gray-600 mb-2">Temperature</span>
                        <div className='flex flex-row items-end'>
                            <span className="text-5xl font-bold text-primary">{Temperature}</span>
                            <span className="text-base text-gray-500 mt-1 ">°C</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-xl font-semibold text-gray-600 mb-2">Humidity</span>
                        <div className='flex flex-row items-end'>
                            <span className="text-5xl font-bold text-primary">{Humidity}</span>
                            <span className="text-base text-gray-500 mt-1">%</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-xl font-semibold text-gray-600 mb-2">CPS</span>
                        <div className='flex flex-row items-end'>
                            <span className="text-5xl font-bold text-primary">{Cps}</span>
                            <span className="text-base text-gray-500 mt-1">counts/s</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-xl font-semibold text-gray-600 mb-2">µSv/h</span>
                        <div className='flex flex-row items-end'>
                            <span className="text-5xl font-bold text-primary">{uSv}</span>
                            <span className="text-base text-gray-500 mt-1">µSv/h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadiationCard;
