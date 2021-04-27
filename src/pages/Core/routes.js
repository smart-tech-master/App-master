import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'

const SignIn = lazy(() => import('../SignIn'))
const SignUp = lazy(() => import('../SignUp'))
const Verify = lazy(() => import('../Verify'))
const ResetPassword = lazy(() => import('../ResetPassword'))
const Home = lazy(() => import('../Home'))
const Founders = lazy(() => import('../Founders'))
const Dashboard = lazy(() => import('../Dashboard'))
const FinancialData = lazy(() => import('../FinancialData'))
const WhyFairmint = lazy(() => import('../WhyFairmint'))

const routes = (
  <Suspense fallback={<LoadingSpinner />}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/founders" exact component={Founders} />
      <Route path="/home" component={Dashboard} />
      <Route path="/why-fairmint" component={WhyFairmint} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/verify" component={Verify} />
      <Route path="/financial-data" component={FinancialData} />
      <Route path="/reset-password/:emailToken" component={ResetPassword} />

      <Redirect path="*" to="/signin" />
    </Switch>
  </Suspense>
)

export default routes
