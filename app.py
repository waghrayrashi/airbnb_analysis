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
# Render the Data Description HTML on the second route
#######################################################
@app.route("/data")
def data():
    """Return the data description page."""
    return render_template("rw_data.html")

#######################################################
# Render the Authors HTML on the third route
#######################################################
@app.route("/authors")
def authors():
    """Return the Authors page."""
    return render_template("rw_authors.html")

#######################################################
# Render the Neighbourhood Analysis HTML on the fourth route
#######################################################
@app.route("/neighbourhoods")
def neighbourhoods():
    """Return the neighbourhoods analysis page."""
    return render_template("rw_neighbourhoods.html")

#######################################################
# Render the Growth Analysis HTML on the fifth route
#######################################################
@app.route("/growth")
def growth():
    """Return the growth analysis page."""
    return render_template("rw_growth.html")

#######################################################
# Render the Dashboard HTML on the sixth route
#######################################################
@app.route("/dashboard")
def dashboard():
    """Return the Dashboard page."""
    return render_template("rw_dashboard.html")

###################################################################
# Code to actually run the app
###################################################################
if __name__ == "__main__":
    app.run(debug = True)
##################### END OF APP #########################