##########################################
# Flask Application
##########################################

# Dependencies and Setup
import os
from os import environ

import pandas as pd
import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, url_for
from flask_sqlalchemy import SQLAlchemy

##########################################
# Flask Set up
##########################################
app = Flask(__name__)

##########################################
# Database Connection Set up
##########################################

# Setup SQLAlchemy with flask
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL', '')
db = SQLAlchemy(app)

# Create engine
conn_str = "postgres://jngclzmcgbofnm:226e0e08a5d686ad2b3932b64fb783f8d0cc221311aa0862b16ad70bc5a6a5ec@ec2-34-233-226-84.compute-1.amazonaws.com:5432/d8jm8bn39mr3qe"
engine = create_engine(conn_str)

# # # Create session
# session = Session(engine)

# Save references to each transformed data table 
# Listings = Base.classes.rw_listings

# Listings_by_roomtype = Base.classes.rw_listings_by_roomtype

# Listings_by_propertytype = Base.classes.rw_listings_by_propertytype

# Top_propertytypes = Base.classes.rw_top_propertytypes

# Highest_priced_neighbourhoods = Base.classes.rw_highest_priced_neighbourhoods

# Listings_by_neighbourhood = Base.classes.rw_listings_by_neighbourhood


###################################################################
# SET FLASK ROUTES
###################################################################

######################################################
# Render the Index HTML on the main route
######################################################
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

#######################################################
# Render the Database table Listings Details
#######################################################
@app.route("/cleanlistings")
def cleanlistings():
    """Query the database for listings details table."""
    # Reflect the database 
    Base = automap_base()

    # Reflect the tables
    Base.prepare(engine, reflect=True)

    # Create session
    session = Session(bind=engine)
    
    # Save references to transformed data table 
    Listings = Base.classes.rw_listings
    
    # Query the table for columns of interest
    listings = session.query(Listings).all()
    
    # Create a list of dictionaries for each column
    listings_details = []
    for listing in listings:
        listings_dict = {}
        listings_dict["id"] = listing.id
        listings_dict["latitude"] = listing.latitude
        listings_dict["longitude"] = listing.longitude
        listings_dict["neighbourhood"] = listing.neighbourhood_cleansed
        listings_dict["city"] = listing.city
        listings_dict["zipcode"] = listing.zipcode
        listings_dict["property_type"] = listing.property_type
        listings_dict["room_type"] = listing.room_type
        listings_dict["bedrooms"] = listing.bedrooms
        listings_dict["bathrooms"] = listing.bathrooms
        listings_dict["price"] = listing.price
        listings_dict["host_since"] = listing.host_since
        listings_dict["host_is_superhost"] = listing.host_is_superhost
        listings_dict["guests_included"] = listing.guests_included
        listings_dict["minimum_nights"] = listing.minimum_nights
        listings_dict["number_of_reviews"] = listing.number_of_reviews
        listings_dict["review_scores_rating"] = listing.review_scores_rating
        listings_dict["instant_bookable"] = listing.instant_bookable
        listings_dict["cancellation_policy"] = listing.cancellation_policy
        listings_details.append(listings_dict)
    
    session.close()
    # Return the json
    return jsonify(listings_details)
#######################################################
# Render the Database table Listings by Property Type
#######################################################
@app.route("/properties")
def properties():
    """Query the database for listings by property type"""
    # Reflect the database 
    Base = automap_base()

    # Reflect the tables
    Base.prepare(engine, reflect=True)

    # Create session
    session = Session(bind=engine)
    
    # Save references to the data table 
    Propertytypes = Base.classes.rw_listings_by_propertytype
    
    # Query the table for columns of interest
    propertytypes = session.query(Propertytypes).all()
    
    # Create a list of dictionaries
    property_types = []
    for listing in propertytypes:
        ptypes_dict = {}
        ptypes_dict["propertytype"] = listing.propertytype
        ptypes_dict["listings"] = listing.listings
        ptypes_dict["percent"] = listing.percent
        property_types.append(ptypes_dict)
    
    session.close()

    return jsonify(property_types)

#######################################################
# Render the Database table Listings by Room Type
#######################################################
# @app.route("/rooms")
# def rooms():
#     """Query the database for listings by property type"""
#     # Create session
#     session = Session(bind=engine)
    
#     # Save references to the data table 
#     Roomtypes = Base.classes.rw_listings_by_roomtype
    
#     # Query the table for columns of interest
#     roomtypes = session.query(Roomtypes).all()
    
#     # Create a list of dictionaries
#     room_types = []
#     for listing in roomtypes:
#         rtypes_dict = {}
#         rtypes_dict["propertytype"] = listing.roomtype
#         rtypes_dict["listings"] = listing.listings
#         rtypes_dict["percent"] = listing.percent
#         rtypes_dict.append(rtypes_dict)
    
#     session.close()

#     return jsonify(room_types)

#######################################################
# Render the Dashboard HTML 
#######################################################
@app.route("/dashboard")
def dashboard():
    """Return the Dashboard page."""
    return render_template("rw_dashboard.html")

#######################################################
# Render the Listings HTML 
#######################################################
@app.route("/listings")
def listings():
    """Return the listings page."""
    return render_template("rw_listings.html")

#######################################################
# Render the Reviews HTML 
#######################################################
@app.route("/reviews")
def reviews():
    """Return the reviews page."""
    return render_template("rw_reviews.html")

#######################################################
# Render Room Type Plot
#######################################################
@app.route("/roomtypeplot")
def roomtypeplot():
    """Return the roomtypeplot page."""
    return render_template("rw_roomtypeplot.html")

#######################################################
# Render Listed Property Types Plot
#######################################################
@app.route("/propertytypesplot")
def propertytypesplot():
    """Return the property types plot page."""
    return render_template("rw_propertytypesplot.html")

#######################################################
# Render Average Price by Neighbourhood plot
#######################################################
@app.route("/hoodsavgpricesplot")
def hoodsavgpricesplot():
    """Return the avgprices plot page."""
    return render_template("rw_hoodsavgpricesplot.html")

#######################################################
# Render Growth Analysis plot
#######################################################
@app.route("/hoodsavgratingsplot")
def hoodsavgratingsplot():
    """Return the avgratings plot page."""
    return render_template("pg_growth.html")

#######################################################
# Render Listings by Neighbourhood Map
#######################################################
@app.route("/hoodlistingsmap")
def hoodlistingsmap():
    """Return the listings map page."""
    return render_template("rw_hoodlistingsmap.html")

#######################################################
# Render Rating by Neighbourhood Map
#######################################################
@app.route("/hoodavgratingsmap")
def hoodavgratingsmap():
    """Return the Surabhi's ratings map page."""
    return render_template("ss_ratingsmap.html")

#######################################################
# Render Average Price by Neighbourhood Map
#######################################################
@app.route("/hoodavgpricesmap")
def hoodavgpricesmap():
    """Return Janani's Neighbourhood prices map page."""
    return render_template("airbnbpricing.html")

#######################################################
# Render the Analysis Methodology HTML
#######################################################
@app.route("/methodology")
def methodology():
    """Return the Methodology page."""
    return render_template("rw_methodology.html")

########################################################
# Render the Acknowledgements HTML 
#######################################################
@app.route("/acknowledgements")
def acknowledgements():
    """Return the acknowledgements page."""
    return render_template("rw_acknowledgements.html")

########################################################
# Render Janani's Pricing Choropleth HTML 
#######################################################
# @app.route("/airbnbpricing")
# def airbnbpricing():
#     """Return the Janani's airbnbpricing page."""
#     return render_template("airbnbpricing.html")
###################################################################
# Code to actually run the app
###################################################################
if __name__ == "__main__":
    app.run(debug = True)
##################### END OF APP #############################################