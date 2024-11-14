from pathlib import Path
from syftbox.lib import Client
import os
import json
import shutil
from datetime import datetime, timedelta, UTC
from typing import Tuple


def network_participants(datasite_path: Path):
    """
    Retrieves a list of user directories (participants) in a given datasite path.

    Args:
        datasite_path (Path): The path to the datasite directory containing user subdirectories.

    Returns:
        list: A list of strings representing the names of the user directories present in the datasite path.

    Example:
        If the datasite_path contains the following directories:
        - datasite/user1/
        - datasite/user2/
        Then the function will return:
        ['user1', 'user2']
    """
    # Get all entries in the specified datasite path
    entries = os.listdir(datasite_path)

    # Initialize an empty list to store user directory names
    users = []

    # Iterate through each entry and add to users list if it's a directory
    for entry in entries:
        if Path(datasite_path / entry).is_dir():
            users.append(entry)

    # Return the list of user directories
    return users


def is_updated(timestamp: str) -> bool:
    """
    Checks if a given timestamp is within the last 10 seconds of the current time.

    Args:
        timestamp (str): The timestamp string in the format "%Y-%m-%d %H:%M:%S".

    Returns:
        bool: True if the timestamp is within the last 10 seconds from now, False otherwise.

    Example:
        If the current time is "2024-10-05 14:00:30" and the given timestamp is
        "2024-10-05 14:00:25", the function will return True.
    """
    # Parse the provided timestamp string into a datetime object
    data_timestamp = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")

    # Get the current time as a datetime object
    current_time = datetime.now()

    # Calculate the time difference between now and the provided timestamp
    time_diff = current_time - data_timestamp

    # Return True if the timestamp is within the last 10 seconds
    return time_diff < timedelta(minutes=1)


def get_network_cpu_mean(
    datasites_path: Path, peers: list[str]
) -> Tuple[float, list[str]]:
    """
    Calculates the mean CPU usage across a network of peers.

    Args:
        datasites_path (Path): The path to the directory containing data for all peers.
        peers (list[str]): A list of peer directory names.

    Returns:
        float: The mean CPU usage of the peers whose data is available and updated.
               Returns -1 if no data is available or no peers have been updated recently.

    Example:
        If `datasites_path` is "/datasites" and the list of peers is ["peer1", "peer2"],
        this function will attempt to read CPU usage data from files located at:
        - "/datasites/peer1/api_data/cpu_tracker/cpu_tracker.json"
        - "/datasites/peer2/api_data/cpu_tracker/cpu_tracker.json"
        It then computes the average CPU usage for peers with valid and updated data.
    """
    # Initialize variables for aggregated CPU usage and peer count
    aggregated_usage = 0
    aggregated_peers = 0
    cpu_usage_mean = -1

    active_peers = []
    # Iterate over each peer to gather CPU usage data
    for peer in peers:
        # Construct the path to the CPU tracker JSON file for the peer
        tracker_file: Path = (
            datasites_path / peer / "api_data" / "cpu_tracker" / "cpu_tracker.json"
        )

        # Skip if the tracker file does not exist
        if not tracker_file.exists():
            continue

        # Open and read the JSON file for the peer
        with open(str(tracker_file), "r") as json_file:
            try:
                peer_data = json.load(json_file)
            except json.JSONDecodeError:
                # Skip if the JSON file cannot be decoded properly
                continue

        # Check if the data is updated and add to aggregation if valid
        if "timestamp" in peer_data and is_updated(peer_data["timestamp"]):
            aggregated_usage += float(peer_data["cpu"])
            aggregated_peers += 1
            active_peers.append(peer)

    # Calculate the mean CPU usage if there are valid peers with updated data
    if aggregated_peers > 0:
        cpu_usage_mean = aggregated_usage / aggregated_peers

    # Return the calculated mean CPU usage or -1 if no data is available
    return cpu_usage_mean, active_peers


def truncate_file(file_path: Path, max_items: int, new_sample: float, peers: list[str]):
    """
    Adds a new CPU sample to a JSON file and ensures the number of samples does not exceed a specified limit.

    Args:
        file_path (Path): The path to the JSON file containing historical CPU data.
        max_items (int): The maximum number of items to retain in the history.
        new_sample (float): The new CPU usage sample to be added.

    Returns:
        None

    Example:
        If the file at `file_path` contains:
        {
            "items": [
                {"cpu": 20.5, "timestamp": "2024-10-05 14:00:00"},
                {"cpu": 25.0, "timestamp": "2024-10-05 14:10:00"}
            ]
        }
        and `new_sample` is 30.2, the function will add the new sample and trim the list if it exceeds `max_items`.
    """
    # Get the current time in UTC and format it as a string
    current_time = datetime.now(UTC)
    timestamp_str = current_time.strftime("%Y-%m-%d %H:%M:%S")

    # Initialize an empty list for history data
    history = []

    # If the file exists, load the existing history
    if file_path.exists():
        with open(file_path, "r") as f:
            historical_data = json.load(f)
            history = historical_data["items"]

        # Append the new sample to the history
        history.append({"cpu": new_sample, "timestamp": timestamp_str})

        # If the history exceeds the maximum items allowed, truncate it to retain the most recent entries
        if len(history) > max_items:
            history = history[-max_items:]
    else:
        # If the file does not exist, create the history with the new sample
        history.append({"cpu": new_sample, "timestamp": timestamp_str})

    # Write the updated history back to the JSON file
    with open(file_path, "w") as f:
        json.dump({"items": history, "peers": peers}, f, indent=4)


def copy_html_files(source: Path, destination: Path):
    """
    Moves all files from the source directory to the destination directory.

    Args:
        source (Path): The source directory.
        destination (Path): The destination directory.

    Raises:
        ValueError: If source or destination is not a directory.
    """
    if not source.is_dir():
        raise ValueError(f"Source {source} is not a directory.")
    if not destination.exists():
        destination.mkdir(parents=True)
    elif not destination.is_dir():
        raise ValueError(f"Destination {destination} is not a directory.")

    for item in source.iterdir():
        if item.is_file():
            target = destination / item.name
            try:
                os.rename(item, target)
            except Exception as e:
                print(f"Error moving file {item} to {target}: {e}")


if __name__ == "__main__":
    client = Client.load()
    copy_html_files(
        source=Path("./assets"), destination=client.datasite_path / "public"
    )

    peers = network_participants(client.datasite_path.parent)

    cpu_mean, active_peers = get_network_cpu_mean(client.datasite_path.parent, peers)

    output_public_file = client.datasite_path / "public" / "cpu_tracker.json"

    truncate_file(
        file_path=output_public_file,
        max_items=360,
        new_sample=cpu_mean,
        peers=active_peers,
    )
