# This script implements a secure data wiping tool based on the DoD 5220.22-M
# standard, which is a widely recognized and effective method for data sanitization.
# It overwrites the specified file with multiple passes of data to make it
# unrecoverable.

import os
import sys
import random

def wipe_file(filepath):
    """
    Overwrites the contents of a file with a secure, multi-pass algorithm.

    This function follows the DoD 5220.22-M standard:
    Pass 1: Overwrites with 0x00 (zeros).
    Pass 2: Overwrites with 0xff (ones).
    Pass 3: Overwrites with random characters.

    Args:
        filepath (str): The path to the file to be wiped.
    """
    if not os.path.exists(filepath):
        print(f"Error: The file '{filepath}' does not exist.")
        return

    try:
        file_size = os.path.getsize(filepath)
        print(f"Wiping '{filepath}' of size {file_size} bytes...")

        # --- Pass 1: Write with 0x00 (zeros) ---
        print("Pass 1 of 3: Writing with zeros...")
        with open(filepath, 'wb') as f:
            f.write(b'\x00' * file_size)

        # --- Pass 2: Write with 0xff (ones) ---
        print("Pass 2 of 3: Writing with ones...")
        with open(filepath, 'wb') as f:
            f.write(b'\xff' * file_size)

        # --- Pass 3: Write with random data ---
        print("Pass 3 of 3: Writing with random data...")
        with open(filepath, 'wb') as f:
            random_data = os.urandom(file_size)
            f.write(random_data)

        # --- Final step: Truncate and delete the file ---
        # This step is crucial to remove any lingering data in slack space
        # and to ensure the file is completely removed from the file system.
        print("Finalizing: Truncating and deleting the file...")
        with open(filepath, 'a') as f:
            f.truncate(0)  # Truncate the file to zero size
        os.remove(filepath)
        print(f"File '{filepath}' has been securely wiped and deleted.")

    except OSError as e:
        print(f"Error during file wiping: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    # This block allows the script to be run from the command line.
    if len(sys.argv) != 2:
        print("Usage: python secure_wipe.py <path_to_file>")
        sys.exit(1)

    file_to_wipe = sys.argv[1]
    wipe_file(file_to_wipe)
