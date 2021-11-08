# SWAPI

Api endpoint for listing names of Star Wars movies, adding and listing anonymous comments for a movie, and getting the
character list for a movie.

---

## Requirements

For development, you will only need Node.js (version 14 and above) and a node global package installed in your environment.

### Node

- #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

    ##### Installation Commands

        $ sudo apt install nodejs
        $ sudo apt install npm

- #### Other Operating Systems

    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
    If the installation was successful, you should be able to run the following command.

    ##### verification Commands

        $ node --version
        v14.17.6 (recommended for this project)
        $ npm --version
        6.1.0
    If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    ##### update Command

        $ npm install npm -g

---
## SWAPI project Installation

    $ git clone https://github.com/rilwanmajaagun/SWAPI.git
    $ cd SWAPI
    $ npm install

---

## Configure app

create a  `.env` file then add url to your db to connect your Database. 
An example of the structure of the `.env` is seen in `.env.example` file.

---

## Running migrations

    $ npm run migrate (from the SWAPI project)

---

## Running the SWAPI project locally

    $ npm run dev

---

## Running tests

    $ npm run test

---

## Technologies

- Node JS
- Express
- Supertest and mocha
- Postman
- Postgres

---

## Documentation

postman: https://documenter.getpostman.com/view/11075743/UVC5D6cM

---

## Copyright

Copyright (c) 2021 Rilwan Majaagun

---