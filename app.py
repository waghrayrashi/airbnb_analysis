##########################################
# # Flask Application
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
# Create database and pass in the app 
db = SQLAlchemy(app)

# Create engine
conn_str = "postgres://jngclzmcgbofnm:226e0e08a5d686ad2b3932b64fb783f8d0cc221311aa0862b16ad70bc5a6a5ec@ec2-34-233-226-84.compute-1.amazonaws.com:5432/d8jm8bn39mr3qe"
engine = create_engine(conn_str)

# Reflect the database 
Base = automap_base()

# Reflect the tables into SQLAlchemy classes
Base.prepare(engine, reflect=True)
allclasses = Base.classes.keys()


# Save references to each table in database 
# Roomtypes = Base.classes.roomtypes
# Propertytypes = Base.classes.propertytypes
# Toppropertytypes = Base.classes.toppropertytypes
# Hoodlistings = Base.classes.hoodlistings
# Hoodprices = Base.classes.hoodprices
# Hoodratings = Base.classes.hoodratings


# Create a class for new table - trying this for just a small neighbourhood group table
# class Neighbourhoods(db.Model):
#         "Neighbourhood" = db.Column(db.String(30))
#         "zipcode" = db.Column(db.Integer)

# @app.route("/addhood", methods=('POST', 'GET'))
# def add_neighbourhood():
#     return
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

@app.route("/test")
def text():

    return f"All classes available in the database: {allclasses}"


#####################################################
# # Render the database table alllistings
# ######################################################
@app.route("/cleanlistings")
def cleanlistings():
    """Query the database for listings details table."""

    # Create session to link to the heroku Postgres database
    session = Session(bind=engine)
    
    # Save references to each table in database 
    Alllistings = Base.classes.alllistings

    # Query the database table for columns of interest
    rentals = db.session.query(Alllistings).all()
    
    # Create an empty list
    listings_details = []
    
    # Loop through each row and create dictionaries for each column   
    for listing in rentals:
        listings_dict = {
            "id": listing.id,
            "latitude": listing.latitude,
            "longitude": listing.longitude,
            "neighbourhood": listing.neighbourhood_cleansed,
            "city": listing.city,
            "property_type": listing.property_type,
            "room_type": listing.room_type,
            "bedrooms": listing.bedrooms,
            "bathrooms": listing.bathrooms,
            "price": listing.price,
            "host_since": listing.host_since,
            "host_is_superhost": listing.host_is_superhost,
            "guests_included": listing.guests_included,
            "minimum_nights": listing.minimum_nights,
            "number_of_reviews": listing.number_of_reviews,
            "review_scores_rating": listing.review_scores_rating,
            "instant_bookable": listing.instant_bookable,
            "cancellation_policy": listing.cancellation_policy }
        
        # Append all columns to the object
        listings_details.append(listings_dict)
    
    session.close()
    # Return the json
    return jsonify(listings_details)

#######################################################
# Render the database table propertytypes
#######################################################
@app.route("/propertytypes")
def propertytypes():
    """Query the database for listings by property type"""

    # Save references to each table in database 
    Propertytypes = Base.classes.propertytypes

    # Create session
    session = Session(bind=engine)
    
    # Query the table for columns of interest
    propertytypes = session.query(Propertytypes).all()
    
    # Create an empty list
    property_types = []
    
    # Loop through each row and create dictionaries for each column   
    for listing in propertytypes:
        ptypes_dict = {
            "propertytype": listing.propertytype,
            "listings": listing.listings,
            "percent": listing.percent}
        
        # Append all columns to the object
        property_types.append(ptypes_dict)
    
    session.close()
    # Return the json
    return jsonify(property_types)

#######################################################
# Render the database table propertytypes
#######################################################
@app.route("/propertytypesnofloat")
def propertytypesnofloat():
    """Query the database for listings by propertytypesnofloat"""

    # Save references to each table in database 
    Propertytypesnofloat = Base.classes.propertytypesnofloat

    # Create session
    session = Session(bind=engine)
    
    # Query the table for columns of interest
    ptypesnofloat = session.query(Propertytypesnofloat).all()
    
    # Create an empty list
    property_typesnofloat = []
    
    # Loop through each row and create dictionaries for each column   
    for listing in ptypesnofloat:
        ptypes_dict = {
            "propertytype": listing.propertytype,
            "listings": listing.listings }
        
        # Append all columns to the object
        property_typesnofloat.append(ptypes_dict)
    
    session.close()
    # Return the json
    return jsonify(property_typesnofloat)
    
#######################################################
# Render the database table roomtypes
#######################################################
@app.route("/roomtypesnofloat")
def roomtypesnofloat():
    """Query the database for listings by roomtypesnofloat"""
    
    # Save references to each table in database 
    Roomtypesnofloat = Base.classes.roomtypesnofloat
    
    # Create session
    session = Session(bind=engine)
    
    # Query the table for columns of interest
    rtypesnofloat = session.query(Roomtypesnofloat).all()
    
    # Create an empty list
    room_typesnofloat = []
    
    # Loop through each row and create dictionaries for each column
    for listing in rtypesnofloat:
        rtypes_dict = {
            "roomtype": listing.roomtype,
            "listings": listing.listings,
        }
        # Append all columns to the object
        room_typesnofloat.append(rtypes_dict)
    
    session.close()
    # Return the json
    return jsonify(room_typesnofloat)

#######################################################
# Render the database table roomtypes
#######################################################
@app.route("/roomtypes")
def roomtypes():
    """Query the database for listings by property type"""
    
    # Save references to each table in database 
    Roomtypes = Base.classes.roomtypes
    
    # Create session
    session = Session(bind=engine)
    
    # Query the table for columns of interest
    roomtypes = session.query(Roomtypes).all()
    
    # Create an empty list
    room_types = []
    
    # Loop through each row and create dictionaries for each column
    for listing in roomtypes:
        rtypes_dict = {
            "propertytype": listing.roomtype,
            "listings": listing.listings,
            "percent": listing.percent
        }
        # Append all columns to the object
        room_types.append(rtypes_dict)
    
    session.close()
    # Return the json
    return jsonify(room_types)
#######################################################
# Render the database table neighbourhoodsummary
#######################################################
@app.route("/hoodssummary")
def hoodssummary():
    """Query the database for neighbourhoodsummary"""
    
    # Save references to each table in database 
    Hoodssummary = Base.classes.neighbourhoodsummary
    
    # Create session
    session = Session(bind=engine)
    
    # Query the table for columns of interest
    hoodssummary = session.query(Hoodssummary).all()
    
    # Create an empty list
    hoods_summary = []
    
    # Loop through each row and create dictionaries for each column
    for hood in hoodssummary:
        hoods_dict = {
            "neighbourhood": hood.neighbourhood,
            "listings": hood.listings,
            "avgprice": hood.avgprice,
            "avgrating": hood.avgrating }
        # Append all columns to the object
        hoods_summary.append(hoods_dict)
    
    session.close()
    # Return the json
    return jsonify(hoods_summary)
    
#######################################################
# Render the Rental Landscape HTML page HTML 
#######################################################
@app.route("/landscape")
def landscape():
    """Return the landscape page."""
    return render_template("rw_landscape.html")
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