import React from "react";
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
}

const ActivityList: React.FC<Props> = ({ activities, selectActivity }) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            {" "}
            {/* 'key' should be specified on 'Item' component */}
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
                <Label basic content={activity.category} />{" "}
                {/* 'Label' instead of 'Lable' */}
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
