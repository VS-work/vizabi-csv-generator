# Usage

In order to start generation of CSVs based on Waffle-Server data you need to run following command:

`node index generation-schemas.json`

Where `generation-schemas.json` is the file that contains schemas for CSVs to be generated. Here is an example:
 ```json
 [
   {
     "file": "geos.csv",
   },
   {
     "file": "geos.csv",
     "endpoint": "geos"
   },
   {
     "file": "measureValues.csv",
     "endpoint": "measureValues",
     "query": "time=2015"
   }
 ]
 ```
 When script invoked without schema file - default schemas (the ones that reflect vizabi csv files) and default WaffleServer url(http://waffle-server-dev.gapminderdev.org) will be used:

 In order to generate vizabi csv files do following:
 ```
 node index
 ```

 In order to generate vizabi csv files for **waffle-server-dev** do following (does the same as `node index`):
 ```
 npm run generate-from-dev
 ```

 In order to generate vizabi csv files for **waffle-server-stage** do following:
 ```
 npm run generate-from-stage
 ```

 In order to generate vizabi csv files for **waffle-server-dev** do following:
 ```
 npm run generate-from-prod
 ```

 This command will install all dependencies and generate vizabi csv files for **waffle-server-dev**:
 ```
 npm start
 ```

 Also by supplying env variable `WS_URL`, default waffle-server url can be overridden:
 ```
 WS_URL=http://localhost:3000 node index
 ```

## Options
 - `file` - the name of the generated csv file
 - `endpoint (optional)` - predefined value inside of the generation script that knows which route to invoke in order to get the data. If skipped default route will be used: `/api/graphs/stats/vizabi-tools`
 - `query (optional)` - url params that will be used during the route invocation. Should be supplied in form of `key=value&key=value...`

## Possible issues:
If something is generated not the way you expected - the issue might be:
 1. obsolete data
 2. outdated version of waffle-server
 3. generator by itsef has a bug