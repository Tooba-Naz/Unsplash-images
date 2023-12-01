import React from 'react';
import { connect } from 'react-redux';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const NewCollection = ({ collection }) => {
  return (
    <div className='bg-gray-200'>
      <h1 className='flex items-center justify-center text-lg font-bold py-6 bg-gray-500'>New Collection</h1>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {collection.map((image, index) => (
            <div key={index} className="my-masonry-grid_column">
              <img src={image.url} alt={`Image ${index}`} className='pt-9 px-4' />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    collection: state.imageReducer.collection,
  };
};

export default connect(mapStateToProps)(NewCollection);
