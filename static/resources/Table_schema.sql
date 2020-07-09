-- Original Tables
-- DROP TABLE IF EXISTS listings_details;
-- DROP TABLE IF EXISTS calendar;
-- DROP TABLE IF EXISTS reviews_details;

-- Transformed Tables
DROP TABLE IF EXISTS alllistings;
DROP TABLE IF EXISTS roomtypes;
DROP TABLE IF EXISTS propertytypes;
DROP TABLE IF EXISTS toppropertytypes;
DROP TABLE IF EXISTS hoodlistings;
DROP TABLE IF EXISTS hoodprices;
DROP TABLE IF EXISTS hoodratings;
DROP TABLE IF EXISTS neighbourhoodsummary;


CREATE TABLE alllistings (
    id INT PRIMARY KEY,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    neighbourhood_cleansed INT NOT NULL,
    city VARCHAR(30) NOT NULL,
    property_type VARCHAR(30) NOT NULL,
    room_type VARCHAR(30) NOT NULL,
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

CREATE TABLE roomtypes (
    roomtype VARCHAR(30) PRIMARY KEY,
    listings INT NOT NULL
);

CREATE TABLE propertytypes (
    propertytype VARCHAR(30) PRIMARY KEY,
    listings INT NOT NULL
);

CREATE TABLE toppropertytypes (
    propertytype VARCHAR(30) PRIMARY KEY,
    listings INT NOT NULL
);

CREATE TABLE hoodlistings (
    neighbourhood INT PRIMARY KEY,
    listings INT NOT NULL
    );

CREATE TABLE hoodratings (
    neighbourhood INT PRIMARY KEY,
    avgrating DECIMAL NOT NULL
    );
	
CREATE TABLE hoodprices (
    neighbourhood INT PRIMARY KEY,
    avgprice DECIMAL NOT NULL
    );
	
CREATE TABLE neighbourhoodsummary (
    neighbourhood INT PRIMARY KEY,
    listings INT NOT NULL,
    avgprice DECIMAL NOT NULL,
    avgrating DECIMAL NOT NULL
);


