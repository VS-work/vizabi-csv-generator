'use strict';

const _ = require('lodash');

let schemas = _.range(1800, 2016).map(year => {
  return {
    file: `dont-panic-poverty-${year}.csv`,
    endpoint: "measureValues",
    query: `geo.cat=country&time=${year}&select=geo,time,population,gdp_p_cap_const_ppp2011_dollar,gini,child_mortality_rate_per1000&sort=time:asc,geo:asc&format=csv`
  };
});

schemas.push({
  file: `dont-panic-poverty.csv`,
  endpoint: "measureValues",
  query: `geo.cat=country&select=geo,time,population,gdp_p_cap_const_ppp2011_dollar,gini,child_mortality_rate_per1000&sort=time:asc,geo:asc&format=csv`
});

schemas.push({
  file: "dont-panic-poverty-geo-properties.csv",
  endpoint: "geos",
  query: "select=geo,geo.name,geo.cat,geo.region,geo.latitude,geo.longitude&format=csv&sort=geo:asc"
});

module.exports = schemas;
