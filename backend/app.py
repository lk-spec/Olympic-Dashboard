import os
from google.cloud.sql.connector import Connector
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pymysql
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text

app = Flask(__name__)

USER ="root"
PASSWORD ="krishpoopy69"
PUBLIC_IP_ADDRESS ="34.69.206.206"
DBNAME ="tokyo-olympics-db"
PROJECT_ID ="cs411-project-fa23"
INSTANCE_NAME ="cs411-project-fa23:us-central1:cs411-project-db"

db_url = f'mysql+pymysql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}'

connector = Connector()
CORS(app)
app.config["CORS_HEADER"] = 'Content-Type'

# function to return the database connection object
def getconn():
    conn = connector.connect(
        INSTANCE_NAME,
        "pymysql",
        user=USER,
        password=PASSWORD,
        db=DBNAME
    )
    return conn

pool = create_engine(
    "mysql+pymysql://",
    creator=getconn,
    )

@app.route("/")
def index():
    return "Main Page"

@app.route("/basicquery", methods=["GET"])
@cross_origin()
def basicquery():
    print("called")

    query = '''
    SELECT CountryName, OverallRank, Total
    FROM Medals JOIN Teams ON Medals.TeamID = Teams.TeamID
    ORDER BY OverallRank ASC
    LIMIT 21;
    '''

    with pool.connect() as db_conn:
        result = db_conn.execute(text(query))

        data = result.fetchall()
        res = []
        for row in data:
            res.append([row[0], row[1], row[2]])
        response = jsonify(res)
        print(res)
    # response.headers.add("Access-Control-Allow-Origin", "http://localhost:5001")
    
    return response, 200

@app.route("/countries", methods=["GET"])
def get_all_countries():
    query = f'''
    SELECT CountryName FROM Teams;
    '''
    
    with pool.connect() as db_conn:
        result = db_conn.execute(text(query))

        data = result.fetchall()
        res = []
        for row in data:
            res.append(row[0])
        response = jsonify(res)
        print(res)
    # response.headers.add("Access-Control-Allow-Origin", "http://localhost:5001")
    
    return response, 200

@app.route("/athletes/<athlete>", methods=["GET"])
@cross_origin()
def get_athlete(athlete):
    query = f'''
    SELECT a.Name, t.CountryName, d.Name, c.Name
    FROM Athletes a JOIN Teams t ON a.teamID = t.teamID
    JOIN Coaches c ON a.CoachID = c.CoachID
    JOIN Disciplines d ON d.DisciplineID = a.DisciplineID
    WHERE a.Name LIKE :athlete
    ORDER BY a.Name;
    '''
    
    with pool.connect() as db_conn:
        result = db_conn.execute(text(query), {'athlete': f'%{athlete}%'})

        data = result.fetchall()
        res = []
        for row in data:
            res.append([row[0], row[1], row[2], row[3]])
        response = jsonify(res)
        print(res)
    # response.headers.add("Access-Control-Allow-Origin", "http://localhost:5001")
    
    return response, 200

@app.route("/coaches/<coach>", methods=["GET"])
@cross_origin()
def get_coach(coach):
    query = '''
    SELECT c.Name, t.CountryName, d.Name AS Discipline, COUNT(a.AthleteID) AS AthleteCount
    FROM Coaches c
    JOIN Teams t ON c.TeamID = t.TeamID
    JOIN Disciplines d ON c.DisciplineID = d.DisciplineID
    LEFT JOIN Athletes a ON c.CoachID = a.CoachID
    WHERE c.Name LIKE :coach
    GROUP BY c.Name, t.CountryName, d.Name
    ORDER BY c.Name;
    '''

    with pool.connect() as db_conn:
        result = db_conn.execute(text(query), {'coach': f'%{coach}%'})

        data = result.fetchall()
        res = []
        for row in data:
            res.append([row[0], row[1], row[2], row[3]])
        response = jsonify(res)
        print(res)

    return response, 200


@app.route("/countries/<country>", methods=["GET"])
@cross_origin()
def get_country(country):
    query = '''
    SELECT t.CountryName, m.OverallRank, m.GoldTotal, m.SilverTotal, m.BronzeTotal
    FROM Teams t JOIN Medals m ON t.teamID = m.teamID
    WHERE CountryName LIKE :country
    ORDER BY CountryName;
    '''

    with pool.connect() as db_conn:
        result = db_conn.execute(text(query), {'country': f'%{country}%'})

        data = result.fetchall()
        res = [[row[0], row[1],row[2], row[3], row[4]] for row in data]
        response = jsonify(res)
        print(res)

    return response, 200

@app.route("/companies/<company>", methods=["GET"])
@cross_origin()
def get_company(company):
    query = '''
    SELECT com.Name, com.ForbesRank, t.CountryName AS BeneficiaryCountry
    FROM Companies com
    JOIN Teams t ON com.BeneficiaryID = t.TeamID
    WHERE com.Name LIKE :company
    ORDER BY com.Name;
    '''

    with pool.connect() as db_conn:
        result = db_conn.execute(text(query), {'company': f'%{company}%'})

        data = result.fetchall()
        res = []
        for row in data:
            res.append([row[0], row[1], row[2]])
        response = jsonify(res)
        print(res)
    return response, 200

@app.route("/companiesWithId/<company>", methods=["GET"])
@cross_origin()
def get_company_with_id(company):
    query = '''
    SELECT com.Name, com.ForbesRank, t.CountryName AS BeneficiaryCountry, com.CompanyID
    FROM Companies com
    JOIN Teams t ON com.BeneficiaryID = t.TeamID
    WHERE com.Name LIKE :company
    ORDER BY com.Name;
    '''

    with pool.connect() as db_conn:
        result = db_conn.execute(text(query), {'company': f'%{company}%'})

        data = result.fetchall()
        res = []
        for row in data:
            res.append([row[0], row[1], row[2], row[3]])
        response = jsonify(res)
        print(res)
    return response, 200

@app.route("/events/<discipline>", methods=["GET"])
@cross_origin()
def get_events(discipline):
    query = '''
    SELECT d.Name, c.Classification, COUNT(t.TeamID)
    FROM Competes c
    JOIN Disciplines d ON c.DisciplineID = d.DisciplineID
    JOIN Teams t ON c.TeamID = t.TeamID
    WHERE d.Name LIKE :discipline
    GROUP BY d.Name, c.Classification
    ORDER BY d.Name;
    '''

    with pool.connect() as db_conn:
        result = db_conn.execute(text(query), {'discipline': f'%{discipline}%'})

        data = result.fetchall()
        res = []
        for row in data:
            res.append([row[0], row[1], row[2]])
        response = jsonify(res)
        print(res)

    return response, 200

@app.route("/registerCompany", methods=["POST"])
@cross_origin()
def insert_company():
    body = request.get_json()
    max_query = '''
    SELECT MAX(CompanyID) FROM Companies
    '''
    country_query = '''
    SELECT TeamID FROM Teams
    WHERE CountryName = :country
    '''

    try:
        with pool.connect() as db_conn:
            result = db_conn.execute(text(max_query))
            max_company_id = result.scalar()

            query_res = db_conn.execute(text(country_query), {'country': body["Sponsors"]})
            country_id = query_res.scalar()

            print(country_id)

            # Increment the maximum value by 1 to get a new CompanyID
            new_company_id = max_company_id + 1

            print(new_company_id)

            # Insert the new record with the generated CompanyID
            insert_query = '''
            INSERT INTO Companies VALUES (:company_id, :forbes_rank, :company_name, :country_id)
            '''
        
            res = db_conn.execute(text(insert_query), {'company_id': new_company_id, 'forbes_rank': body["Forbe's Rank"], 'company_name': body["Name"], 'country_id': country_id})
            print(res.rowcount)
            db_conn.commit()
    except Exception as e:
        print(e)
        return "Error occured", 403


    return body, 200

@app.route("/registerAthlete", methods=["POST"])
@cross_origin()
def register_athlete():
    body = request.get_json()
    max_query = '''
    SELECT MAX(AthleteID) FROM Athletes
    '''
    team_query = '''
    SELECT TeamID FROM Teams
    WHERE CountryName = :country
    '''
    coach_query = '''
    SELECT CoachID FROM Coaches
    WHERE Name = :coach_name
    '''
    discipline_query = '''
    SELECT DisciplineID FROM Disciplines
    WHERE Name = :discipline_name
    '''
    try:
        with pool.connect() as db_conn:
            result = db_conn.execute(text(max_query))
            max_athlete_id = result.scalar()
            new_athlete_id = max_athlete_id + 1 if max_athlete_id is not None else 1
            team_res = db_conn.execute(text(team_query), {'country': body["CountryName"]})
            team_id = team_res.scalar()
            discipline_res = db_conn.execute(text(discipline_query), {'discipline_name': body["DisciplineName"]})
            discipline_id = discipline_res.scalar()
            coach_res = db_conn.execute(text(coach_query), {'coach_name': body["CoachName"]})
            coach_id = coach_res.scalar()
            name_id = body["Name"]
            insert_query = '''
            INSERT INTO Athletes VALUES (:athlete_id, :name_id, :team_id, :discipline_id, :coach_id)
            '''
            db_conn.execute(text(insert_query), {
                'name_id': name_id,
                'athlete_id': new_athlete_id, 
                'team_id': team_id,
                'discipline_id': discipline_id,
                'coach_id': coach_id, 
            })
            db_conn.commit()
        return jsonify({"message": "Player registered successfully", "athlete_id": new_athlete_id}), 201
    
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 403
    
@app.route("/updateCompany", methods=["PUT"])
@cross_origin()
def update_company():
    body = request.get_json()
    print(body)
    team_query = '''
    SELECT TeamID FROM Teams
    WHERE CountryName = :country
    '''
    try:
        with pool.connect() as db_conn:
            query = db_conn.execute(text(team_query), {'country': body["Sponsors"]})
            beneficiary_id = query.scalar()

            update_query = '''
            UPDATE Companies
            SET Name = :name, BeneficiaryID = :beneficiary_id
            WHERE CompanyID = :id
            '''
            delete_res = db_conn.execute(text(update_query), {'name': body["Name"], 'beneficiary_id': beneficiary_id, 'id': body["Id"]})
            db_conn.commit()
    except Exception as e:
        print(e)
    
    return "success", 200


@app.route("/deleteCompany", methods=["DELETE"])
@cross_origin()
def delete_company():
    body = request.get_json()
    company_id = body["Id"]

    delete_query = '''
    DELETE FROM Companies WHERE CompanyID = :id
    '''

    try:
        with pool.connect() as db_conn:
            res = db_conn.execute(text(delete_query), {'id': company_id})
            db_conn.commit()

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while deleting the company"}), 500
    
    return "Successfully Deleted Company", 200


@app.route("/deleteAthlete", methods=["DELETE"])
@cross_origin()
def delete_athlete():
    body = request.get_json()
    athlete_name = body.get("AthleteName")

    if not athlete_name:
        return jsonify({"error": "AthleteName is required"}), 400

    delete_query = '''
    DELETE FROM Athletes WHERE Name = :athlete_name
    '''

    try:
        with pool.connect() as db_conn:
            res = db_conn.execute(text(delete_query), {'athlete_name': athlete_name})
            db_conn.commit()

            if res.rowcount > 0:
                return jsonify({"message": "Athlete deleted successfully", "athlete_name": athlete_name}), 200
            else:
                return jsonify({"message": "Athlete not found", "athlete_name": athlete_name}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while deleting the athlete"}), 500


@app.route("/getPlayerCount/<country>", methods=["GET"])
@cross_origin()
def get_player_count(country):

    country_query = '''
    SELECT TeamID FROM Teams WHERE CountryName = :country
    '''

    try:
        with pool.connect() as db_conn:
            country_res = db_conn.execute(text(country_query), {'country': country})
            team_id = country_res.scalar()

            sp_query = '''
            CALL GetPlayerCountByCountry(:team_id)
            '''
            sp_res = db_conn.execute(text(sp_query), {'team_id': team_id})
            data_query = '''
            SELECT DISTINCT eventName, playerCount FROM playerCountByCountry;
            '''

            result = db_conn.execute(text(data_query))
            data = result.fetchall()
            output = []
            for row in data:
                output.append([row[0], row[1]])

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while deleting the company"}), 500
    
    return output, 200

@app.route("/getTotalPlayers/<country>", methods=["GET"])
@cross_origin()
def get_total_player_count(country):

    country_query = '''
    SELECT TeamID FROM Teams WHERE CountryName = :country
    '''

    try:
        with pool.connect() as db_conn:
            country_res = db_conn.execute(text(country_query), {'country': country})
            team_id = country_res.scalar()

            length_query = '''
            SELECT Distinct AthleteID FROM Athletes WHERE TeamID = :team_id
            '''

            result = db_conn.execute(text(length_query), {'team_id': team_id})
            data = result.fetchall()
            body = {
                "total": len(data)
            }

            return body, 200
            

    except Exception as e:
        print(e)
        return "Error occured", 500

@app.route("/getTotalCoaches/<country>", methods=["GET"])
@cross_origin()
def get_total_coach_count(country):

    country_query = '''
    SELECT TeamID FROM Teams WHERE CountryName = :country
    '''

    try:
        with pool.connect() as db_conn:
            country_res = db_conn.execute(text(country_query), {'country': country})
            team_id = country_res.scalar()

            length_query = '''
            SELECT Distinct CoachID FROM Coaches WHERE TeamID = :team_id
            '''

            result = db_conn.execute(text(length_query), {'team_id': team_id})
            data = result.fetchall()
            body = {
                "total": len(data)
            }

            return body, 200
            

    except Exception as e:
        print(e)
        return "Error occured", 500
