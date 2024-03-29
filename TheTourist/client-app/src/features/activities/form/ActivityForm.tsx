import React, { useEffect, useState } from "react";
import { Segment, Button, Header, Form, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { v4 as uuid } from 'uuid';

const ActivityForm: React.FC = () => {
  const { activityStore } = useStore();
  const { loading, loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | undefined>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });
  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required('The activity category is required'),
    date: Yup.string().required('Date is required').nullable(),
    city: Yup.string().required('The activity City is required'),
    venue: Yup.string().required('The activity Venue is required')

  })
  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      const newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => navigate(`/activities/${activity?.id}`))
    }
    else {
      updateActivity(activity).then(() => navigate(`/activities/${activity?.id}`))
    }
  }


  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity!}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <MyTextInput name='title' placeholder="Title" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <MyTextArea rows={3} name="description" placeholder="Description" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <MySelectInput options={categoryOptions} name="category" placeholder="Category" />
                </Grid.Column>
                <Grid.Column width={8}>
                  <MyDateInput name="date" placeholderText="Date" showTimeSelect timeCaption="Time" dateFormat='MMMM d, yyyy h:mm aa' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Header content='Location Details' sub color='teal' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <MyTextInput name="city" placeholder="City" />
                </Grid.Column>
                <Grid.Column width={8}>
                  <MyTextInput name="venue" placeholder="Venue" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Button.Group fluid>
                    <Button
                      as={Link}
                      to="/activities"
                      type="button"
                      content="Cancel"
                      color="grey"
                      
                    />
                    <Button.Or />
                    <Button
                      disabled={isSubmitting || !dirty || !isValid}
                      loading={loading}
                      positive
                      type="submit"
                      content="Submit"
                    />
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
