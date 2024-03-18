import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid'
const ActivityForm: React.FC = () => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | undefined>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity])

  function handleSubmit() {
    if (!activity?.id) {
      activity!.id = uuid();
      createActivity(activity!).then(() => navigate(`/activities/${activity?.id}`))
    }
    else {
      updateActivity(activity).then(() => navigate(`/activities/${activity?.id}`))
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity!, [name]: value });
  }
  if (loadingInitial) return <LoadingComponent content="Loading activity..." />
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          name="title"
          placeholder="Title"
          value={activity!.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name="description"
          placeholder="Description"
          value={activity!.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={activity!.category}
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          name="date"
          placeholder="Date"
          value={activity!.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name="city"
          placeholder="City"
          value={activity!.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={activity!.venue}
          onChange={handleInputChange}
        />
        <Button
          as={Link} to='/activities'
          floated="right"
          type="button"
          content="Cancel"
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);