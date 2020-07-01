##########################################
# Flask Application
##########################################

# Dependencies and Setup
import os

import pandas as pd
import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from config import (postgres_id, postgres_pw)

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

##########################################
# Flask Set up
##########################################
app = Flask(__name__)

##########################################
# Database Connection Set up
##########################################

#Setup the PostgreSQL database
# Create engine
conn_str = f"{postgres_id}:{postgres_pw}@localhost:5432/airbnb_db"
engine = create_engine(f'postgresql://{conn_str}')

# Setup SQLAlchemy with flask
app.config["SQLALCHEMY_DATABASE_URI"] = f'postgresql://{conn_str}'
airbnb_db = SQLAlchemy(app)

# Reflect the database 
Base = automap_base()

# Reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each original data table
# Listings_Details = Base.classes.listings_details
# Calendar = Base.classes.calendar
# Reviews_Details = Base.classes.reviews_details

# Save references to each transformed data table 
Listings = Base.classes.listings
Listings_by_roomtype = Base.classes.listings_by_roomtype
Listings_by_propertytype = Base.classes.listings_by_propertytype
Top_propertytypes = Base.classes.top_propertytypes
Highest_priced_neighbourhoods = Base.classes.highest_priced_neighbourhoods
Listings_by_neighbourhood = Base.classes.listings_by_neighbourhood

# Create session
session = Session(engine)

##########################################
# Define Functions to be used in the app routes
##########################################
# Pendingto be completed

##########################################
# Set Flask Routes
##########################################
# Render the Index HTML on the main route
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

##########################################
# Code to actually run the app
##########################################
if __name__ == "__main__":
    app.run(debug = True)
##########################################