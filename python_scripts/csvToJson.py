import csv
import json
import time

# Assumed csv structure:

# Question id,	Question title,		General feedback,		Points
# Q1,			First Question,		,						2
# Q1,			,					General Feedback 1.1,	-0.5
# Q1,			,					General Feedback 1.2,	-0.75
# Q2,			Second Question,	,						3
# Q2,			,					General Feedback 2.1,	-0.25


# Counter used to assign general feedback ids
# TODO: currently used as global var. Find different mechanism?
feedbackIdCounter = 0


def csv_to_dict(csvFilePath):
    jsonArray = {"questions": []}
    questionList = []
    # Maping csv headers to these dict keys
    fieldNames = ['id', 'title', 'generalFeedback', 'totalPoints']

    # read csv file
    with open(csvFilePath, encoding='utf-8') as csvf:

        csvReader = csv.DictReader(csvf, fieldNames)
        csvReader.__next__()  # skip the first row (headers)

        for row in csvReader:
            print(row)
            # Create a question entry. Only questions should have title
            if row["title"]:
                print("Question title: ", row["title"])
                # row["generalFeedback"] = []
                questionList.append(rowToQuestion(row))

            # Create a general feedback entry on a question with the correct id
            if row["generalFeedback"]:
                print("General Feedback: ", row["generalFeedback"])

                parentId = row["id"]
                # Find parent question using list comprehension (assume first item)
                parentQuestion = [
                    item for item in questionList if item["id"] == parentId][0]
                parentQuestion['generalFeedback'].append(
                    rowToGeneralFeedback(row))

                print("Found parent question")
                print(parentQuestion)

    jsonArray["questions"] = questionList
    return jsonArray


def rowToQuestion(row):

    # fieldNames = ['id', 'title', 'generalFeedback', 'totalPoints']
    return {
        'id': row['id'],
        'title': row['title'],
        'totalPoints': float(row['totalPoints']),
        # Question rows should have no general feedback, so initialize empty list
        'generalFeedback': []
    }


def rowToGeneralFeedback(row):
    return {
        "parentQuestionId": row["id"],
        "generalFeedbackText": row["generalFeedback"],
        "feedbackId": generateFeedbackId(),
        "questionPoints": float(row["totalPoints"]),
        "specificFeedback": []
    }


def generateFeedbackId():
    global feedbackIdCounter
    feedbackIdCounter += 1
    return feedbackIdCounter


def writeJsonQuestions(questionsDict, jsonPath):
    with open(jsonPath, 'w', encoding='utf-8') as jsonHandler:
        jsonHandler.write(json.dumps(questionsDict, indent=4))


if __name__ == "__main__":

    csvFilePath = "python_scripts/questions-template.csv"
    jsonQuestionPath = "python_scripts/questions.json"
    questionsDict = csv_to_dict(csvFilePath)
    writeJsonQuestions(questionsDict, jsonQuestionPath)
    print(json.dumps(questionsDict, indent=4))
