# twitter-viewer

##Create a .env file and put at the root
    CONSUMER_KEY=consumer_key
    CONSUMER_SECRET=consumer_secret
    ACCESS_TOKEN=access_token
    ACCESS_TOKEN_SECRET=access_token_secret
    PORT=server_port
    PRODUCTION=true/false compile assets to dist
    PRODUCTION_WEBPACK_WATCH=true/false to recompile webpack changes into file system
    
##To run project after creating .env file
    npm install
    npm run auto-start
This will automatically run linting and jest for unit test.
These unit test will include code coverage information that will be generated to the coverage folder, which is in .gitignore
You can also run these separately

    npm run lint
    npm run test