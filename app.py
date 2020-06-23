from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(_name_)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqllite:///app.sqlite'
db = SQLAlchemy(app)
class Task(db.Model):
    id = db.column(db Integer, primary_key=True)
    name = db.column(db String)


@app.route('/')
def index():
    return render_template(index.html', name = "Rashi")




    if __name__ == "__main__":
        app.run(debug=True)