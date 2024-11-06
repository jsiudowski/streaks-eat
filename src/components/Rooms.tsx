import { Component } from "react";
// Importing from src folder
import Buildings from '../Data/RoomsEdited.json';

// Defines building rooms
interface BuildingsData {
    [buildingName: string]: string[] | null; // Each building name maps an array of room names or null
}

// Component's props and state types 
interface RoomsProps {}
interface RoomsState {}

// Rooms component
export class Rooms extends Component<RoomsProps, RoomsState> {
    constructor(props: RoomsProps) {
        super(props);
        this.state = {
            // No state since you're importing static data
        };
    }

    render() {
        // Casts the imported Buildings data as the BuildingsData interface
        const buildingsData: BuildingsData = Buildings;

        return (
            <div>
                <h3>Building and Room Information</h3>

                {/* Loops through the buildings (keys of the JSON object) */}
                {Object.keys(buildingsData).map((buildingName, index) => (
                    <div key={index}>
                        <h4>{buildingName}</h4> {/* Displays building name */}

                        <ul>
                            {/* Checks if the value is null or an array */}
                            {buildingsData[buildingName] ? (
                             buildingsData[buildingName]?.map((room, roomIndex) => (
                            <li key={roomIndex}>{room}</li>
                            ))
                            ) : (
                                <li>No rooms available</li>
                                )}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}

export default Rooms;
