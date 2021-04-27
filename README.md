# Fairmint App

## Available scripts

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn request-certificate`

It requests a new public ACM certificate that covers the customer's domain name which is specified in _config/deploy.json_ . <br>

On successful end, add the printed CNAME record to the DNS configuration. The procedure for adding CNAME records depends on the DNS service Provider.

### `yarn deploy`

Builds the app for production to the `build` folder.<br>

And then, if it isn't first deploy for the customer, it just uploads `build` folder to the corresponding S3 bucket.<br>

Otherwise, it checks if there is an issued certificate that covers the customer's domain name in ACM.<br>

If there isn't, it throws an error.<br>
If there is one, it creates S3 bucket, uploads `build` folder to it, updates bucket configuration for the static website hosting and creates a cloudfront for it.<br>

On successful end, add the printed CNAME record to the DNS configuration. The procedure for adding CNAME records depends on the DNS service Provider.

## How to develop

### Install Node.js v10

### Install and configure the Amplify CLI as follows:
```
$ yarn global add @aws-amplify/cli
$ amplify configure
```

### Work on a new feature

#### 1. Create a new branch from `stage` branch  
The branch name should only include alphanumeric characters and underscore.  
Idealy, it can be `issue_<number>`.
```
$ git checkout stage
$ git pull
$ git checkout -b <branch name>
```

#### 2. Initialize an amplify environment
- Add a new environment  
Set up a google project following these [steps](https://aws-amplify.github.io/docs/js/cognito-hosted-ui-federated-identity#google-sign-in-instructions) and get OAuth client ID & client secret.  
You will need them in the following CLI flow.

```
$ amplify init
  ? Do you want to use an existing environment? No
  ? Enter a name for the environment 
  ...
```

- Use the existing environment - `dev`  
Since the team is sharing the same `dev` environment, you would need to pull in changes which other team members pushed for the `dev` environment to be in sync.
```
$ amplify init
  ? Do you want to use an existing environment? Yes
  ? Choose the environment you would like to use: 
      production
      stage
    ❯ dev 
$ amplify env pull
```

#### 3. After you finish working on the feature, commit your code, create a pull request to `stage` branch.
```
$ git commit -am 'Worked on issue'
$ git push origin <branch name>
```

#### 4. To preview what the changes will look like, go to the Console and connect your branch.  
Your feature will be accessible at https://branchname.appid.amplifyapp.com

#### 5. Before sharing it with the team, you need to add that url to signIn/signOut redirect uris.
```
$ amplify update auth
  What do you want to do? 
    Apply default configuration without Social Provider (Federation) 
    Walkthrough all the auth configurations 
  ❯ Add/Edit signin and signout redirect URIs 
    Update OAuth social providers 
    ...

$ amplify push
```

#### 6. If everything looks good, merge the PR to `stage` branch and update `stage` amplify environment.
```
$ amplify env checkout stage
$ amplify push
```

#### 6. Delete your feature branch from Git, Amplify Console, and remove the backend environment from the cloud.

## 3 environments

### `production` - https://master.fairmint.co
It is connected to `master` branch and represent the latest release.

### `stage` - https://stage.fairmint.co
It is connected to `stage` branch and represent the latest stabilized version of development being tested before release.

### `development`
This is the environment that will be created by every feature.   
Check `Work on a new feature` section.

## Release a new version

We should make sure that `master` branch has no bug.  
So when we are sure that `stage` branch has no bug, we can merge `stage` to `master` branch.
