import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";

interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  venue: string;
  category: string;
}

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityList: React.FC<Props> = ({ activities, selectActivity, deleteActivity, submitting }) => {
  const [target, setTatget] = useState('');
  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTatget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            {" "}
            { }
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  name={activity.id}
                  loading={submitting && target === activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />{" "}
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
