import Amplify from 'aws-amplify'
import config from './aws-exports'

const apiKey = process.env.NEXT_PUBLIC_AWS_APPSYNC_API_KEY
Amplify.configure({
  ...config,
  aws_appsync_apiKey: apiKey,
})
