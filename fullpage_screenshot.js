const { Chromeless } = require('chromeless')

const secrets = require('./secrets.json')

const { chromelessExtensions, fullPageScreenshot } = require('./helpers')

async function run() {
  const chromeless = Object.assign(new Chromeless(), chromelessExtensions)

  await chromeless
    .goto('https://www.ruelala.com/')
    .wait('.already-a-member')
    .click('.already-a-member')
    .type(secrets.email, '#login_email')
    .type(secrets.password, '#login_password')
    .click('#login_submit')
    .wait(2000)
    .goto('https://www.ruelala.com/boutique/107276/')
    .wait(2000)

  await chromeless.waitAll()

  const client = await chromeless.getClient()
  const screenie = await fullPageScreenshot(client, { filenamePrefix: 'ds_boutique' })

  await chromeless.end()
}

run().catch(console.error.bind(console))
