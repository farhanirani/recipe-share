import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  FieldArray,
} from "formik";
import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const sleep = (milliseconds: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export default function Home() {
  return (
    <Card
      style={{
        maxWidth: "550px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <CardContent style={{ width: "100%", height: "100%" }}>
        <FormikStepper
          initialValues={{
            dishName: "",
            desc: "",
            cuisineName: "",
            cuisineImage: "",
            ingredients: [""],
            steps: [""],
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log("values", values);
          }}
        >
          <FormikStep label="Personal Data">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="dishName"
                component={TextField}
                label="Dish Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="desc"
                component={TextField}
                label="Description"
                id="standard-textarea"
                multiline
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="cuisineImage"
                component={TextField}
                label="Cuisine Image"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="cuisineName"
                component={TextField}
                label="Cuisine Name"
              />
            </Box>
            
          </FormikStep>
          <FormikStep label="Bank Accounts">
            <Box paddingBottom={2}>
              <FieldArray name="ingredients">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { ingredients } = values;
                  return (
                    <div>
                      {ingredients.map((ingredient, index) => (
                        <div key={index} style={{ display: "flex" }}>
                          <Field
                            fullWidth
                            component={TextField}
                            name={`ingredients[${index}]`}
                            label="Add Ingredient"
                          />
                          {index > 0 && (
                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </div>
                      ))}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          aria-label="add"
                          color="primary"
                          onClick={() => push(ingredients.length)}
                          startIcon={<AddIcon />}
                          style={{ padding: "5px", marginTop: "10px" }}
                        >
                          Add Ingredient
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </FieldArray>
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <FieldArray name="steps">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { steps } = values;
                  return (
                    <div>
                      {steps.map((step, index) => (
                        <div key={index} style={{ display: "flex" }}>
                          <Field
                            fullWidth
                            component={TextField}
                            name={`steps[${index}]`}
                            label="Step Detail"
                            multiline
                            required
                          />
                          {index > 0 && (
                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </div>
                      ))}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          aria-label="add"
                          color="primary"
                          onClick={() => push(steps.length)}
                          startIcon={<AddIcon />}
                          style={{ padding: "5px", marginTop: "10px" }}
                        >
                          Add Step
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </FieldArray>
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          console.log({ values });
          console.log("hehehehhehehehehhhhhhhhhhhh");
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
          console.log(helpers);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
