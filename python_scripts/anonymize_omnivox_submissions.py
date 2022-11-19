import os
import json
import re
from pathlib import Path


def AnonymizeOmnivoxSubmissions(submissionsPath):
    """
    Anonymize Omnivox submissions by renaming folders. Replace student name with Id and
    timestamp (month-day-hour-minute) using Regex. Only one level deep, non recursive.
    Must be ran from submissions's parent directory.
    """

    studentDict = {"students": []}
    studentList = []

    # Ex. submission folder: Smith_2129876_Assignment_3_-_85_Submitted_on_2022-10-26_00h05m34s
    REGEX_PATTERN = r"^\w*(\d{7}).+(\d{2}-\d{2}_\d{2}h\d{2}m)"

    # TODO: shouldn't need to be in parent directory.
    workspace_path = Path.cwd()
    directory_path = workspace_path / submissionsPath
    folder_name = os.path.basename(directory_path)

    print("Current directory : " + directory_path.__str__())
    print("Directory name : ", folder_name)

    for folder in directory_path.iterdir():
        if folder.is_dir():
            result = re.search(REGEX_PATTERN, folder.name)
            if result != None:
                student_number = result.group(1)
                timestamp = result.group(2)
                student_entry = createStudentSubmission(
                    student_number, timestamp)
                studentList.append(student_entry)
                # Ex. new name: 2129876_10-26_00h05mo
                new_folder_name = student_number + "_" + timestamp
                print(new_folder_name)
                folder.rename(directory_path/new_folder_name)
    studentDict["students"] = studentList
    return studentDict


def createStudentSubmission(student_number, timestamp):
    return {
        "studentNumber": student_number,
        "timestamp": timestamp
    }


def writeJsonStudents(studentDict, jsonPath):
    with open(jsonPath, 'w', encoding='utf-8') as jsonHandler:
        jsonHandler.write(json.dumps(studentDict, indent=4))


if __name__ == "__main__":
    # relative to project workspace path
    submissionsPath = 'sample_submissions/grading'
    student_json_path = 'python_scripts/students.json'
    studentDict = AnonymizeOmnivoxSubmissions(submissionsPath)

    writeJsonStudents(studentDict, student_json_path)
    print(json.dumps(studentDict, indent=4))
