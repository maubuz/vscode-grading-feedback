import os
import re
from pathlib import Path


def AnonymizeOmnivoxSubmissions():
    """
    Anonymize Omnivox submissions by renaming folders. Replace student name with Id and
    timestamp (month-day-hour-minute) using Regex. Only one level deep, non recursive.
    Must be ran from submissions's parent directory.
    """

    # Ex. submission folder: Smith_2129876_Assignment_3_-_85_Submitted_on_2022-10-26_00h05m34s
    REGEX_PATTERN = r"^\w*(\d{7}).+(\d{2}-\d{2}_\d{2}h\d{2}m)"

    # TODO: shouldn't need to be in parent directory.
    directory_path = Path.cwd()
    folder_name = os.path.basename(directory_path)

    print("Current directory : " + directory_path.__str__())
    print("Directory name : ", folder_name)
    # print(directory_path.parts) # Testing only

    for folder in directory_path.iterdir():
        if folder.is_dir():
            result = re.search(REGEX_PATTERN, folder.name)
            if result != None:
                # Ex. new name: 2129876_10-26_00h05m
                new_folder_name = result.group(1) + "_" + result.group(2)
                print(new_folder_name)
                folder.rename(new_folder_name)

if __name__ == "__main__":
    AnonymizeOmnivoxSubmissions()
    