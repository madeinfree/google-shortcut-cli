#! /usr/bin/env node
const request = require('superagent');
const ncp = require('copy-paste');

const APIVersion = 'v1';
const APIKey = process.env.GOOGLE_SHORT_CUT_API_KEY;
const APIUri = `https://www.googleapis.com/urlshortener/${APIVersion}/url`;

const argvs = process.argv;
const longUrl = argvs[2];

if (longUrl === undefined || longUrl == null)
  throw new Error('google shortcut cli: Url be required.');
if (typeof longUrl !== 'string')
  throw new Error('google shortcut cli: Url be typeof string.');

request
  .post(`${APIUri}?key=${APIKey}`)
  .send({ longUrl: longUrl })
  .set('Content-Type', 'application/json')
  .end((err, res) => {
    if (err) {
      throw new Error(err);
    }
    const { id } = res.body;
    ncp.copy(id, () => {
      console.log(`Great ! copy url:<${id}> done, you can paste in anywhere.`);
    });
  });
