-- Original Tables
-- DROP TABLE IF EXISTS listings_details;
-- DROP TABLE IF EXISTS calendar;
-- DROP TABLE IF EXISTS reviews_details;

-- Transformed Tables
DROP TABLE IF EXISTS rw_listings;
DROP TABLE IF EXISTS rw_listings_by_roomtype;
DROP TABLE IF EXISTS rw_listings_by_propertytype;
DROP TABLE IF EXISTS rw_top_propertytypes;
DROP TABLE IF EXISTS rw_highest_priced_neighbourhoods;
DROP TABLE IF EXISTS rw_listings_by_neighbourhood;

CREATE TABLE rw_listings (
    id INT PRIMARY KEY,
    latitude INT NOT NULL,
    longitude INT NOT NULL,
    neighbourhood_cleansed VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL, 
    property_type VARCHAR(30) NOT NULL,
    room_type VARCHAR(30) NOT NULL,
    accomodates INT, 
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    price DECIMAL NOT NULL,
    host_since DATE NOT NULL,
    host_is_superhost BOOLEAN NOT NULL,
    guests_included INT NOT NULL,
    minimum_nights INT NOT NULL,
    number_of_reviews INT NOT NULL,
    review_scores_rating INT NOT NULL,
    instant_bookable BOOLEAN NOT NULL,
    cancellation_policy VARCHAR(30) NOT NULL
);

CREATE TABLE rw_listings_by_roomtype (
    roomtype VARCHAR(30) NOT NULL,
    listings INT NOT NULL,
	percent DECIMAL NOT NULL
);

CREATE TABLE rw_listings_by_propertytype (
    propertytype VARCHAR(30) NOT NULL,
    listings INT NOT NULL,
	percent DECIMAL NOT NULL
);

CREATE TABLE rw_top_propertytypes (
    propertytype VARCHAR(30) NOT NULL,
    listings INT NOT NULL
);

CREATE TABLE rw_highest_priced_neighbourhoods (
    neighbourhood VARCHAR(50) NOT NULL,
    avgprice DECIMAL NOT NULL
    );

CREATE TABLE rw_listings_by_neighbourhood (
    neighbourhood VARCHAR(50) NOT NULL,
    listings INT NOT NULL,
    avgprice DECIMAL NOT NULL,
    avgrating DECIMAL NOT NULL
);


