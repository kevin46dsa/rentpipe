import React from 'react';
import BackgroundCSL from './Carousel';
import {
	
	getDocs,
	
  } from "firebase/firestore";
  import { useEffect } from "react";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import ListingItem from "../Listingitem/Listingitem.jsx";
  //import Slider from "../components/Slider";
  import { db } from "../../firebase";
  import queries from '../../query';

const Homepage = () => {
	const [offerListings, setOfferListings] = useState(null);
	const [rentListings, setRentListings] = useState(null);
	const [saleListings, setSaleListings] = useState(null);

	const cleanData = (array)=>{
		const listings = [];
			array.forEach((doc) => {
			  return listings.push({
				id: doc.id,
				data: doc.data(),
			  });
			});
			return listings
	}

	useEffect(() => {
		async function fetchListings() {
		  try {
			
			
			// execute the query
			const querySnapSale = await getDocs(queries.saleListingQuery);
			const querySnapRent = await getDocs(queries.rentListingQuery);
			const querySnapOffer = await getDocs(queries.offerListingQuery);
			
			//Calling the clean function for all the data
			const saleListing = cleanData(querySnapSale)
			const rentListing = cleanData(querySnapRent)
			const offerListing = cleanData(querySnapOffer)
			
			setOfferListings(offerListing)
			setRentListings(rentListing)
			setSaleListings(saleListing);
		  } catch (error) {
			console.log(error);
		  }
		}
		fetchListings();
	  }, []);
	
	return (
		<>	
			<BackgroundCSL/>
			{/*Slider  */}

			
			{offerListings && offerListings.length > 0 && (
          <div>
            <h2>Recent offers</h2>
            <Link to="/offers">
              <p>
                Show more offers
              </p>
            </Link>
            
			<ListingItem
                  data={offerListings}
				  from="HOMEPAGE"
                />
            
          </div>
        )}
		
        {rentListings && rentListings.length > 0 && (
          <div >
            <h2 >Places for rent</h2>
            <Link to="/category/rent">
              <p>
                Show more places for rent
              </p>
            </Link>
            <ListingItem
                  data={rentListings}
				  from="HOMEPAGE"
                />
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
             <div >
			 <h2 >Places for sale</h2>
			 <Link to="/category/rent">
			   <p>
				 Show more places for sale
			   </p>
			 </Link>
			 <ListingItem
				   data={saleListings}
				   from="HOMEPAGE"
				 />
		   </div>
		 )}


		

		</>
	);
};

export default Homepage;
