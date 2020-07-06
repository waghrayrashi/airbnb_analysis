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

# # Reflect the database 
# Base = automap_base()

# # Reflect the tables
# Base.prepare(engine, reflect=True)

# # Create session
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
# Render the Dashboard HTML 
#######################################################
@app.route("/dashboard")
def dashboard():
    """Return the Dashboard page."""
    return render_template("rw_dashboard.html")

#######################################################
# Render the Rental Landscape HTML 
#######################################################
@app.route("/landscape")
def landscape():
    """Return the Landscape page."""
    return render_template("rw_landscape.html")

#######################################################
# Render the Demand HTML 
#######################################################
@app.route("/demand")
def demand():
    """Return the Demand page."""
    return render_template("rw_demand.html")

#######################################################
# Render the Listings HTML 
#######################################################
@app.route("/listings")
def listings():
    """Return the listings page."""
    return render_template("rw_listings.html")

#######################################################
# Render the Growth HTML 
#######################################################
@app.route("/growth")
def growth():
    """Return the growth page."""
    return render_template("rw_growth.html")

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
# Render plot2
#######################################################
@app.route("/plot2")
def plot2():
    """Return the plot2 page."""
    return render_template("rw_plot2.html")

#######################################################
# Render Listed Property Types Plot
#######################################################
@app.route("/propertytypesplot")
def propertytypesplot():
    """Return the property types plot page."""
    return render_template("rw_propertytypesplot.html")

#######################################################
# Render Listings by Neighbourhood Map
#######################################################
@app.route("/hoodlistingsmap")
def hoodlistingsmap():
    """Return the listings map page."""
    return render_template("rw_hoodlistingsmap.html")

#######################################################
# Render Average Rating by Neighbourhood
#######################################################
@app.route("/hoodavgratingsmap")
def hoodavgratingsmap():
    """Return the avgratings map page."""
    return render_template("rw_hoodavgratingsmap.html")

#######################################################
# Render Average Price by Neighbourhood
#######################################################
@app.route("/hoodavgpricesplot")
def hoodavgpricesmap():
    """Return the avgprices map page."""
    return render_template("rw_hoodavgpricesmap.html")

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

###################################################################
# Code to actually run the app
###################################################################
if __name__ == "__main__":
    app.run(debug = True)
##################### END OF APP #############################################