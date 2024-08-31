// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract HydroChain {
    // Struct to store rainfall data submissions
    struct RainfallData {
        uint256 timestamp;       // Timestamp when the data was submitted
        uint256 rainfallAmount;  // Rainfall amount in millimeters
        address contributor;     // Address of the user who submitted the data
        bool validated;          // Whether the data has been validated
    }

    // Array of all submitted rainfall data
    RainfallData[] public rainfallData;

    // Mapping from user address to their total points accumulated
    mapping(address => uint256) public userPoints;

    // Mapping from user address to their submitted data count
    mapping(address => uint256) public userSubmissions;

    // Event emitted when rainfall data is submitted
    event DataSubmitted(uint256 indexed dataId, address indexed contributor, uint256 rainfallAmount);

    // Event emitted when data is validated
    event DataValidated(uint256 indexed dataId, address indexed validator);

    // Event emitted when points are awarded
    event PointsAwarded(address indexed user, uint256 point);

    constructor() {
        // Constructor can be used for initial setup if needed
    }

    // Function to submit rainfall data
    function submitRainfallData(uint256 _rainfallAmount) external {
        // Create a new RainfallData struct and add it to the array
        rainfallData.push(RainfallData({
            timestamp: block.timestamp,
            rainfallAmount: _rainfallAmount,
            contributor: msg.sender,
            validated: false
        }));

        // Increment the user's submission count
        userSubmissions[msg.sender]++;

        // Emit an event for the new data submission
        emit DataSubmitted(rainfallData.length - 1, msg.sender, _rainfallAmount);
    }

    // Function to validate rainfall data
    function validateRainfallData(uint256 _dataId) external {
        require(_dataId < rainfallData.length, "Invalid data ID");

        // Mark the data as validated
        RainfallData storage data = rainfallData[_dataId];
        data.validated = true;

        // Award 10 points to the contributor for validated data
        uint256 points = 10;
        userPoints[data.contributor] += points;

        // Emit events for data validation and points awarded
        emit DataValidated(_dataId, msg.sender);
        emit PointsAwarded(data.contributor, points);
    }

    // Function to get a user's total points
    function getUserPoints(address _user) external view returns (uint256) {
        return userPoints[_user];
    }
}
