# jordans

## Description

Modified version from app that being used as technical test for PT. Dans Multi Pro. (now you know why I gave the name `jordans`)

This app display available jobs from [Github Jobs API](https://jobs.github.com/api) but it proxied through [my own proxy](https://github.com/iwgx/github-jobs-middleman) to bypass CORS. We can filter based on description, location, and is it full time or not. This app also can show detail of the job that we select.

Build with React (with Typescript), styled-components, react-query (with axios), unstated-next, and other great library.

Deployed to Netlify. Analytics by Splitbee.

## Usage

1. Clone this repo
2. Install dependencies `yarn`
3. Run app http://localhost:3000 `yarn start`
4. Build app for production `yarn build`

Try here https://jordans.iwgx.io
