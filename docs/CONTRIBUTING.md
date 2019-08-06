# Contributing to Knight

## Getting Started

First of all you must clone or fork this repository.

```bash
git clone https://github.com/lucaspbordignon/knight
```

### Install project dependencies:

```bash
yarn i
```

### Development server

To run the development server you must have the following resources:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node 8+](https://nodejs.org/en/)
- [Docker 18+](https://docs.docker.com/install/)
- [Docker Compose 1.21+](https://docs.docker.com/compose/install/)
- [Yarn](https://yarnpkg.com/en/)

After that, you must be able to execute the following command on the root
of the project

```bash
yarn dev
```

### Running tests

Inside the `client/` folder

```bash
yarn client-test
```

Inside the `api/` folder

```bash
yarn api-test-watch
```

## Deploying to Heroku

### Setting up your Heroku application

You must have:

- [Heroku cli](https://www.npmjs.com/package/heroku)
- [Heroku](https://www.heroku.com/) account
- This boilerplate relies on an authentication process to work properly. Make sure you have been through the [authentication configuration](#authentication).

1. In your project directory, run `heroku login` and enter your credentials.
2. Run `heroku create APP_NAME` to create your Heroku application. Copy your application URL for later steps.
3. Navigate to your application in the [heroku apps dashboard](https://dashboard.heroku.com/apps) and go to the Resources tab. Under Add-ons, add a [postgres](https://elements.heroku.com/addons/heroku-postgresql) database by searching for postgres in the search field. A `DATABASE_URL` [configuration variable](https://devcenter.heroku.com/articles/config-vars) is generated upon creation.
4. Current application is not using authentication, but in order to work properly
   it needs to be configured. For each chosen provider a set of environment variables needs to be provided. By default Google, Facebook and Linkedin are the current providers, so for each of these providers a collection of variables should be set. Navigate to your application's Settings tab in your Heroku dashboard. Click on Reveal Vars and set the following values:
   - `GOOGLE_ID`, `FACEBOOK_ID` and `LINKEDIN_ID`: the clients ID's or random values
   - `GOOGLE_SECRET`, `FACEBOOK_SECRET` and `LINKEDIN_SECRET`: the clients secret's or random values
   - `GOOGLE_CALLBACK_URL`, `FACEBOOK_CALLBACK_URL` and `LINKEDIN_CALLBACK_URL`: Respectively `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/google/callback`, `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/facebook/callback` and `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/linkedin/callback`
   - `SUCCESS_LOGIN_REDIRECT_URL`: `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/connect`

Deploy your application to Heroku by running:

```shell
git push heroku master
```

## Pull Requests

After all code changes made, feel free to open a pull-request to the main
repository. You can write a few words describing which problem are you solving
with those changes and a bit of an explanation of how it is being done.

**Advice:** [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) is an excellent start for a great git usage (:
