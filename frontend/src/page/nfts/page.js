import React, { useState } from 'react';

const NFTs = () => {
    const [currentNFTIndex, setCurrentNFTIndex] = useState(0);
    const nfts = [
        { id: 1, imageUrl: 'https://example.com/nft1.png', name: 'CryptoPunk #1' },
        { id: 2, imageUrl: 'https://example.com/nft2.png', name: 'CryptoPunk #2' },
        { id: 3, imageUrl: 'https://example.com/nft3.png', name: 'CryptoPunk #3' }
    ];

    const handleNext = () => {
        setCurrentNFTIndex((prevIndex) => (prevIndex + 1) % nfts.length);
    };

    const handlePrevious = () => {
        setCurrentNFTIndex((prevIndex) => (prevIndex - 1 + nfts.length) % nfts.length);
    };

    return (
        <div className="flex items-center justify-center px-4 py-10 h-full bg-gray-900">
            <div className="flex flex-col md:flex-row items-center justify-center w-96 md:max-w-4xl">
                {nfts.length > 0 ? (
                    <>
                        <button onClick={handlePrevious} className="md:hidden text-4xl text-white px-4 py-2">
                            &#8592;
                        </button>
                        <div className="flex-grow flex-shrink-0 max-w-sm md:flex md:items-center">
                            <button onClick={handlePrevious} className="hidden md:inline-flex md:text-4xl text-white px-4 py-2">
                                &#8592;
                            </button>
                            <img src={nfts[currentNFTIndex].imageUrl} alt={nfts[currentNFTIndex].name} className="block mx-auto w-full h-auto" />
                            <button onClick={handleNext} className="hidden md:inline-flex md:text-4xl text-white px-4 py-2">
                                &#8594;
                            </button>
                        </div>
                        <button onClick={handleNext} className="md:hidden text-4xl text-white px-4 py-2">
                            &#8594;
                        </button>
                    </>
                ) : (
                    <div className="text-white text-center w-full">
                        No images available
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTs;
