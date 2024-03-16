import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean; // Include editMode in Props interface
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<Props> = ({
    activities,
    selectedActivity,
    selectActivity,
    cancelSelectActivity,
    editMode, // Include editMode in destructuring
    openForm,
    closeForm,
    createOrEdit,
    deleteActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && (
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                )}
                {editMode && ( // Wrap ActivityForm in parentheses
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />
                )}
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;