import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import PaymentsForm from '../components/PaymentsForm'
import ReviewForm from '../components/ReviewForm'
import AddressForm from '../components/AddressForm'

const steps = ['Shipping Address', 'Payment Details', 'Review Order']

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const getStepContent = (step) => {
    const renderStepComp = {
      0: <AddressForm />,
      1: <PaymentsForm />,
      2: <ReviewForm />,
    }

    return renderStepComp[step]
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  return (
    <Container component="section" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper
          activeStep={activeStep}
          sx={{
            pt: 3,
            pb: 5,
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5"> Thank you for your order</Typography>
            <Typography variant="h5">
              {' '}
              Your order number is #12234. We have emailed the order details
            </Typography>
            <Link to="/">Shop More</Link>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button
                  sx={{ mt: 3, ml: 1 }}
                  onClick={handleBack}
                  variant="contained"
                >
                  Back
                </Button>
              )}
              <Button
                sx={{ mt: 3, ml: 1 }}
                onClick={handleNext}
                variant="contained"
              >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  )
}

export default Checkout
